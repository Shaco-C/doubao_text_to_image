import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { useChatMessages } from '../../hooks/useChatMessages';

export function ChatArea() {
  const { 
    messages, 
    isLoading, 
    generateImage 
  } = useChatMessages();
  
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      backgroundColor: '#f9fafb'
    }}>
      {/* 聊天消息列表 */}
      <div style={{
        flex: 1, 
        overflow: 'hidden',
        position: 'relative'
      }}>
        <MessageList messages={messages} loading={isLoading} />
      </div>
      
      {/* 消息输入框 - 添加阴影和背景 */}
      <div style={{
        boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.05)',
        backgroundColor: 'white',
        position: 'relative',
        zIndex: 2
      }}>
        <MessageInput onSendMessage={generateImage} isLoading={isLoading} />
      </div>
    </div>
  );
} 