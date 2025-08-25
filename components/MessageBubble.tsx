
import React from 'react';
import { Message, Role } from '../types';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === Role.USER;

  const bubbleClasses = isUser
    ? 'bg-red-600 text-white self-end'
    : 'bg-gray-200 text-gray-800 self-start';

  const containerClasses = isUser ? 'justify-end' : 'justify-start';

  const formattedParts = message.parts
    .split('\n')
    .map((line, index, arr) => (
      <React.Fragment key={index}>
        {line}
        {index < arr.length - 1 && <br />}
      </React.Fragment>
    ));

  return (
    <div className={`flex ${containerClasses} mb-4`}>
      <div className={`rounded-lg px-4 py-2 max-w-lg lg:max-w-2xl shadow-md ${bubbleClasses}`}>
        <p className="text-base break-words">{formattedParts}</p>
      </div>
    </div>
  );
};

export default MessageBubble;
