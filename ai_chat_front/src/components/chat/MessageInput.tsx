import { useState } from 'react';
import type { FormEvent, KeyboardEvent } from 'react';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
}

export function MessageInput({ onSendMessage, isLoading = false }: MessageInputProps) {
  const [message, setMessage] = useState('');
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!message.trim() || isLoading) return;
    
    onSendMessage(message);
    setMessage('');
  };
  
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // 按下Enter且没有按Shift时发送消息
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  
  return (
    <div style={{
      padding: '16px 24px',
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        position: 'relative'
      }}>
        <form onSubmit={handleSubmit} style={{ position: 'relative' }}>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="输入提示词生成图像..."
            style={{
              width: '100%',
              padding: '14px 60px 14px 16px',
              border: '1px solid #d1d5db',
              borderRadius: '12px',
              outline: 'none',
              resize: 'none',
              fontSize: '14px',
              lineHeight: '1.5',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
              minHeight: '56px',
              color: '#111827',
              backgroundColor: isLoading ? '#f9fafb' : 'white',
              transition: 'border-color 0.2s, box-shadow 0.2s',
              cursor: isLoading ? 'not-allowed' : 'text'
            }}
            rows={2}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!message.trim() || isLoading}
            style={{
              position: 'absolute',
              right: '10px',
              bottom: '10px',
              padding: '8px 12px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: !message.trim() || isLoading ? '#e5e7eb' : '#3b82f6',
              color: !message.trim() || isLoading ? '#9ca3af' : 'white',
              fontWeight: '500',
              fontSize: '14px',
              cursor: !message.trim() || isLoading ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {isLoading ? '生成中...' : '发送'}
          </button>
        </form>
        <div style={{
          marginTop: '8px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '12px',
          color: '#6b7280'
        }}>
          <div>按Enter发送，Shift+Enter换行</div>
          <div>© AI图像生成助手</div>
        </div>
      </div>
    </div>
  );
} 