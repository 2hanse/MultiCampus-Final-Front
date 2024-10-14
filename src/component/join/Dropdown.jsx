import React from "react";
import styled from "styled-components";

const Dropdown = ({ id }) => {
  return (
    <StyledDropdown>
      <select id={id}>
        <option value="">질문을 선택해 주세요</option>
      </select>
      <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/12221094a416e00ff30d6d9b2f3ec385c3b99cf8b95b0d43275db41f8ca1e3e3?placeholderIfAbsent=true&apiKey=7adddd5587f24b91884c2915be4df62c" alt="Dropdown arrow" className="dropdown-arrow" />
    </StyledDropdown>
  );
};

const StyledDropdown = styled.div`
  border-radius: 8px;
  background-color: #fff;
  display: flex;
  margin-top: 7px;
  width: 294px;
  max-width: 100%;
  gap: 20px;
  font-size: 16px;
  color: #1e1e1e;
  justify-content: space-between;
  padding: 0 19px 0 70px;
  border: 1px solid #ffd966;
  align-items: center;

  select {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    font-size: 16px;
    color: #1e1e1e;
    appearance: none;
  }

  .dropdown-arrow {
    aspect-ratio: 1.45;
    object-fit: contain;
    object-position: center;
    width: 58px;
  }
`;

export default Dropdown;