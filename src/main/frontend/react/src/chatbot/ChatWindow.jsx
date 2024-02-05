import React, {useEffect, useRef} from "react";
import '../css/chatbot.css'

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
                setMessages(messages => [...messages, { type: 'bot', text: response.message }]); // 백엔드 응답 추가
            } else {
                // 오류 메시지 처리
                setMessages(messages => [...messages, { type: 'bot', text: 'Sorry, there was an error processing your message.' }]);
            }
        }
    };

    const BACKEND_URL = 'localhost:8080/chatbot';
    const sendMessageToBackend = async (message) => {
        try {
            return {
                error: null,
                message: message + " checked"
            };
            // const response = await axios.post(BACKEND_URL, { message });
            // return response.data; // 백엔드에서 반환한 응답
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
        <div className="chat-window">
            <div className="chat-title">채팅봇</div>
            <div className="chat-content"> {/* 채팅 내용을 위한 컨테이너 추가 */}
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`message-container ${message.type === 'user' ? 'message-user-container' : 'message-bot-container'}`}
                    >
                        <div className={`message ${message.type === 'user' ? 'message-user' : 'message-bot'}`}>
                            {message.text}
                        </div>
                    </div>
                ))}
            </div>
            <form onSubmit={handleMessageSubmit} className="chat-input">
                <input
                    type="text"
                    name="message"
                    placeholder="Type a message..."
                />
                <button type="submit">Send</button>
            </form>
        </div>

    );

};

export default ChatWindow;
