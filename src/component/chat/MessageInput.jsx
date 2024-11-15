import * as React from "react";
import styled from "styled-components";
import { AttachmentIcon } from "./AttachmentIcon";
import { SendButton } from "./SendButton";
import api from "../api/axios";

function MessageInput({ roomId, stompClient }) {
    const [message, setMessage] = React.useState("");
    const [file, setFile] = React.useState(null);

    const fileInputRef = React.useRef(null);

    const handleSubmit = async (e) => {
        console.log("submit");
        e.preventDefault();
        let mediaId = null;

        if (file) {
            try {
                const formData = new FormData();
                formData.append("file", file);

                // 파일 업로드 요청
                const response = await api.post("/media/upload", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                // 업로드 성공 시 mediaId 가져오기
                mediaId = response.data.mediaId;
                console.log("Uploaded Media ID:", mediaId);
                setFile(null); // 파일 초기화
                fileInputRef.current.value = null; // 파일 입력창 리셋
            } catch (error) {
                console.error("File upload failed:", error);
                setFile(null); // 파일 초기화
                fileInputRef.current.value = null; // 파일 입력창 리셋
                return; // 업로드 실패 시 메시지 전송 안 함
            }
        }

        // 메시지 전송
        if (message.trim() || mediaId) {
            if (stompClient) {
                stompClient.send(
                    `/pub/chat/message/send`,
                    {},
                    JSON.stringify({ roomId: roomId, mediaId: mediaId, message: message })
                );
            }
            setMessage("");
        }
    };

    // 파일 선택 처리 및 유효성 검사
    const handleUpload = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const validExtensions = [".jpg", ".jpeg", ".png", ".tif", ".tiff"];
            const fileExtension = selectedFile.name.split(".").pop().toLowerCase();

            if (validExtensions.includes(`.${fileExtension}`)) {
                setFile(selectedFile);
            } else {
                alert("유효한 파일 형식이 아닙니다. 이미지만 업로드 가능합니다.");
            }
        }
    };

    const handleAttachmentClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); // 파일 선택 창 열기
        }
    };

    const removeFile = () => {
        console.log("remove")
        setFile(null);
        fileInputRef.current.value = null;
    };

    return (
        <ChatInputContainer onSubmit={handleSubmit}>
            <AttachmentIcon onClick={handleAttachmentClick} />
            <input
                ref={fileInputRef}
                type="file"
                style={{ display: "none" }}
                accept=".jpg,.jpeg,.png,.tif,.tiff"
                onChange={handleUpload}
            />
            <InputField
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="메시지 입력..."
                aria-label="Type your message"
            />
            {file && (
                <FilePreview>
                    <FileName>{file.name}</FileName>
                    <RemoveFileButton type="button" onClick={removeFile}>x</RemoveFileButton>
                </FilePreview>
            )}
            <SendButton disabled={!message.trim() && !file} />
        </ChatInputContainer>
    );
}

const ChatInputContainer = styled.form`
  background-color: #fff2cc;
  display: flex;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  gap: 15px;
  color: #757575;
  padding: 12px 19px;
  font: 400 15px Inter, sans-serif;
  position: sticky;
  bottom: 0px;
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

const FilePreview = styled.div`
  display: flex;
  align-items: center;
  background-color: #e0e0e0;
  border-radius: 5px;
  padding: 5px 10px;
  margin-right: 10px;
`;

const FileName = styled.span`
  font-size: 14px;
  color: #555;
  margin-right: 5px;
`;

const RemoveFileButton = styled.button`
  background: none;
  border: none;
  color: #999;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    color: #333;
  }
`;

export default MessageInput;
