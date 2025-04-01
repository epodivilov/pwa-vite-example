import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { TextInput } from "../components/TextInput";
import { useViewportSize, Size } from "../hooks/useViewportSize";

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
  justify-content: center;
  align-items: center;
`;

const StyledInputContainer = styled.div`
  width: 100%;
  height: 50px;
  flex: 0 0 50px;
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
  background-color: #1976d2;
  color: white;

  &:hover {
    background-color: #1565c0;
  }

  &:active {
    background-color: #0d47a1;
  }
`;

export function TestLayout() {
  const [inputValue, setInputValue] = useState("");

  const viewportSize = useViewportSize();
  const [sizes, setSizes] = useState<Size>([
    window.innerWidth,
    window.innerHeight,
  ]);

  useEffect(() => {
    if (viewportSize) {
      setSizes(viewportSize);
    }
  }, [viewportSize]);

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  return (
    <StyledContainer viewportSize={sizes}>
      <StyledHeader>Header</StyledHeader>
      <StyledContent>Content</StyledContent>
      <StyledInputContainer>
        <TextInput
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type something..."
          onBlur={() => {
            setSizes([window.innerWidth, window.innerHeight]);
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
          <SendButton aria-label="Send message">➤</SendButton>
        </RightButtonGroup>
      </ActionButtonsContainer>
    </StyledContainer>
  );
}
