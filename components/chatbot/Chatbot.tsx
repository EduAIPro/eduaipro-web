import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Maximize2, MessageCircle, MinusCircle, Send, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

// Message bubble component
const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isUser }) => (
  <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`max-w-[80%] p-3 montserrat text-sm font-medium rounded-lg ${
        isUser
          ? "bg-brand-900 text-white rounded-br-none"
          : "bg-gray-100 text-gray-800 rounded-bl-none"
      }`}
    >
      {message}
    </motion.div>
  </div>
);

// Attention popup component
const AttentionPopup: React.FC<AttentionPopupProps> = ({ onClose }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    className="fixed bottom-36 xs:bottom-20 right-4 z-50 mb-4"
  >
    <Card className="w-64 shadow-lg border-2 border-accent-500">
      <CardContent className="p-4">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        >
          <X size={16} />
        </button>
        <p className="text-sm text-gray-600 pt-2">
          👋 Hi! {"I'm"} George, your AI assistant. How can I help you today?
        </p>
      </CardContent>
    </Card>
  </motion.div>
);

// Auto-resizing TextArea component
const AutoResizeTextarea: React.FC<AutoResizeTextareaProps> = ({
  value,
  onChange,
  onKeyPress,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "inherit";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${Math.min(scrollHeight, 150)}px`; // Max height of 150px
    }
  }, [value]);

  return (
    <Textarea
      ref={textareaRef}
      value={value}
      onChange={onChange}
      onKeyPress={onKeyPress}
      placeholder="Type your message..."
      className="min-h-[40px] max-h-[150px] resize-none overflow-y-auto"
      rows={1}
    />
  );
};

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (): void => {
    if (input.trim()) {
      const newMessage: Message = {
        text: input,
        isUser: true,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, newMessage]);
      setInput("");

      // Simulate AI response
      setTimeout(() => {
        const aiResponse: Message = {
          text: "Thanks for your message! This is a simulated response from George.",
          isUser: false,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiResponse]);
      }, 1000);
    }
  };

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ): void => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <AnimatePresence>
        {showPopup && !isOpen && (
          <AttentionPopup onClose={() => setShowPopup(false)} />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.3 }}
        className="fixed bottom-24 xs:bottom-4 right-4 z-50"
      >
        {!isOpen && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="bg-brand-900 text-white p-4 rounded-full shadow-lg hover:bg-brand-1001 transition-colors"
          >
            <MessageCircle size={24} />
          </motion.button>
        )}

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className={cn(
                "bg-white rounded-lg shadow-xl border border-gray-200",
                isMinimized
                  ? "w-screen xs:w-[300px]"
                  : "w-[calc(100vw-32px)] xs:w-[380px]"
              )}
              //   style={{ width: isMinimized ? "300px" : "380px" }}
            >
              {/* Chat Header */}
              <div className="p-4 border-b flex justify-between items-center bg-brand-900 text-white rounded-t-lg">
                <div className="flex items-center gap-2">
                  <MessageCircle size={20} />
                  <h3 className="font-semibold">Chat with George</h3>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setIsMinimized(!isMinimized)}>
                    {isMinimized ? (
                      <Maximize2 size={18} />
                    ) : (
                      <MinusCircle size={18} />
                    )}
                  </button>
                  <button onClick={() => setIsOpen(false)}>
                    <X size={18} />
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {!isMinimized && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Chat Messages */}
                    <ScrollArea className="h-96 p-4">
                      {messages.map((message, index) => (
                        <MessageBubble
                          key={index}
                          message={message.text}
                          isUser={message.isUser}
                        />
                      ))}
                      <div ref={messagesEndRef} />
                    </ScrollArea>

                    {/* Input Area */}
                    <div className="p-4 border-t">
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <AutoResizeTextarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                          />
                        </div>
                        <Button
                          onClick={handleSend}
                          className="bg-brand-900 hover:bg-brand-1001 self-end"
                        >
                          <Send size={18} />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};
