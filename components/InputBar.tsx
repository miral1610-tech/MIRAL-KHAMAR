
import React from 'react';

interface InputBarProps {
  userInput: string;
  setUserInput: (value: string) => void;
  onSendMessage: () => void;
  isLoading: boolean;
}

const SendIcon: React.FC<{className: string}> = ({className}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
    </svg>
);


const InputBar: React.FC<InputBarProps> = ({ userInput, setUserInput, onSendMessage, isLoading }) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      onSendMessage();
    }
  };
  
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput(event.target.value);
    // Auto-resize textarea
    event.target.style.height = 'auto';
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  return (
    <footer className="bg-white border-t border-gray-200 p-4">
      <div className="max-w-4xl mx-auto flex items-end">
        <textarea
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none resize-none max-h-40"
          value={userInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Ask Miral a question..."
          rows={1}
          disabled={isLoading}
        />
        <button
          onClick={onSendMessage}
          disabled={isLoading || !userInput.trim()}
          className="ml-3 p-3 bg-red-600 text-white rounded-full disabled:bg-red-300 disabled:cursor-not-allowed hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          aria-label="Send message"
        >
          <SendIcon className="w-6 h-6" />
        </button>
      </div>
    </footer>
  );
};

export default InputBar;
