import * as React from "react";
import styled from "styled-components";

export function AttachmentIcon() {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      // Handle attachment click
    }
  };

  return (
    <IconButton
      onClick={() => {/* Handle attachment click */}}
      onKeyPress={handleKeyPress}
      type="button"
      aria-label="Add attachment"
    >
      <Icon 
        loading="lazy" 
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/0774a1a449bd03c90b82665a356351845cec655feab754743d9c9f648ab9b279?placeholderIfAbsent=true&apiKey=12c88cfd4a664977958acab9caf9f3bf" 
        alt="" 
      />
    </IconButton>
  );
}

const IconButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:focus {
    outline: 2px solid #757575;
    border-radius: 2px;
  }
`;

const Icon = styled.img`
  aspect-ratio: 0.5;
  object-fit: contain;
  object-position: center;
  width: 15px;
`;