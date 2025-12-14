import React from 'react';
import type { Message } from '../types';

interface Props {
  message: Message;
}

export const MessageBubble: React.FC<Props> = ({ message }) => {
  const isBot = message.role === 'bot';
  
  return (
    <div className={`message-container ${isBot ? 'bot' : 'user'}`}>
      <div className="message-bubble">
        <div className="message-content">{message.content}</div>
        {isBot && message.references && message.references.length > 0 && (
          <div className="message-references">
            <h4>Sources:</h4>
            <ul>
              {message.references.map((ref, i) => (
                <li key={i}>
                  <a href={ref.url} target="_blank" rel="noopener noreferrer">
                    {ref.source}: {ref.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
