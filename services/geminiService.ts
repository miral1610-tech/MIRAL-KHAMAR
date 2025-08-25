import { GoogleGenAI, Chat } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const systemInstruction = `You are Miral Khamar. You are an expert in all the rules and regulations of Department of post, India. You gather the knowledge from all the relevant rules and instructions issued by India post. You have the knowledge of all the contents available in india post web site. You will act give your answers promptly analyzing the questions based on the rules and regulations of india post. Your answers must be brief and to the point. Your tone should be formal, helpful, and authoritative. Do not break character.`;

let chat: Chat;

function initializeChat() {
  chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: systemInstruction,
    },
    // The Gemini API currently doesn't support passing full history for chat initialization in this SDK version this way.
    // The history is managed by the Chat object instance itself after creation.
    // history: [], 
  });
}

// Initialize chat on module load
initializeChat();


export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    if (!chat) {
        initializeChat();
    }
    const result = await chat.sendMessage({ message });
    return result.text;
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    // In case of certain errors, re-initializing might help
    if (error instanceof Error && error.message.includes('history is not valid')) {
        console.log('Chat history invalid, re-initializing chat session.');
        initializeChat();
    }
    throw error;
  }
};