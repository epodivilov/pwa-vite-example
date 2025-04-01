import styled from '@emotion/styled';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'other';
  timestamp: Date;
}

const MessageListContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  height: 100%;
`;

const MessageBubble = styled.div<{ isUser: boolean }>`
  max-width: 80%;
  padding: 12px 16px;
  border-radius: 16px;
  background-color: ${props => props.isUser ? '#0084ff' : '#f0f2f5'};
  color: ${props => props.isUser ? '#ffffff' : '#1a1a1a'};
  align-self: ${props => props.isUser ? 'flex-end' : 'flex-start'};
  border-bottom-right-radius: ${props => props.isUser ? '4px' : '16px'};
  border-bottom-left-radius: ${props => props.isUser ? '16px' : '4px'};
  position: relative;
  word-break: break-word;
  white-space: pre-wrap;
`;

const TimeStamp = styled.span`
  font-size: 11px;
  color: #8a919e;
  margin-top: 4px;
  display: block;
  text-align: right;
`;

interface MessageListProps {
  messages: Message[];
}

const formatTime = (date: Date): string => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const MessageList = ({ messages }: MessageListProps) => {
  return (
    <MessageListContainer data-testid="message-list">
      {messages.map(message => (
        <MessageBubble key={message.id} isUser={message.sender === 'user'}>
          {message.text}
          <TimeStamp>{formatTime(message.timestamp)}</TimeStamp>
        </MessageBubble>
      ))}
    </MessageListContainer>
  );
};

export default MessageList;