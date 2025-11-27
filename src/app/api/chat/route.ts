import { google } from "@ai-sdk/google";
import { convertToModelMessages, streamText, UIMessage } from "ai";
import { searchRelevantInfo } from "@/lib/professionalData";
import { systemPrompt } from "@/constants/systemPrompt";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();

    const lastMessage = messages[messages.length - 1];
    const userQuery = lastMessage.parts
      .filter((part) => part.type === "text")
      .map((part) => part.text)
      .join(" ");

    console.log("User question: ", userQuery);

    const relevantInfo = searchRelevantInfo(userQuery, 3);

    const ragContext =
      relevantInfo.length > 0
        ? relevantInfo
            .map(
              (info, index) =>
                `[FONTE ${index + 1}: ${info.category}]\n${info.content}`
            )
            .join("\n\n---\n\n")
        : "Nenhuma informação específica encontrada. Seja geral e sugira contato direto.";

    const promptSystem = systemPrompt(ragContext);

    const result = streamText({
      model: google("gemini-2.5-flash"),
      system: promptSystem,
      messages: convertToModelMessages(messages),
      temperature: 0.7, // Criatividade moderada
      topP: 0.9, // Diversidade de vocabulário
    });

    console.log("✅ Resposta gerada com sucesso");

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("❌ Erro ao gerar resposta:", error);

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
