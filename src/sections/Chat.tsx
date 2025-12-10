"use client";

import type React from "react";

import { Fragment, useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useChat } from "@ai-sdk/react";
import {
  Message,
  MessageAction,
  MessageActions,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputMessage,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
  PromptInputSpeechButton,
} from "@/components/ai-elements/prompt-input";
import {
  CopyIcon,
  RefreshCcwIcon,
  SearchIcon,
  XIcon,
} from "lucide-react";
import { Suggestion, Suggestions } from "@/components/ai-elements/suggestion";
import { nanoid } from "nanoid";
import { Shimmer } from "@/components/ai-elements/shimmer";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ModelSelector, ModelSelectorLogo, ModelSelectorName, ModelSelectorTrigger } from "@/components/ai-elements/model-selector";
import { Button } from "@/components/ui/button";

const suggestions: { key: string; value: string }[] = [
  { key: nanoid(), value: "A brief summary about Marcus" },
  { key: nanoid(), value: "Does Marcus have experience with Next.js?" },
  { key: nanoid(), value: "What are Marcus' skills?" },
];

export function Chat() {
  const chatRef = useRef<HTMLDivElement | null>(null);
  const messagesRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLDivElement | null>(null);
  const iconRef = useRef<HTMLDivElement | null>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const iconTl = useRef<gsap.core.Timeline | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [text, setText] = useState<string>("");
  const { messages, sendMessage, status, regenerate } = useChat();

  const models = {
    id: "gemini-2.5-flash-exp",
    name: "Gemini 2.5",
    chef: "Google",
    chefSlug: "google",
    providers: ["google", "google-vertex"],
  }

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

  // Fechar chat ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        chatRef.current &&
        !chatRef.current.contains(event.target as Node)
      ) {
        closeChat();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Fechar chat ao pressionar ESC
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (isOpen && event.key === "Escape") {
        closeChat();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const closeChat = () => {
    tl.current?.reverse();
    iconTl.current?.reverse();
    setIsOpen(false);
  };

  const toggleChat = () => {
    if (isOpen) {
      closeChat();
    } else {
      tl.current?.play();
      iconTl.current?.play();
      setIsOpen(true);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setText(suggestion);
  };

  const handleSubmit = (
    message: PromptInputMessage,
    e?: React.FormEvent<HTMLFormElement>
  ) => {
    e?.preventDefault();

    const textToSend = (message && message.text) || text;

    if (
      typeof textToSend === "string" &&
      textToSend.trim() &&
      status !== "submitted"
    ) {
      sendMessage({ text: textToSend });
      setText("");
    }
  };

  return (
    <Fragment>
      <div
        ref={chatRef}
        className="chat-initial fixed top-0 right-0 z-[1000] flex flex-col w-full h-full md:px-10 lg:px-12 bg-black text-white/80 py-8 px-4 md:w-1/2"
      >
        <button
          onClick={closeChat}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-800 transition-colors duration-200 group"
          aria-label="Close chat"
        >
          <XIcon className="w-5 h-5 text-gray-400 group-hover:text-white" />
        </button>

        <div
          ref={messagesRef}
          className="flex flex-col flex-1 overflow-x-hidden overflow-y-auto mt-8"
        >
          <Conversation
            className="flex-1 min-h-0"
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            <ConversationContent>
              {messages.length === 0 ? (
                <ConversationEmptyState
                  icon={
                    <div className="flex items-center justify-center transition-all duration-300 rounded-full w-14 h-14 md:w-20 md:h-20 bottom-4 right-10 hover:rotate-180 shadow-md">
                      <div
                        ref={iconRef}
                        className="p-[3px] rounded-full hover:rotate-180 transition-all duration-300 bg-gradient-to-tr from-[#EFD492] to-[#401702]"
                      >
                        <div className="flex items-center justify-center w-8 h-8 md:w-12 md:h-12 bg-black rounded-full"></div>
                      </div>
                    </div>
                  }
                  title="Marcus AI Chat"
                  description="Ask about Marcus Silva's experience, projects, links or skills."
                />
              ) : (
                messages.map((message) => {
                  const hasTextParts = message.parts.some(
                    (part) => part.type === "text"
                  );
                  const isThinking =
                    message.parts.some((part) => part.type === "step-start") &&
                    !hasTextParts;
                  const isLastMessage =
                    messages[messages.length - 1].id === message.id;
                  return (
                    <div
                      className="flex flex-col items-start group"
                      key={message.id}
                    >
                      <Message key={message.id} from={message.role}>
                        {isThinking ? (
                          <div className="flex items-center gap-2 text-sm text-gray-400 mb-2 p-2">
                            <SearchIcon className="animate-pulse size-4" />
                            <Shimmer>
                              Searching for information about Marcus...
                            </Shimmer>
                          </div>
                        ) : (
                          <MessageContent>
                            {message.parts.map((part, i) => {
                              switch (part.type) {
                                case "text":
                                  return (
                                    <MessageResponse
                                      key={i}
                                      className="prose max-w-none prose-a:text-gray-500 hover:prose-a:text-gray-500"
                                    >
                                      {part.text}
                                    </MessageResponse>
                                  );
                                default:
                                  return null;
                              }
                            })}
                          </MessageContent>
                        )}
                      </Message>
                      {message.role === "assistant" && !isThinking && (
                        <MessageActions
                          className={`ml-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-150 pointer-events-none group-hover:pointer-events-auto mb-2 ${
                            isLastMessage && "opacity-100 visible"
                          }`}
                        >
                          <MessageAction
                            onClick={() => regenerate()}
                            label="Retry"
                            className="cursor-pointer hover:border-gray-400 rounded-full p-1"
                            tooltip="Regenerate"
                          >
                            <RefreshCcwIcon className="size-3.5" />
                          </MessageAction>
                          <MessageAction
                            onClick={() => {
                              const textContent = message.parts
                                .filter((part) => part.type === "text")
                                .map((part) => part.text)
                                .join("\n");
                              navigator.clipboard.writeText(textContent);
                            }}
                            label="Copy"
                            tooltip="Copy to clipboard"
                            className="cursor-pointer hover:border-gray-400 rounded-full p-1"
                          >
                            <CopyIcon className="size-3.5" />
                          </MessageAction>
                        </MessageActions>
                      )}
                    </div>
                  );
                })
              )}

              {status === "submitted" && (
                <div className="flex items-center gap-2 text-gray-500">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-current [animation-delay:-0.3s]" />
                  <div className="h-2 w-2 animate-bounce rounded-full bg-current [animation-delay:-0.15s]" />
                  <div className="h-2 w-2 animate-bounce rounded-full bg-current" />
                </div>
              )}
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>
          <Suggestions className="pt-4">
            {suggestions.map((suggestion) => (
              <Suggestion
                key={suggestion.key}
                onClick={handleSuggestionClick}
                suggestion={suggestion.value}
                className="bg-back text-white/80 trasition-colors"
              />
            ))}
          </Suggestions>
        </div>
        <div ref={inputRef} className="pb-8">
          <PromptInput onSubmit={handleSubmit} className="mt-4">
            <PromptInputTextarea
              onChange={(e) => setText(e.target.value)}
              ref={textareaRef}
              value={text}
              placeholder="Ask about Marcus' experience, projects, links or skills..."
              className="text-white bg-black placeholder:text-white/60"
            />
            <PromptInputFooter>
              <PromptInputTools>
                <ModelSelector>
                  <ModelSelectorTrigger asChild>
                    <Button className="justify-between" variant={"outline"} size={"sm"}>
                      <ModelSelectorLogo provider={models.chefSlug}/>
                      <ModelSelectorName>{models.name}</ModelSelectorName>
                    </Button>
                  </ModelSelectorTrigger>
                </ModelSelector>
              </PromptInputTools>
             
              <PromptInputSubmit disabled={!text.trim()} status={status}/>
            </PromptInputFooter>
          </PromptInput>
        </div>
      </div>

      {!isOpen && (
        <>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className="fixed z-[1001] flex items-center justify-center transition-all duration-300 bg-black rounded-full cursor-pointer w-16 h-16 md:w-20 md:h-20 bottom-14 right-10 hover:rotate-180 shadow-md"
                onClick={toggleChat}
              >
                <div
                  ref={iconRef}
                  className="p-[3px] rounded-full bg-gradient-to-tr from-[#EFD492] to-[#401702]"
                >
                  <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-black rounded-full">
                  </div>
                </div>
              </div>
            </TooltipTrigger>

            <TooltipContent>
              <p>Marcus AI Chat</p>
            </TooltipContent>
          </Tooltip>
        </>
      )}
    </Fragment>
  );
}
