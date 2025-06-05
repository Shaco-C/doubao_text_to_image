// 消息类型定义
export type MessageRole = 'user' | 'assistant';

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: number;
  // 如果是图像生成消息，包含图像URL
  imageUrl?: string;
}

// 聊天会话定义
export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
}

// 图像生成请求参数
export interface ImageGenerationRequest {
  prompt: string;
  size?: string;
}

// 图像生成响应
export interface ImageGenerationResponse {
  model: string;
  created: number;
  url: string;
  usage: {
    generated_images: number;
  };
} 