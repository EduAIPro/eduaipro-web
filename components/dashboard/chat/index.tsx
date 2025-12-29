import { sendChatKey } from "@/api/keys";
import { sendChatMessage } from "@/api/mutations";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BotMessageSquareIcon, Send, X } from "lucide-react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import useSWRMutation from "swr/mutation";

import { ChatResponse } from "@/types/chat";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  isTyping?: boolean;
  isLoading?: boolean;
}

interface ChatbotProps {
  moduleItemId: string;
}

const LoadingDots: React.FC = () => {
  return (
    <div className="flex gap-1 py-2">
      <div
        className="size-2 bg-foreground/40 rounded-full animate-bounce"
        style={{ animationDelay: "0ms" }}
      />
      <div
        className="size-2 bg-foreground/40 rounded-full animate-bounce"
        style={{ animationDelay: "150ms" }}
      />
      <div
        className="size-2 bg-foreground/40 rounded-full animate-bounce"
        style={{ animationDelay: "300ms" }}
      />
    </div>
  );
};

const TypewriterText: React.FC<{ text: string; onComplete: () => void }> = ({
  text,
  onComplete,
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 20);
      return () => clearTimeout(timeout);
    } else if (currentIndex === text.length && text.length > 0) {
      onComplete();
    }
  }, [currentIndex, text, onComplete]);

  return <span>{displayedText}</span>;
};

export default function Chatbot({ moduleItemId }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showGreeting, setShowGreeting] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const storageKey = useMemo(
    () => `chatbot-messages-${moduleItemId}`,
    [moduleItemId]
  );
  const greetingKey = "chatbot-greeting-shown";

  // Check for greeting on mount
  useEffect(() => {
    // Small delay to ensure it feels like it "pops" in after page load
    const timer = setTimeout(() => {
      if (typeof window !== "undefined") {
        const hasGreeted = sessionStorage.getItem(greetingKey);
        if (!hasGreeted && !isOpen) {
          setShowGreeting(true);
        }
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  const handleDismissGreeting = () => {
    setShowGreeting(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem(greetingKey, "true");
    }
  };

  const handleOpenChat = () => {
    setIsOpen(true);
    handleDismissGreeting();
  };

  // Initialize messages from sessionStorage or use default intro message
  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem(storageKey);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {
          console.error("Failed to parse stored messages:", e);
        }
      }
    }
    return [
      {
        id: "intro",
        content: "Hi! I'm George, your AI assistant. How can I help you today?",
        isUser: false,
      },
    ];
  });

  const { trigger, isMutating } = useSWRMutation(sendChatKey, sendChatMessage);

  // Update sessionStorage whenever messages change
  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(storageKey, JSON.stringify(messages));
    }
  }, [messages, storageKey]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isMutating) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Add loading message
    const loadingMessage: Message = {
      id: "loading-" + Date.now(),
      content: "",
      isUser: false,
      isLoading: true,
    };
    setMessages((prev) => [...prev, loadingMessage]);

    try {
      const response: ChatResponse = await trigger({
        message: inputValue,
        moduleItemId,
      });

      // Remove loading message and add actual response
      setMessages((prev) => prev.filter((msg) => !msg.isLoading));

      const aiMessage: Message = {
        id: response.id,
        content: response.response,
        isUser: false,
        isTyping: true,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      // Remove loading message
      setMessages((prev) => prev.filter((msg) => !msg.isLoading));

      const errorMessage: Message = {
        id: Date.now().toString(),
        content: "Sorry, I couldn't process your message. Please try again.",
        isUser: false,
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const handleTypingComplete = (messageId: string) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId ? { ...msg, isTyping: false } : msg
      )
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Action Button & Greeting */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-[50] flex flex-col items-end gap-2">
          {showGreeting && (
            <div className="bg-white text-foreground p-3 rounded-lg shadow-lg border border-border animate-in fade-in slide-in-from-bottom-2 max-w-[250px] relative mb-2">
              <button
                onClick={handleDismissGreeting}
                className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-sm border hover:bg-muted"
                type="button"
              >
                <X className="h-3 w-3 text-muted-foreground" />
              </button>
              <div
                className="flex gap-2 cursor-pointer"
                onClick={handleOpenChat}
              >
                <div className="h-8 w-8 shrink-0 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold text-xs">
                  G
                </div>
                <div>
                  <p className="text-sm font-medium">Hi! I&apos;m George.</p>
                  <p className="text-xs text-muted-foreground">
                    Need help? Click here to chat!
                  </p>
                </div>
              </div>
              {/* Arrow pointing down */}
              <div className="absolute -bottom-2 right-6 h-4 w-4 rotate-45 bg-white border-b border-r border-border" />
            </div>
          )}

          <Button
            onClick={handleOpenChat}
            className="h-14 w-14 rounded-full shadow-xl bg-primary hover:bg-primary/90 transition-transform hover:scale-105"
            size="icon"
          >
            <BotMessageSquareIcon className="h-8 w-8" />
            <span className="sr-only">Chatbot</span>
          </Button>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-full md:w-[400px] h-[600px] max-h-[80vh] flex flex-col shadow-2xl z-[50] rounded-xl border-border animate-in fade-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-primary/5 rounded-t-xl">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold text-lg shadow-sm">
                G
              </div>
              <div>
                <h3 className="font-semibold text-base">George</h3>
                <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  Online Assistant
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-primary/10 rounded-full"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4 bg-gray-50/50" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.isUser ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
                      message.isUser
                        ? "bg-primary text-primary-foreground rounded-br-none"
                        : "bg-white border border-gray-100 rounded-bl-none"
                    }`}
                  >
                    {message.isLoading ? (
                      <LoadingDots />
                    ) : message.isUser || !message.isTyping ? (
                      <p className="leading-relaxed">{message.content}</p>
                    ) : (
                      <TypewriterText
                        text={message.content}
                        onComplete={() => handleTypingComplete(message.id)}
                      />
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t bg-white rounded-b-xl">
            <div className="flex gap-2 items-center">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask George anything..."
                disabled={isMutating}
                className="flex-1 bg-gray-50 border-gray-200 focus-visible:ring-primary/20"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isMutating}
                size="icon"
                className="h-10 w-10 shrink-0 rounded-full"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-[10px] text-center text-muted-foreground mt-2">
              George can make mistakes. Please verify important information.
            </p>
          </div>
        </Card>
      )}
    </>
  );
}
