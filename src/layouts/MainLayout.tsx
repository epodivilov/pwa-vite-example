import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { TextInput } from "../components/TextInput";
import { useViewportSize, Size } from "../hooks/useViewportSize";
import { ChatManager, MessageList } from "../components/Chat";

const StyledContainer = styled.div<{ viewportSize?: Size }>`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  max-width: ${({ viewportSize }) =>
    viewportSize ? `${viewportSize[0]}px` : "100%"};
  max-height: ${({ viewportSize }) =>
    viewportSize ? `${viewportSize[1]}px` : "100%"};
  transition: max-width 0.13s ease-in-out, max-height 0.13s ease-in-out;
  overflow: hidden;
`;

const StyledHeader = styled.div`
  height: 50px;
  flex: 0 0 50px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledContent = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const StyledInputContainer = styled.div`
  width: 100%;
  min-height: 50px;
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
`;

// Action buttons container styling
const ActionButtonsContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 8px 16px;
  justify-content: space-between;
`;

const LeftButtonGroup = styled.div`
  display: flex;
  gap: 12px;
`;

const RightButtonGroup = styled.div`
  display: flex;
`;

const IconButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #e0e0e0;
  }

  &:active {
    background-color: #d0d0d0;
  }
`;

const SendButton = styled(IconButton)`
  background-color: #8456b1;
  color: white;

  &:hover {
    background-color: #734a9e;
  }

  &:active {
    background-color: #623c8d;
  }
`;

export function MainLayout() {
  const [inputValue, setInputValue] = useState("");

  const [viewportSize, updateViewportSize] = useViewportSize();

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  useEffect(() => {
    const isKeyboardVisible =
      viewportSize && viewportSize[1] < window.innerHeight;

    if (isKeyboardVisible) {
      document.documentElement.style.touchAction = "none";
    } else {
      document.documentElement.style.touchAction = "auto";
    }

    // const handleScroll = (e: Event) => {
    //   const isKeyboardVisible =
    //     viewportSize && viewportSize[1] < window.innerHeight;
    //   if (isKeyboardVisible) {
    //     e.preventDefault();
    //     e.stopPropagation();
    //     e.stopImmediatePropagation();
    //   }
    // };
    // window.visualViewport?.addEventListener("scroll", handleScroll);

    // return () => {
    //   window.visualViewport?.removeEventListener("scroll", handleScroll);
    // };
  }, [viewportSize]);

  return (
    <ChatManager>
      {({ messages, sendMessage }) => {
        const handleSendMessage = (text: string) => {
          sendMessage(text);
          setInputValue("");
        };

        return (
          <StyledContainer viewportSize={viewportSize}>
            <StyledHeader>Header</StyledHeader>
            <StyledContent>
              <MessageList messages={messages} />
            </StyledContent>
            <StyledInputContainer>
              <TextInput
                value={inputValue}
                onChange={handleInputChange}
                onSubmit={handleSendMessage}
                placeholder="Type something..."
                onBlur={() => {
                  updateViewportSize([window.innerWidth, window.innerHeight]);
                }}
              />
            </StyledInputContainer>
            <ActionButtonsContainer>
              <LeftButtonGroup>
                <IconButton aria-label="Attach file">📎</IconButton>
                <IconButton aria-label="Voice dictation">🎤</IconButton>
                <IconButton aria-label="Take photo">📷</IconButton>
              </LeftButtonGroup>
              <RightButtonGroup>
                <SendButton
                  aria-label="Send message"
                  onClick={() => handleSendMessage(inputValue)}
                >
                  ➤
                </SendButton>
              </RightButtonGroup>
            </ActionButtonsContainer>
          </StyledContainer>
        );
      }}
    </ChatManager>
  );
}
