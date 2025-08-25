
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Message, Role } from './types';
import { sendMessageToGemini } from './services/geminiService';
import Header from './components/Header';
import ChatWindow from './components/ChatWindow';
import InputBar from './components/InputBar';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: Role.MODEL,
      parts: "Hello! I am Miral Khamar, your dedicated expert on the rules and regulations of the Department of Post, India. How may I assist you today?",
    },
  ]);
  const [userInput, setUserInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendMessage = useCallback(async () => {
    if (!userInput.trim() || isLoading) return;

    const newUserMessage: Message = { role: Role.USER, parts: userInput };
    setMessages(prev => [...prev, newUserMessage]);
    setUserInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await sendMessageToGemini(userInput);
      const modelMessage: Message = { role: Role.MODEL, parts: response };
      setMessages(prev => [...prev, modelMessage]);
    } catch (err) {
      const errorMessage = "I'm sorry, but I'm having trouble connecting to my knowledge base right now. Please check your network connection or API key and try again shortly.";
      setError(errorMessage);
      setMessages(prev => [...prev, { role: Role.MODEL, parts: errorMessage }]);
    } finally {
      setIsLoading(false);
    }
  }, [userInput, isLoading]);

  return (
    <div className="flex flex-col h-screen bg-gray-100 font-sans">
      <Header />
      <ChatWindow messages={messages} isLoading={isLoading} />
      {error && <div className="text-center text-red-500 py-2">{error}</div>}
      <InputBar
        userInput={userInput}
        setUserInput={setUserInput}
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
      />
    </div>
  );
};

export default App;
