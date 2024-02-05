import React, { useState } from 'react';
import ChatWindow from './ChatWindow'; // ChatWindow 컴포넌트 임포트
import '../css/chatbot.css'

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false); // 대화 창 표시 상태
    const [messages, setMessages] = useState([]); // 대화 내용 저장

    const toggleChatWindow = () => {
        setIsOpen(!isOpen); // 대화 창 표시 상태 토글
    };

    return (
        <div className="chatbot-container">
            {isOpen && (
                <div className="chat-window-container">
                    <ChatWindow messages={messages} setMessages={setMessages}/>
                </div>
            )}
            <button onClick={toggleChatWindow} className="chatbot-button">
                {isOpen ? 'Close Chat' : 'Open Chat'}
            </button>
        </div>
    );

};


export default ChatBot;