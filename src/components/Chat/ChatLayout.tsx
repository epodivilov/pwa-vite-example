import { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import Toolbar from "./Toolbar";
import MessageList, { Message } from "./MessageList";
import MessageInput from "./MessageInput";

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: #ffffff;
  position: relative;
  overflow: hidden;
`;

// Fixed-position header that stays at the top
const FixedHeader = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  z-index: 100;
  width: 100%;
  background-color: white;
`;

// Fixed-position footer that stays at the bottom
const FixedFooter = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: white;
  width: 100%;
`;

// Scrollable content area that adjusts between header and footer
const ContentArea = styled.main`
  flex: 1;
  overflow: auto;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  margin-top: 56px; /* Height of toolbar */
  margin-bottom: 80px; /* Height of input area + extra spacing */
  width: 100%;
  height: calc(
    100% - 136px
  ); /* Full height minus toolbar and input with spacing */
  padding-bottom: env(safe-area-inset-bottom, 0);
  padding-top: env(safe-area-inset-top, 0);
`;

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

const ChatLayout = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const messageListRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messageListRef.current) {
      const messageList = messageListRef.current.querySelector(
        '[data-testid="message-list"]'
      ) as HTMLDivElement;
      if (messageList) {
        messageList.scrollTo({
          top: messageList.scrollHeight,
          behavior: "smooth",
        });
      }
    }
  }, [messages]);

  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: `msg_${Date.now()}`,
      text,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);

    // Simulate response after 1 second
    // setTimeout(() => {
    //   const responseMessage: Message = {
    //     id: `msg_${Date.now()}`,
    //     text: "Thanks for your message! This is an auto-response.",
    //     sender: "other",
    //     timestamp: new Date(),
    //   };
    //   setMessages((prevMessages) => [...prevMessages, responseMessage]);
    // }, 1000);
  };

  const handleBackClick = () => {
    console.log("Back button clicked");
  };

  const handleInfoClick = () => {
    console.log("Info button clicked");
  };

  return (
    <ChatContainer>
      <FixedHeader>
        <Toolbar
          title="Chat Demo"
          onBackClick={handleBackClick}
          onInfoClick={handleInfoClick}
        />
      </FixedHeader>

      <ContentArea ref={messageListRef}>
        <MessageList messages={messages} />
      </ContentArea>

      <FixedFooter>
        <MessageInput onSendMessage={handleSendMessage} />
      </FixedFooter>
    </ChatContainer>
  );
};

export default ChatLayout;
