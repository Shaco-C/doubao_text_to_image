import { useState, useCallback } from 'react';
import type { Message } from '../types';
import { api } from '../services/api';

// 生成唯一ID
const generateId = () => Math.random().toString(36).substring(2, 9);

export function useChatMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 添加用户消息
  const addUserMessage = useCallback((content: string) => {
    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content,
      timestamp: Date.now(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    return userMessage;
  }, []);

  // 添加助手消息
  const addAssistantMessage = useCallback((content: string, imageUrl?: string) => {
    const assistantMessage: Message = {
      id: generateId(),
      role: 'assistant',
      content,
      timestamp: Date.now(),
      imageUrl,
    };
    
    setMessages(prev => [...prev, assistantMessage]);
    return assistantMessage;
  }, []);

  // 生成图像
  const generateImage = useCallback(async (prompt: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // 添加用户提问消息
      addUserMessage(prompt);
      
      // 添加助手正在生成消息
      const loadingMessage = addAssistantMessage('正在生成图像，请稍候...');
      
      // 调用API生成图像
      const response = await api.generateImage({ prompt, size: '1024x1024' });
      
      // 更新助手消息，包含图像
      setMessages(prev => 
        prev.map(msg => 
          msg.id === loadingMessage.id 
            ? { 
                ...msg, 
                content: '图像已生成：', 
                imageUrl: response.url 
              } 
            : msg
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : '图像生成失败');
      // 添加错误消息
      addAssistantMessage('图像生成失败，请重试。', undefined);
    } finally {
      setIsLoading(false);
    }
  }, [addUserMessage, addAssistantMessage]);

  // 清空所有消息
  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    addUserMessage,
    addAssistantMessage,
    generateImage,
    clearMessages,
  };
} 