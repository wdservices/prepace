"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { answerFollowUpQuestion } from "@/ai/flows/answer-follow-up-questions";
import { Bot, Loader2, Send, User } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";

type ChatModalProps = {
  subject: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

type Message = {
  role: "user" | "assistant";
  content: string;
};

export function ChatModal({ subject, isOpen, setIsOpen }: ChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: inputValue };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await answerFollowUpQuestion({
        subject,
        question: inputValue,
      });
      const assistantMessage: Message = { role: "assistant", content: response.answer };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chatbot error:", error);
      const errorMessage: Message = {
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="dark bg-background text-foreground sm:max-w-[525px] flex flex-col h-[70vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bot /> {subject} Assistant
          </DialogTitle>
          <DialogDescription>
            Ask a follow-up question about {subject}.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-1 -mx-6 px-6">
            <div className="space-y-4 pr-4">
            {messages.map((message, index) => (
                <div key={index} className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}>
                    {message.role === 'assistant' && <Bot className="h-6 w-6 shrink-0 text-primary" />}
                    <div className={`rounded-lg px-3 py-2 text-sm ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                        {message.content}
                    </div>
                     {message.role === 'user' && <User className="h-6 w-6 shrink-0" />}
                </div>
            ))}
             {isLoading && (
                <div className="flex items-start gap-3">
                    <Bot className="h-6 w-6 shrink-0 text-primary" />
                    <div className="rounded-lg px-3 py-2 text-sm bg-muted flex items-center">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Thinking...
                    </div>
                </div>
            )}
            </div>
        </ScrollArea>
        <DialogFooter>
          <form onSubmit={handleSubmit} className="w-full flex items-center gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="e.g., Why is Na the symbol for Sodium?"
              disabled={isLoading}
              className="dark"
            />
            <Button type="submit" disabled={isLoading || !inputValue.trim()} size="icon">
                <Send className="h-4 w-4" />
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
