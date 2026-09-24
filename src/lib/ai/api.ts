import { buildAIPrompt } from "./buildPrompt";

export async function sendPortfolioAIMessage(userMessage: string, conversationHistory: { role: 'user' | 'ai', content: string }[] = []) {
  const prompt = buildAIPrompt(userMessage, conversationHistory);
  
  try {
    const response = await fetch("https://deepbot-backend.vercel.app/api/v1/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: prompt })
    });
    
    if (!response.ok) {
      throw new Error("Failed to communicate with AI");
    }
    
    const data = await response.json();
    
    // The backend returns { success: true, data: { reply: "..." } }
    if (data.data && data.data.reply) {
      return data.data.reply;
    }
    
    return data.reply || data.response || data.message || data.text || JSON.stringify(data);
  } catch (error) {
    console.error("AI API Error:", error);
    throw error;
  }
}
