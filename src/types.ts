export interface Reference {
  title: string;
  url: string;
  source: string;
}

export interface Message {
  role: 'user' | 'bot';
  content: string;
  references?: Reference[];
  timestamp?: number;
}

export interface ChatResponse {
  reply: string;
  references?: Reference[];
}
