import { getPortfolioContext } from "./context";
import { SYSTEM_PROMPT } from "./prompt";

export function buildAIPrompt(userMessage: string, conversationHistory: { role: 'user' | 'ai', content: string }[] = []) {
  const context = getPortfolioContext();
  
  let historyText = "";
  if (conversationHistory.length > 0) {
    historyText = "\n=========================\nRECENT CONVERSATION\n=========================\n";
    conversationHistory.slice(-6).forEach(msg => {
      historyText += `${msg.role.toUpperCase()}: ${msg.content}\n`;
    });
  }

  return `${SYSTEM_PROMPT}

=========================
PORTFOLIO DATA
=========================
${context}
${historyText}
=========================
USER QUESTION
=========================
${userMessage}

Answer naturally and accurately. Do not invent information. Keep it short and conversational.`;
}
