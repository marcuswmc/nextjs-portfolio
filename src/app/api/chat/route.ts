import { google } from "@ai-sdk/google";
import {
  convertToModelMessages,
  streamText,
  UIMessage,
  tool,
  stepCountIs,
} from "ai";
import { searchRelevantInfo } from "@/lib/professionalData";
import { systemPrompt } from "@/constants/systemPrompt";
import { z } from "zod";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();
    const promptSystem = systemPrompt();

    const result = streamText({
      model: google("gemini-2.5-flash"),
      system: promptSystem,
      messages: convertToModelMessages(messages),
      temperature: 0.7,
      topP: 0.9,
      tools: {
        searchTool: tool({
          description:
            "Busca informações relevantes sobre o profissional e seus serviços em sua base de dados antes de responder. Use sempre esta ferramenta primeiro.",
          inputSchema: z.object({
            query: z
              .string()
              .describe(
                "O texto exato ou a essência da última pergunta do usuário que você precisa pesquisar."
              ),
          }),
          execute: async ({ query }) => {
            const userQuery = query;
            const relevantInfo = searchRelevantInfo(userQuery, 3);
            const ragContext =
              relevantInfo.length > 0
                ? relevantInfo
                    .map(
                      (info, index) =>
                        `[SOURCE ${index + 1}: ${info.category}]\n${
                          info.content
                        }`
                    )
                    .join("\n\n---\n\n")
                : "No specific information found. Be general and suggest direct contact.";

            return ragContext;
          },
        }),
      },
      stopWhen: stepCountIs(10),
      toolChoice: "auto",
    });

    return result.toUIMessageStreamResponse({
      sendReasoning: true,
    });
  } catch (error) {
    console.error("Erro ao gerar resposta:", error);

    if (error instanceof Error) {
      console.error("Mensagem:", error.message);
      console.error("Stack:", error.stack);
    }

    return new Response(
      JSON.stringify({
        error: "Erro ao processar sua mensagem. Tente novamente.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
