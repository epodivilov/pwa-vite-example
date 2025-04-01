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
  background-color: tomato;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledContent = styled.div`
  flex: 1;
  overflow-y: auto;
  background-color: orange;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledInputContainer = styled.div`
  width: 100%;
  height: 50px;
  flex: 0 0 50px;
  background-color: lime;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 6px;
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
    </StyledContainer>
  );
}