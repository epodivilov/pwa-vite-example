import React, { useState, useRef } from "react";
import styled from "@emotion/styled";

export interface TextInputProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  onFocus?: () => void;
  onBlur?: () => void;
}

export function TextInput({
  value = "",
  onChange,
  placeholder = "",
  label,
  disabled = false,
  error,
  helperText,
  onFocus,
  onBlur,
}: TextInputProps) {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleFocus = () => {
    setFocused(true);
    onFocus?.();
  };
  const handleBlur = () => {
    setFocused(false);
    onBlur?.();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  const isLabelFloating = focused || value.length > 0;

  return (
    <InputContainer
      ref={containerRef}
      onClick={handleContainerClick}
      disabled={disabled}
      error={error}
    >
      {label && (
        <InputLabel floating={isLabelFloating} error={error}>
          {label}
        </InputLabel>
      )}

      <InputVisual>
        {value || focused ? (
          <InputValueContainer>
            <InputValue>{value}</InputValue>
            {focused && <Cursor />}
          </InputValueContainer>
        ) : placeholder ? (
          <InputPlaceholder>{placeholder}</InputPlaceholder>
        ) : null}

        <HiddenInput
          ref={inputRef}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
        />
      </InputVisual>

      {helperText && <HelperText error={error}>{helperText}</HelperText>}
    </InputContainer>
  );
}

const InputContainer = styled.div<{ disabled?: boolean; error?: boolean }>`
  position: relative;
  width: 100%;
  padding: 8px 12px;
  background-color: ${({ disabled }) => (disabled ? "#f5f5f5" : "white")};
  border-radius: 4px;
  border: 1px solid ${({ error }) => (error ? "#d32f2f" : "#ced4da")};
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "text")};

  &:hover {
    border-color: ${({ error, disabled }) => {
      if (disabled) return "#ced4da";
      return error ? "#d32f2f" : "#666";
    }};
  }

  &:focus-within {
    border-color: ${({ error }) => (error ? "#d32f2f" : "#1976d2")};
    box-shadow: 0 0 0 2px
      ${({ error }) =>
        error ? "rgba(211, 47, 47, 0.2)" : "rgba(25, 118, 210, 0.2)"};
  }
`;

const InputVisual = styled.div`
  position: relative;
  min-height: 24px;
  display: flex;
  align-items: center;
`;

const InputLabel = styled.label<{ floating: boolean; error?: boolean }>`
  position: absolute;
  left: 0;
  color: ${({ floating, error }) => {
    if (error) return "#d32f2f";
    return floating ? "#1976d2" : "#666";
  }};
  font-size: ${({ floating }) => (floating ? "12px" : "16px")};
  transform: ${({ floating }) =>
    floating ? "translateY(-16px)" : "translateY(0)"};
  transition: transform 0.2s ease, font-size 0.2s ease, color 0.2s ease;
  pointer-events: none;
`;

const InputValueContainer = styled.div`
  display: flex;
  align-items: center;
`;

const InputValue = styled.span`
  font-size: 16px;
  color: #000;
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
  background-color: #1976d2;
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