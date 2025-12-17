export enum Role {
  USER = 'user',
  MODEL = 'model',
  SYSTEM = 'system'
}

export interface Message {
  id: string;
  role: Role;
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
}

export interface Topic {
  id: string;
  labelVi: string;
  labelJa: string;
  icon: string;
  promptPrefix: string;
  color: string;
}

export type ChatState = {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
};
