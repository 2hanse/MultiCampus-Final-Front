import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import ChatHeader from "../../chat/ChatHeader";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { useParams } from "react-router-dom";
import MessageInput from "../../chat/MessageInput";
import Message from "../../chat/Message";
import { getUserIdFromToken } from "../../api/jwt";

function ChatRoomPage() {
    const localUserId = getUserIdFromToken(); // userId를 동적으로 가져옴
    const { roomId } = useParams();
    const [stompClient, setStompClient] = useState(null);
    const [messages, setMessages] = useState([]);
    const [showScrollToBottom, setShowScrollToBottom] = useState(false);
    const [prevHeight, setPrevHeight] = useState(0);
    const messagesEndRef = useRef(null);
    const messagesContainerRef = useRef(null);
    const firstLoad = useRef(true); // 첫 로드 여부

    useEffect(() => {
        const socket = new SockJS("http://localhost:8000/ws");
        const stomp = Stomp.over(socket);

        stomp.connect(
            {Authorization: `Bearer ${localStorage.getItem('token')}`},
            (frame) => {
                console.log("Connected: " + frame);

                // 메시지 추가 구독
                stomp.subscribe(`/sub/chat/message/add/${roomId}`, (message) => {
                    const receivedMsg = JSON.parse(message.body);
                    setMessages((prevMessages) => {
                        const isDuplicate = prevMessages.some((msg) => msg.msgId === receivedMsg.msgId);
                        if (!isDuplicate) {
                            const newMessages = [...prevMessages, receivedMsg];
                            const sortedMessages = newMessages.sort((a, b) => new Date(a.messageTimestamp) - new Date(b.messageTimestamp));
                            return sortedMessages;
                        }
                        return prevMessages;
                    });
                });

                // 메시지 목록 구독
                stomp.subscribe(`/sub/chat/message/list/${localUserId}`, (message) => {
                    const receivedMsgList = JSON.parse(message.body);
                    const sortedMessages = receivedMsgList.sort((a, b) => new Date(a.messageTimestamp) - new Date(b.messageTimestamp));
                    setMessages((prevMessages) => {
                        const combinedMessages = [...sortedMessages, ...prevMessages];
                        const uniqueMessages = combinedMessages.filter(
                            (msg, index, self) => index === self.findIndex((m) => m.msgId === msg.msgId)
                        );
                        console.log("msgs" , uniqueMessages);
                        return uniqueMessages;
                    });
                });

                // 메시지 목록 요청 (최초 100개)
                stomp.send(`/pub/chat/message/list`, {}, JSON.stringify({ roomId: roomId, limit: 100, offset: null }));
            }
        );

        setStompClient(stomp);

        return () => {
            if (stomp) {
                stomp.disconnect();
            }
        };
    }, [localUserId]);

    // 스크롤을 맨 아래로 이동시키는 함수
    const scrollToBottom = (smooth = true) => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView( smooth ? { behavior: "smooth" } : undefined );
        }
    };

    useEffect(() => {
        // 첫 목록 조회 && 메시지 배열에 데이터 정상적으로 들어왔는지 체크
        if (firstLoad.current && messages.length) {
            scrollToBottom(false);
            firstLoad.current = false;
        }

        // 과거 메시지 추가된 후, 추가 전 스크롤 위치로 이동
        if (prevHeight) {
            messagesContainerRef.current?.scrollTo({ top: messagesContainerRef.current?.scrollHeight - prevHeight });
            setPrevHeight(undefined);
        }

        // 만약 과거 메시지를 조회중이 아닌경우 (채팅창 가장 최신메시지 하단을 보고있는 경우)
        if (!showScrollToBottom) {
            scrollToBottom();
        }
    }, [messages]); // messages 변경될 때마다 실행

    // 스크롤 이벤트 핸들러
    const handleScroll = () => {
        const container = messagesContainerRef.current;
        if (!container) return;

        const isAtTop = container.scrollTop === 0;
        const isFarFromBottom = container.scrollHeight - container.scrollTop > container.clientHeight + 10 * 50;

        if (isFarFromBottom) {
            setShowScrollToBottom(true);
        } else {
            setShowScrollToBottom(false);
        }

        if (isAtTop) {
            setPrevHeight(messagesContainerRef.current?.scrollHeight ?? 0);

            const smallestMsgId = messages.reduce((min, msg) => {
                return msg.msgId < min ? msg.msgId : min;
              }, messages[0].msgId); // msgId 최솟값을 구함, 그래야 가장 위에 위치한 메시지 즉 가장 오래된 메시지 id 를 가져올 수 있기 떄문
            stompClient.send(`/pub/chat/message/list`, {}, JSON.stringify({ roomId: roomId, limit: 15, offset: smallestMsgId }));
        }
    };

    // 분 단위까지만 포맷
    const getTimeString = (createdAt) => {
        return new Date(createdAt).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            hour12: false,
            minute: '2-digit'
        });
    }

    const getDateString = (createdAt) => {
        return new Date(createdAt).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long'
        });
    }

    return (
        <Container>
            <ChatHeaderWrapper>
                <ChatHeader title={"대화방 " + roomId} />
            </ChatHeaderWrapper>
            <ChatListContainer ref={messagesContainerRef} onScroll={handleScroll}>
                {messages.length > 0 ? (
                    messages.map((msg, idx) => {
                        const isFirst = idx === 0;
                        const timeString = getTimeString(msg.messageTimestamp);
                        const dateString = getDateString(msg.messageTimestamp);
                        let displayTime = true;
                        let displayDate = true;
                        let displayProfile = false;
                        let nextDateString = "";

                        // 마지막 인덱스 아닐 때만 실행
                        if (idx !== messages.length - 1) {
                            const nextMsg = messages[idx + 1];
                            const nextSender = nextMsg.userId;
                            const nextTimeString = getTimeString(nextMsg.messageTimestamp);
                            nextDateString = getDateString(nextMsg.messageTimestamp);
                            if (nextTimeString === timeString) { // 다음 메시지와 시간이 같으면
                                // 현재 채팅과 다음 채팅이 같은 유저라면
                                if (nextSender === msg.userId) {
                                    displayTime = false; // 시간 표시 안함
                                }
                            } else { // 한 유저가 계속 채팅 쳐도 시간이 달라진경우 프사 표시
                                displayProfile = true;
                            }

                            if (dateString === nextDateString) { // 날짜가 같다면
                                displayDate = false; // 날짜 표시 안함
                            }
                        } else {
                            displayDate = false;
                        }
                        if (idx !== 0) { // 이전 메시지 존재 체크위해 첫번째 메시지 제외
                            const prevMsg = messages[idx - 1];
                            const prevSender = prevMsg.userId;

                            if (prevSender !== msg.userId) { // 이전 메시지를 보낸사람과 다르다면 프사 표시
                                displayProfile = true;
                            }
                        } else { // 첫번째 메시지인경우에 프사 표시
                            displayProfile = true;
                        }
                        return (
                            <div key={msg.msgId}>
                                { isFirst && (
                                    <DateContainer>
                                        {dateString}
                                    </DateContainer>
                                )}
                                <Message 
                                    msg={msg} 
                                    displayTime={displayTime}
                                    displayProfile={displayProfile} 
                                    isSentByMe={msg.userId === localUserId} 
                                />
                                {displayDate && (
                                    <DateContainer>
                                        {nextDateString}
                                    </DateContainer>
                                )}
                            </div>
                        )
                    })
                ) : (
                    <p>아직 도착한 메시지가 없어요 ㅠ_ㅠ</p>
                )}
                <div ref={messagesEndRef} /> {/* 스크롤 이동을 위한 div */}
            </ChatListContainer>
            {showScrollToBottom && (
                <ScrollToBottomBar onClick={scrollToBottom}>
                    Scroll to Latest Messages
                </ScrollToBottomBar>
            )}
            <MessageInput roomId={roomId} stompClient={stompClient} />
        </Container>
    );
}

const DateContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f0f0f0;
    color: #666;
    font-size: 14px;
    padding: 10px;
    margin: 10px 0;
    border-radius: 5px;
    width: 100%;
    text-align: center;
`;

const ScrollToBottomBar = styled.div`
  background: #ffd966;
  border: 1px solid #dcdcdc;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  text-align: center;
  width: 100%;
  margin-bottom: 10px;
`;

const Container = styled.div`
  width: 100%;
  max-width: 962px;
`;

const ChatHeaderWrapper = styled.div`
  padding: 62px 26px 25px;
  background-color: #ffd966;
  display: flex;
  gap: 20px;
  @media (max-width: 991px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0;
  }
`;

const ChatListContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 22px;
  height: 70vh;
  overflow-y: auto;
  align-items: stretch;
  color: #000;
  padding: 0 28px;
  font: 400 18px Inter, sans-serif;
`;

export default ChatRoomPage;
