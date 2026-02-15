
import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";

export const generateCommunitySummary = async (messages: Message[]): Promise<string> => {
  // אתחול ה-AI בתוך הפונקציה מבטיח ש-process.env קיים וזמין
  const apiKey = process.env.API_KEY;
  if (!apiKey) return "שבת שלום לכולם! מחכים לראות את כולם בשולחן.";

  const ai = new GoogleGenAI({ apiKey });
  
  const messagesText = messages.map(m => `${m.author}: ${m.content}`).join('\n');
  
  const prompt = `
    אתה עוזר קהילתי חם ונעים עבור יוזמה שנקראת "שבת לבומה".
    להלן הודעות שהשאירו המשתתפים:
    ${messagesText}
    
    בהתבסס על ההודעות הללו, כתוב פסקה קצרה (עד 3 שורות) שמסכמת את האווירה הקהילתית לקראת השבת הקרובה ומאחלת שבת שלום ברוח חיובית.
    התשובה צריכה להיות בעברית. אל תשתמש בפורמט מרקדאון, פשוט טקסט נקי.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text?.trim() || "שבת שלום לכולם! מחכים לראות את כולם בשולחן.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "שבת שלום ומבורכת לכל קהילת לבומה!";
  }
};
