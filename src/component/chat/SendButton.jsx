import * as React from "react";
import styled from "styled-components";

export function SendButton({ disabled }) {
  return (
    <StyledButton 
      type="submit"
      disabled={disabled}
      aria-label="Send message"
    >
      <Icon 
        loading="lazy" 
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/aea58d49c88aa506594d909d1df250684b30785455a2f854d53eb2895cf89ce1?placeholderIfAbsent=true&apiKey=12c88cfd4a664977958acab9caf9f3bf" 
        alt="" 
      />
    </StyledButton>
  );
}

const StyledButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${props => props.disabled ? 0.5 : 1};
  transition: opacity 0.2s ease;

  &:focus {
    outline: 2px solid #757575;
    border-radius: 2px;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const Icon = styled.img`
  aspect-ratio: 1.12;
  object-fit: contain;
  object-position: center;
  width: 28px;
`;