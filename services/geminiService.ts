
import { GoogleGenAI } from "@google/genai";
import { Message, SearchResult } from "../types";

const getAI = () => {
  // בדיקה בטוחה של מפתח ה-API
  const apiKey = (window as any).process?.env?.API_KEY || (process as any)?.env?.API_KEY;
  if (!apiKey) {
      console.warn("API Key is missing from environment");
      return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateCommunitySummary = async (messages: Message[]): Promise<string> => {
  if (messages.length === 0) return "שבת שלום לכולם! מחכים לראות את כולם בשולחן.";
  
  try {
    const ai = getAI();
    if (!ai) return "שבת שלום! הקהילה שלנו צומחת בכל יום.";
    
    const messagesText = messages.slice(0, 10).map(m => `${m.author}: ${m.content}`).join('\n');
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `אתה עוזר קהילתי חם עבור "שבת לבומה". נתח את ההודעות וכתוב סיכום אווירה חיובי וקצר בערבית/עברית בהתאם להודעות:\n${messagesText}`,
    });
    return response.text?.trim() || "שבת שלום ומבורכת!";
  } catch (error) {
    console.error("AI Error:", error);
    return "מתרגשים לקראת השבת הקרובה!";
  }
};

export const performCommunitySearch = async (query: string): Promise<SearchResult> => {
  try {
    const ai = getAI();
    if (!ai) return { text: "שירות החיפוש אינו זמין כרגע.", links: [] };

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: query,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "לא נמצאו תוצאות.";
    const links: { title: string; uri: string }[] = [];

    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (chunks) {
      chunks.forEach((chunk: any) => {
        if (chunk.web && chunk.web.uri) {
          links.push({
            title: chunk.web.title || "מקור מידע",
            uri: chunk.web.uri
          });
        }
      });
    }

    return { text, links };
  } catch (error) {
    console.error("Search Error:", error);
    return { 
      text: "מצטערים, חלה שגיאה בחיפוש. נסה שנית מאוחר יותר.",
      links: [] 
    };
  }
};
