import React, {useEffect, useRef} from "react";
import axios from "axios";

const ChatWindow = ({ messages, setMessages }) => {
    // 여기에는 메시지를 표시하고 입력을 처리하는 로직을 추가합니다.
    const handleMessageSubmit = async (e) => {
        e.preventDefault();
        const inputMessage = e.target.message.value.trim();
        if (inputMessage) {
            setMessages([...messages, { type: 'user', text: inputMessage }]); // 사용자 메시지 추가
            e.target.message.value = ''; // 입력 필드 초기화

            const response = await sendMessageToBackend(inputMessage);
            if (!response.error) {
                setMessages(messages => [...messages, { type: 'bot', text: response }]); // 백엔드 응답 추가
            } else {
                // 오류 메시지 처리
                setMessages(messages => [...messages, { type: 'bot', text: 'Sorry, there was an error processing your message.' }]);
            }
        }
    };

    const BACKEND_URL = 'http://localhost:8080/gpt/gen';
    const sendMessageToBackend = async (message) => {
        try {
            // return {
            //     error: null,
            //     message: message + " checked"
            // };
            const response = await axios.post(BACKEND_URL, { message });
            return response.data; // 백엔드에서 반환한 응답
        } catch (error) {
            console.error('Error sending message:', error);
            return { error: 'Failed to send message' }; // 오류 처리
        }
    };
    const endOfMessagesRef = useRef(null);

    useEffect(() => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div style={{
            border: '1px solid black',
            padding: '10px',
            width: '300px',
            height: '400px',
            overflowY: 'auto',
            position: 'relative', // 대화창 내에서 절대 위치를 위한 기준 설정
        }}>
            {/* 메시지 표시 */}
            {messages.map((message, index) => (
                <div
                    key={index}
                    style={{
                        textAlign: message.type === 'user' ? 'right' : 'left',
                        padding: '5px',
                        margin: '5px 0',
                        backgroundColor: message.type === 'user' ? '#add8e6' : '#d3d3d3',
                        color: 'black',
                        borderRadius: '10px',
                        maxWidth: '80%',
                        marginLeft: message.type === 'user' ? '20%' : '0',
                        marginRight: message.type === 'bot' ? '20%' : '0'
                    }}
                >
                    {message.text}
                </div>
            ))}

            {/* 메시지 입력 및 전송 로직 */}
            <form
                onSubmit={handleMessageSubmit}
                style={{
                    position: 'absolute', // 입력 폼을 대화창 하단에 고정
                    bottom: '10px', // 하단 가장자리에서부터의 거리
                    right: '10px', // 오른쪽 가장자리에서부터의 거리
                }}
            >
                <input
                    type="text"
                    name="message"
                    placeholder="Type a message..."
                    style={{ marginRight: '5px' }} // 버튼과의 간격 조정
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );

};

export default ChatWindow;
