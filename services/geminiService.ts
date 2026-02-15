
import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";

// Service to generate a community summary from recent messages using Gemini API
export const generateCommunitySummary = async (messages: Message[]): Promise<string> => {
  // Always obtain the API key exclusively from the environment variable process.env.API_KEY.
  const apiKey = process.env.API_KEY;
  if (!apiKey || messages.length === 0) return "שבת שלום לכולם! מחכים לראות את כולם בשולחן.";

  // Use the named parameter to initialize GoogleGenAI.
  const ai = new GoogleGenAI({ apiKey });
  const messagesText = messages.slice(0, 10).map(m => `${m.author}: ${m.content}`).join('\n');
  
  try {
    // Use ai.models.generateContent to query GenAI with both the model name and prompt.
    // 'gemini-3-flash-preview' is selected for basic text analysis tasks.
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `אתה עוזר קהילתי חם עבור "שבת לבומה". נתח את ההודעות וכתוב סיכום אווירה חיובי וקצר:\n${messagesText}`,
    });
    
    // Access the .text property directly (do not call it as a function).
    return response.text?.trim() || "שבת שלום ומבורכת!";
  } catch (error) {
    console.error("AI Error:", error);
    return "מתרגשים לקראת השבת הקרובה!";
  }
};
