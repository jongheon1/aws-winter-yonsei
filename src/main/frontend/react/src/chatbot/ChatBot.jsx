import React, { useState } from 'react';
import ChatWindow from './ChatWindow'; // ChatWindow 컴포넌트 임포트

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false); // 대화 창 표시 상태
    const [messages, setMessages] = useState([]); // 대화 내용 저장

    const toggleChatWindow = () => {
        setIsOpen(!isOpen); // 대화 창 표시 상태 토글
    };

    return (
        <div style={{position: 'fixed', bottom: 20, right: 20, zIndex: 1000}}>
            {isOpen && (
                <div style={{ position: 'absolute', bottom: '40px', right: '0px' }}>
                    <ChatWindow messages={messages} setMessages={setMessages}/>
                </div>
            )}
            <button onClick={toggleChatWindow} style={{width: '100px', cursor: 'pointer', position: 'absolute', bottom: '0px', right: '0px'}}>
                {isOpen ? 'Close Chat' : 'Open Chat'}
            </button>
        </div>
    );

};


const ChatBotIcon = ({ onClick }) => {
    return (
        <button onClick={onClick} style={{ cursor: 'pointer' }}>
            Chat
        </button>
    );
};

export default ChatBot;