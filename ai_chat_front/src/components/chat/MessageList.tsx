import { useRef, useEffect } from 'react';
import type { Message } from '../../types';
import { MessageItem } from './MessageItem';

interface MessageListProps {
  messages: Message[];
  loading?: boolean;
}

export function MessageList({ messages, loading }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  
  // 当消息更新时，滚动到底部
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  if (messages.length === 0 && !loading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        textAlign: 'center',
        padding: '32px 24px',
        color: '#374151'
      }}>
        <div style={{ fontSize: '32px', marginBottom: '16px' }}>👋 早上好</div>
        <h2 style={{ 
          fontSize: '24px', 
          fontWeight: 'bold', 
          marginBottom: '16px',
          color: '#111827'
        }}>聊天界面</h2>
        <p style={{ 
          color: '#6b7280',
          marginBottom: '32px',
          maxWidth: '500px'
        }}>
          我是您的AI助手，可以帮您生成图像。请输入提示词，我将为您创建图像。
        </p>
        <div style={{
          backgroundColor: '#f3f4f6',
          padding: '24px',
          borderRadius: '12px',
          maxWidth: '500px',
          width: '100%',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)'
        }}>
          <h3 style={{ 
            fontWeight: 500, 
            marginBottom: '12px',
            color: '#111827'
          }}>示例提示:</h3>
          <div style={{ display: 'grid', gap: '8px' }}>
            {[
              '鱼眼镜头，一只猫咪的头部，画面呈现出猫咪的五官因为拍摄方式扭曲的效果',
              '一只金毛犬在海滩上奔跑，溅起水花，阳光照射下',
              '未来风格的城市夜景，霓虹灯，高楼大厦，飞行的汽车'
            ].map((prompt, i) => (
              <div key={i} style={{
                backgroundColor: 'white',
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                fontSize: '14px',
                color: '#4b5563'
              }}>
                {prompt}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div style={{
      flex: 1,
      overflowY: 'auto',
      padding: '16px 0',
      height: '100%'
    }}>
      {messages.map(message => (
        <MessageItem key={message.id} message={message} />
      ))}
      
      {/* 加载状态 */}
      {loading && (
        <div style={{
          padding: '16px',
          textAlign: 'center',
          color: '#6b7280'
        }}>
          <div style={{
            display: 'inline-block',
            animation: 'pulse 1.5s infinite',
            fontSize: '14px'
          }}>处理中...</div>
        </div>
      )}
      
      {/* 用于自动滚动的空div */}
      <div ref={bottomRef} />
    </div>
  );
} 