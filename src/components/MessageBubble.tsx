import React from 'react';
import type { Message } from '../types';

interface Props {
  message: Message;
}

export const MessageBubble: React.FC<Props> = ({ message }) => {
  const isBot = message.role === 'bot';
  
  return (
    <div className={`message-container ${isBot ? "bot" : "user"}`}>
      <div className="message-bubble">
        <div className="message-content">{message.content}</div>
      </div>
    </div>
  );
};
