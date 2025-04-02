import styled from "@emotion/styled";
import { Message } from "../../types/message";
import { MessageBubble } from "./MessageBubble";
import { useEffect, useRef } from "react";

const StyledMessageList = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 16px;
`;

interface MessageListProps {
  messages: Message[];
}

export const MessageList = ({ messages }: MessageListProps) => {
  const listRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <StyledMessageList ref={listRef} data-testid="message-list">
      {messages.map(message => (
        <MessageBubble key={message.id} message={message} />
      ))}
    </StyledMessageList>
  );
};