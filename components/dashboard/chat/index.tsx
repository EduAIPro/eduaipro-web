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
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const storageKey = useMemo(
    () => `chatbot-messages-${moduleItemId}`,
    [moduleItemId]
  );

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
      {/* Floating Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="text-primary"
          variant="outline"
        >
          <BotMessageSquareIcon className="" />
          <p>Chatbot</p>
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed inset-0 md:inset-auto md:bottom-6 md:right-6 md:w-[400px] md:h-[66vh] flex flex-col shadow-2xl z-[999999999999999] md:mx-0 rounded-none md:rounded-lg">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
                G
              </div>
              <div>
                <h3 className="font-semibold">George</h3>
                <p className="text-xs text-muted-foreground">AI Assistant</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.isUser ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 text-sm ${
                      message.isUser
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    {message.isLoading ? (
                      <LoadingDots />
                    ) : message.isUser || !message.isTyping ? (
                      <p>{message.content}</p>
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
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                disabled={isMutating}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isMutating}
                size="icon"
                className="!size-10"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
}
