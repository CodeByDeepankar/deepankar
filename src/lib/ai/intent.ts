export type AIIntent = 
  | 'projects' 
  | 'project-detail' 
  | 'gallery' 
  | 'skills' 
  | 'hackathons' 
  | 'about' 
  | 'current-work' 
  | 'contact' 
  | 'general';

export function detectIntent(message: string): AIIntent {
  const lowerMsg = message.toLowerCase();
  
  if (lowerMsg.includes('project') || lowerMsg.includes('work') || lowerMsg.includes('built')) {
    // Check if they are asking about a specific project
    if (lowerMsg.includes('tekkyz') || lowerMsg.includes('gyanaratna') || lowerMsg.includes('nidhisetu') || lowerMsg.includes('detail') || lowerMsg.includes('about tekkyz')) {
      return 'project-detail';
    }
    return 'projects';
  }
  
  if (lowerMsg.includes('gallery') || lowerMsg.includes('photo') || lowerMsg.includes('picture') || lowerMsg.includes('image')) {
    return 'gallery';
  }
  
  if (lowerMsg.includes('skill') || lowerMsg.includes('tech') || lowerMsg.includes('stack') || lowerMsg.includes('technologies')) {
    return 'skills';
  }
  
  if (lowerMsg.includes('hackathon') || lowerMsg.includes('competition') || lowerMsg.includes('event')) {
    return 'hackathons';
  }
  
  if (lowerMsg.includes('currently building') || lowerMsg.includes('lab') || lowerMsg.includes('current') || lowerMsg.includes('now')) {
    return 'current-work';
  }
  
  if (lowerMsg.includes('who is') || lowerMsg.includes('about') || lowerMsg.includes('education') || lowerMsg.includes('experience') || lowerMsg.includes('background')) {
    return 'about';
  }

  if (lowerMsg.includes('contact') || lowerMsg.includes('email') || lowerMsg.includes('reach') || lowerMsg.includes('hire')) {
    return 'contact';
  }
  
  return 'general';
}
