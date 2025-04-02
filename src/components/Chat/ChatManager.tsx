import { useState } from "react";
import { Message } from "../../types/message";

// Sample initial messages
const initialMessages: Message[] = [
  {
    id: "1",
    text: "Hello there! How are you doing today?",
    sender: "other",
    timestamp: new Date(Date.now() - 3600000), // 1 hour ago
  },
  {
    id: "2",
    text: "I'm doing well, thanks for asking! How about you?",
    sender: "user",
    timestamp: new Date(Date.now() - 3000000), // 50 minutes ago
  },
  {
    id: "3",
    text: "Great! I was wondering if you had time to catch up later?",
    sender: "other",
    timestamp: new Date(Date.now() - 2400000), // 40 minutes ago
  },
  {
    id: "4",
    text: "Sure, I'm free after 5pm. Does that work for you?",
    sender: "user",
    timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
  },
  {
    id: "5",
    text: "Perfect! Let's meet at the usual place at 5:30pm.",
    sender: "other",
    timestamp: new Date(Date.now() - 1200000), // 20 minutes ago
  },
];

export interface ChatManagerProps {
  children: (props: {
    messages: Message[];
    sendMessage: (text: string) => void;
  }) => React.ReactNode;
}

export const ChatManager = ({ children }: ChatManagerProps) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const newMessage: Message = {
      id: `msg_${Date.now()}`,
      text,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);

    // Simulate response after 1 second
    setTimeout(() => {
      const responseMessage: Message = {
        id: `msg_${Date.now()}`,
        text: "Thanks for your message! This is an auto-response.",
        sender: "other",
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, responseMessage]);
    }, 1000);
  };

  return <>{children({ messages, sendMessage })}</>;
};