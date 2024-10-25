import * as React from "react";
import styled from "styled-components";
import { AttachmentIcon } from "./AttachmentIcon";
import { SendButton } from "./SendButton";

function MessageInput({ roomId, stompClient }) {
    const [message, setMessage] = React.useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim()) {
            if (stompClient) {
                stompClient.send(`/pub/chat/message/send`, {}, JSON.stringify({ roomId: roomId, message: message }));
            }
            setMessage("");
        }
    };

    return (
        <ChatInputContainer onSubmit={handleSubmit}>
            <AttachmentIcon />
            <InputField
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="메시지 입력..."
                aria-label="Type your message"
            />
            <SendButton disabled={!message.trim()} />
        </ChatInputContainer>
    );
}

const ChatInputContainer = styled.form`
  background-color: #fff2cc;
  display: flex;
  align-items: center;
  gap: 15px;
  color: #757575;
  padding: 12px 19px;
  font: 400 15px Inter, sans-serif;
`;

const InputField = styled.input`
  border-radius: 10px;
  background-color: #fff;
  flex: 1;
  padding: 13px 14px;
  border: none;
  outline: none;
  
  &:focus {
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  }
`;

export default MessageInput;