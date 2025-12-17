import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';
import { Message, Role } from '../types';

// Ensure API Key is present
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("Missing API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

/**
 * Transforms application messages to the format expected by the API history,
 * but specifically for creating the Chat instance context.
 * 
 * Note: We usually keep the chat history in the React state and feed it back or 
 * maintain the `Chat` object instance. For simplicity in this stateless service wrapper pattern, 
 * we'll reconstruct the chat or use a persistent object if needed. 
 * However, simpler here is to return a generator.
 */

let chatInstance: Chat | null = null;

export const getChatInstance = (): Chat => {
  if (!chatInstance) {
    chatInstance = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
  }
  return chatInstance;
};

export const resetChat = () => {
  chatInstance = null;
};

/**
 * Sends a message to the Gemini model and returns a stream of responses.
 * @param message User message string
 * @yields Chunks of text from the model
 */
export async function* sendMessageStream(message: string): AsyncGenerator<string, void, unknown> {
  const chat = getChatInstance();

  try {
    const resultStream = await chat.sendMessageStream({ message });
    
    for await (const chunk of resultStream) {
      const c = chunk as GenerateContentResponse;
      if (c.text) {
        yield c.text;
      }
    }
  } catch (error) {
    console.error("Error in sendMessageStream:", error);
    throw error;
  }
}
