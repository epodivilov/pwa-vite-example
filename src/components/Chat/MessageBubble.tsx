import styled from "@emotion/styled";
import { Message } from "../../types/message";

const StyledMessageBubble = styled.div<{ isUser: boolean }>`
  max-width: 80%;
  padding: 12px 16px;
  border-radius: 16px;
  background-color: ${props => props.isUser ? '#8456b1' : '#f0f2f5'};
  color: ${props => props.isUser ? '#ffffff' : '#1a1a1a'};
  align-self: ${props => props.isUser ? 'flex-end' : 'flex-start'};
  border-bottom-right-radius: ${props => props.isUser ? '4px' : '16px'};
  border-bottom-left-radius: ${props => props.isUser ? '16px' : '4px'};
  position: relative;
  word-break: break-word;
  white-space: pre-wrap;
  margin-bottom: 8px;
`;

const TimeStamp = styled.span<{ isUser: boolean }>`
  font-size: 11px;
  color: ${props => props.isUser ? 'rgba(255, 255, 255, 0.7)' : '#8a919e'};
  margin-top: 4px;
  display: block;
  text-align: right;
`;

// Utility function to format time
export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isUser = message.sender === 'user';

  return (
    <StyledMessageBubble isUser={isUser}>
      {message.text}
      <TimeStamp isUser={isUser}>{formatTime(message.timestamp)}</TimeStamp>
    </StyledMessageBubble>
  );
};