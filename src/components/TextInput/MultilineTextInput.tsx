import React, { useRef, useEffect, KeyboardEvent, useState } from "react";
import styled from "@emotion/styled";

export interface MultilineTextInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  onFocus?: () => void;
  onBlur?: () => void;
}

const isDesktop = () => {
  // Simple check to determine if we're on desktop or mobile
  // Better approach would use a proper library, but this works for basic cases
  return window.innerWidth >= 768;
};

export function MultilineTextInput({
  value,
  onChange,
  onSubmit,
  placeholder = "",
  disabled = false,
  error,
  helperText,
  onFocus,
  onBlur,
}: MultilineTextInputProps) {
  const [focused, setFocused] = useState(false);
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const visualValueRef = useRef<HTMLDivElement>(null);
  const [desktop, setDesktop] = useState(isDesktop());

  useEffect(() => {
    const handleResize = () => {
      setDesktop(isDesktop());
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // Auto-adjust height based on content
    if (visualValueRef.current) {
      visualValueRef.current.style.height = "auto";
      visualValueRef.current.style.height = `${visualValueRef.current.scrollHeight}px`;
    }
  }, [value]);

  const handleFocus = () => {
    setFocused(true);
    onFocus?.();
  };

  const handleBlur = () => {
    setFocused(false);
    onBlur?.();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleContainerClick = () => {
    hiddenInputRef.current?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (desktop && e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && onSubmit) {
        onSubmit(value);
      }
    }
  };

  return (
    <InputContainer
      ref={containerRef}
      onClick={handleContainerClick}
      disabled={disabled}
      error={error}
    >
      <HiddenInput
        ref={hiddenInputRef}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={disabled}
      />

      <InputVisual>
        {value || focused ? (
          <InputValueContainer>
            <InputValue>{value}</InputValue>
            {focused && <Cursor />}
          </InputValueContainer>
        ) : placeholder ? (
          <InputPlaceholder>{placeholder}</InputPlaceholder>
        ) : null}
      </InputVisual>

      {helperText && <HelperText error={error}>{helperText}</HelperText>}
    </InputContainer>
  );
}

const InputContainer = styled.div<{ disabled?: boolean; error?: boolean }>`
  position: relative;
  width: 100%;
  background-color: ${({ disabled }) => (disabled ? "#f5f5f5" : "white")};
  border-radius: 20px;
  border: 1px solid ${({ error }) => (error ? "#d32f2f" : "#ced4da")};
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "text")};
  padding: 12px 16px;

  &:hover {
    border-color: ${({ error, disabled }) => {
      if (disabled) return "#ced4da";
      return error ? "#d32f2f" : "#666";
    }};
  }

  &:focus-within {
    border-color: ${({ error }) => (error ? "#d32f2f" : "#8456b1")};
    box-shadow: 0 0 0 2px
      ${({ error }) =>
        error ? "rgba(211, 47, 47, 0.2)" : "rgba(132, 86, 177, 0.2)"};
  }
`;

const InputVisual = styled.div`
  position: relative;
  min-height: 24px;
  max-height: 150px;
  overflow-y: auto;
`;

const InputValueContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;

const InputValue = styled.div`
  font-size: 16px;
  line-height: 1.5;
  color: #000;
  background: transparent;
  white-space: pre-wrap;
  word-break: break-word;
  width: 100%;
  min-height: 24px;
  cursor: text;
`;

const InputPlaceholder = styled.span`
  font-size: 16px;
  color: #aaa;
`;

const HiddenInput = styled.input`
  position: fixed;
  top: 0;
  left: 0;
  width: 1px;
  height: 1px;
  opacity: 0;
  z-index: 1;
  cursor: inherit;
`;

const HelperText = styled.div<{ error?: boolean }>`
  margin-top: 4px;
  font-size: 12px;
  color: ${({ error }) => (error ? "#d32f2f" : "#666")};
`;

const Cursor = styled.div`
  width: 2px;
  height: 18px;
  background-color: #8456b1;
  margin-left: 1px;
  animation: blink 1s step-end infinite;

  @keyframes blink {
    from,
    to {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }
`;
