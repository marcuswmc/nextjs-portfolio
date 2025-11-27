"use client";

import type React from "react";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useChat } from "@ai-sdk/react";
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  PromptInput,
  PromptInputBody,
  PromptInputFooter,
  PromptInputHeader,
  PromptInputMessage,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import { MessageCircle } from "lucide-react";
import { Suggestion, Suggestions } from "@/components/ai-elements/suggestion";

const suggestions = [
  'Can you explain how to play tennis?',
  'What is the weather in Tokyo?',
  'How do I make a really good fish taco?',
];

export function Chat() {
  const chatRef = useRef<HTMLDivElement | null>(null);
  const messagesRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLDivElement | null>(null);
  const iconRef = useRef<HTMLDivElement | null>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const iconTl = useRef<gsap.core.Timeline | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [text, setText] = useState<string>("");

  const { messages, sendMessage, status } = useChat();

  useGSAP(() => {
    const chatEl = chatRef.current;
    const msgEl = messagesRef.current;
    const inputEl = inputRef.current;
    const iconEl = iconRef.current;

    if (chatEl) {
      chatEl.classList.remove("chat-initial");
      gsap.set(chatEl, { xPercent: 100 });
    }

    const initialTargets = [msgEl, inputEl].filter(Boolean) as HTMLElement[];
    if (initialTargets.length) {
      gsap.set(initialTargets, { autoAlpha: 0, x: -20 });
    }

    if (chatEl) {
      const tlLocal = gsap.timeline({ paused: true }).to(chatEl, {
        xPercent: 0,
        duration: 1,
        ease: "power3.out",
      });

      if (msgEl) {
        tlLocal.to(
          msgEl,
          { autoAlpha: 1, x: 0, duration: 0.5, ease: "power2.out" },
          "<"
        );
      }

      if (inputEl) {
        tlLocal.to(
          inputEl,
          { autoAlpha: 1, x: 0, duration: 0.5, ease: "power2.out" },
          "<+0.2"
        );
      }

      tl.current = tlLocal;
    }

    if (iconEl) {
      iconTl.current = gsap.timeline({ paused: true }).to(iconEl, {
        rotate: 90,
        scale: 0.9,
        duration: 0.3,
        ease: "power2.inOut",
      });
    }
  }, []);

  const toggleChat = () => {
    if (isOpen) {
      tl.current?.reverse();
      iconTl.current?.reverse();
    } else {
      tl.current?.play();
      iconTl.current?.play();
    }
    setIsOpen(!isOpen);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setText(suggestion);
  };

  const handleSubmit = (message: PromptInputMessage) => {
    if (message.text.trim() && status !== "submitted") {
      sendMessage(message);
      setText("");
    }
  };

  return (
    <>
      <div
        ref={chatRef}
        className="chat-initial fixed top-0 right-0 z-[1000] flex flex-col justify-between w-full h-full px-8 md:px-10 lg:px-12 bg-background border-l py-8 md:w-1/2"
      >
        <div
          ref={messagesRef}
          className="flex-1 overflow-y-auto mb-6 space-y-4"
        >
          <Conversation>
            <ConversationContent>
              {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full text-center">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Olá!</h2>
                    <p className="text-muted-foreground">
                      Como posso ajudar você hoje?
                    </p>
                  </div>
                </div>
              ) : (
                messages.map((message) => (
                  <Message key={message.id} from={message.role}>
                    <MessageContent>
                      {message.parts.map((part, i) => {
                        switch (part.type) {
                          case "text":
                            return (
                              <MessageResponse
                                key={i}
                                className="prose dark:prose-invert max-w-none"
                              >
                                {part.text}
                              </MessageResponse>
                            );
                          default:
                            return null;
                        }
                      })}
                    </MessageContent>
                  </Message>
                ))
              )}

              {status === "submitted" && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-current [animation-delay:-0.3s]" />
                  <div className="h-2 w-2 animate-bounce rounded-full bg-current [animation-delay:-0.15s]" />
                  <div className="h-2 w-2 animate-bounce rounded-full bg-current" />
                </div>
              )}
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>
        </div>

        <div ref={inputRef}>
          <Suggestions>
            {suggestions.map((suggestion) => (
              <Suggestion
                key={suggestion}
                onClick={handleSuggestionClick}
                suggestion={suggestion}
              />
            ))}
          </Suggestions>
          <PromptInput
            onSubmit={(message) => sendMessage({ text: message.text })}
            className="mt-4"
            globalDrop
            multiple
          >
            <PromptInputHeader>
              <p className="text-sm text-muted-foreground">
                Type your message here
              </p>
            </PromptInputHeader>
            <PromptInputBody>
              <PromptInputTextarea
                onChange={(e) => setInput(e.target.value)}
                ref={textareaRef}
                value={input}
                className="text-gray-300"
              />
            </PromptInputBody>
            <PromptInputFooter>
              {/* <PromptInputTools>
                <PromptInputActionMenu>
                  <PromptInputActionMenuTrigger />
                  <PromptInputActionMenuContent>
                    <PromptInputActionAddAttachments />
                  </PromptInputActionMenuContent>
                </PromptInputActionMenu>
                <PromptInputSpeechButton
                  onTranscriptionChange={(text) => setInput(text)}
                  textareaRef={textareaRef}
                />
              </PromptInputTools> */}
              <PromptInputSubmit disabled={!text && !status} status={status} />
            </PromptInputFooter>
          </PromptInput>
        </div>
      </div>

      <div
        className="fixed z-[1001] flex items-center justify-center transition-all duration-300 bg-primary text-primary-foreground rounded-full cursor-pointer w-14 h-14 md:w-20 md:h-20 bottom-4 right-10 hover:scale-110 shadow-lg"
        onClick={toggleChat}
      >
        <div ref={iconRef}>
          <MessageCircle className="w-6 h-6 md:w-8 md:h-8" />
        </div>
      </div>
    </>
  );
}
