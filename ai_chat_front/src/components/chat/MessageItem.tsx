import type { Message } from '../../types';

interface MessageItemProps {
  message: Message;
}

export function MessageItem({ message }: MessageItemProps) {
  const isUser = message.role === 'user';
  
  return (
    <div style={{
      padding: '16px 0',
      backgroundColor: isUser ? '#f9fafb' : 'white',
      borderBottom: '1px solid #f3f4f6'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '0 24px'
      }}>
        <div style={{
          display: 'flex',
          gap: '16px'
        }}>
          {/* 头像 */}
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            overflow: 'hidden',
            flexShrink: 0,
            border: '1px solid #e5e7eb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: isUser ? '#3b82f6' : '#10b981'
          }}>
            <div style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: '16px'
            }}>
              {isUser ? 'U' : 'A'}
            </div>
          </div>
          
          {/* 消息内容 */}
          <div style={{ flex: 1 }}>
            <div style={{
              fontWeight: 500,
              color: '#111827',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              {isUser ? '用户' : 'AI助手'}
              <span style={{
                fontSize: '12px',
                color: '#6b7280',
                fontWeight: 'normal'
              }}>
                {new Date(message.timestamp).toLocaleTimeString()}
              </span>
            </div>
            
            <div style={{
              marginTop: '8px',
              color: '#374151',
              lineHeight: '1.5',
              fontSize: '15px'
            }}>
              {message.content}
            </div>
            
            {/* 如果有图片，显示图片 */}
            {message.imageUrl && (
              <div style={{
                marginTop: '12px',
                padding: '8px',
                borderRadius: '12px',
                backgroundColor: '#f3f4f6',
                display: 'inline-block',
                maxWidth: '100%'
              }}>
                <img 
                  src={message.imageUrl} 
                  alt="生成的图像" 
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    maxHeight: '400px'
                  }}
                />
                <div style={{
                  marginTop: '8px',
                  fontSize: '12px',
                  color: '#6b7280',
                  textAlign: 'right'
                }}>
                  AI生成
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 