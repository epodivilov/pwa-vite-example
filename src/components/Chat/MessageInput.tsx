import { useState, KeyboardEvent, ChangeEvent, useRef } from "react";
import styled from "@emotion/styled";

const InputContainer = styled.div`
  position: sticky;
  bottom: 0;
  display: flex;
  padding: 12px 16px;
  background-color: #ffffff;
  border-top: 1px solid #e0e0e0;
  z-index: 5;
  /* Add proper padding for iOS safe areas */
  padding-bottom: calc(env(safe-area-inset-bottom, 0) + 12px);
`;

const TextArea = styled.textarea`
  flex: 1;
  border: 1px solid #e0e0e0;
  border-radius: 24px;
  padding: 12px 16px;
  font-size: 16px;
  outline: none;
  resize: none;
  min-height: 48px;
  max-height: 40vh;
  font-family: inherit;
  overflow-y: auto;
  line-height: 1.4;

  &:focus {
    border-color: #0084ff;
    box-shadow: 0 0 0 1px rgba(0, 132, 255, 0.2);
  }
`;

const SendButton = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.active ? "#0084ff" : "#e0e0e0")};
  color: ${(props) => (props.active ? "#ffffff" : "#8a919e")};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  margin-left: 12px;
  cursor: ${(props) => (props.active ? "pointer" : "default")};
  transition: background-color 0.2s;
  align-self: flex-end;

  &:hover {
    background-color: ${(props) => (props.active ? "#0078e7" : "#e0e0e0")};
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
`;

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

const MessageInput = ({ onSendMessage }: MessageInputProps) => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);

    // Adjust textarea height
    const textarea = e.target;
    textarea.style.height = "auto";
    const newHeight = Math.min(textarea.scrollHeight, window.innerHeight * 0.4);
    textarea.style.height = `${newHeight}px`;
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");

      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // On desktop: Enter sends, Shift+Enter adds line break
    // On mobile: Shift+Enter adds line break, Enter sends
    if (e.key === "Enter" && e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <InputContainer>
      <TextArea
        ref={textareaRef}
        placeholder="Type a message..."
        value={message}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        rows={1}
      />
      <ButtonsContainer>
        <SendButton
          active={!!message.trim()}
          onClick={handleSendMessage}
          disabled={!message.trim()}
        >
          →
        </SendButton>
      </ButtonsContainer>
    </InputContainer>
  );
};

export default MessageInput;
