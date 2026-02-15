
import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";

export const generateCommunitySummary = async (messages: Message[]): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const messagesText = messages.map(m => `${m.author}: ${m.content}`).join('\n');
  
  const prompt = `
    אתה עוזר קהילתי חם ונעים עבור יוזמה שנקראת "שבת לבומה".
    להלן הודעות שהשאירו המשתתפים:
    ${messagesText}
    
    בהתבסס על ההודעות הללו, כתוב פסקה קצרה (עד 3 שורות) שמסכמת את האווירה הקהילתית לקראת השבת הקרובה ומאחלת שבת שלום ברוח חיובית.
    התשובה צריכה להיות בעברית.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "שבת שלום לכולם! מחכים לראות את כולם בשולחן.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "שבת שלום ומבורכת לכל קהילת לבומה!";
  }
};
