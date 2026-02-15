
import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";

export const generateCommunitySummary = async (messages: Message[]): Promise<string> => {
  // בדיקה בטוחה לקיום המשתנה
  const apiKey = typeof process !== 'undefined' ? process.env.API_KEY : (window as any).API_KEY;
  
  if (!apiKey) {
    console.warn("Missing API Key for Gemini Service");
    return "שבת שלום לכולם! מחכים לראות את כולם בשולחן.";
  }

  const ai = new GoogleGenAI({ apiKey });
  
  const messagesText = messages.map(m => `${m.author}: ${m.content}`).join('\n');
  
  const prompt = `
    אתה עוזר קהילתי חם ונעים עבור יוזמה שנקראת "שבת לבומה".
    להלן הודעות שהשאירו המשתתפים:
    ${messagesText}
    
    בהתבסס על ההודעות הללו, כתוב פסקה קצרה (עד 3 שורות) שמסכמת את האווירה הקהילתית לקראת השבת הקרובה ומאחלת שבת שלום ברוח חיובית.
    התשובה צריכה להיות בעברית. אל תשתמש בפורמט מרקדאון.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text?.trim() || "שבת שלום לכולם!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "שבת שלום ומבורכת לכל קהילת לבומה!";
  }
};
