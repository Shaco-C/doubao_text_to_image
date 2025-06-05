export function Sidebar() {
  return (
    <div style={{
      height: '100%',
      backgroundColor: 'white',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* 头部Logo */}
      <div style={{
        padding: '16px',
        borderBottom: '1px solid #e5e7eb',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '8px',
          backgroundColor: '#3b82f6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '16px'
        }}>AI</div>
        <h1 style={{
          fontSize: '18px',
          fontWeight: 'bold',
          color: '#111827'
        }}>AI图像助手</h1>
      </div>
      
      {/* 新建聊天按钮 */}
      <div style={{ padding: '16px' }}>
        <button style={{
          width: '100%',
          backgroundColor: '#3b82f6',
          color: 'white',
          padding: '10px',
          borderRadius: '8px',
          border: 'none',
          fontWeight: '500',
          cursor: 'pointer',
          transition: 'background-color 0.2s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}>
          <span style={{ fontSize: '16px' }}>+</span>
          <span>新建聊天</span>
        </button>
      </div>
      
      {/* 历史记录列表 */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '8px 12px'
      }}>
        <div style={{
          fontSize: '13px',
          color: '#6b7280',
          padding: '6px 8px',
          marginBottom: '8px'
        }}>历史记录</div>
        
        {/* 历史记录项 */}
        {Array.from({ length: 5 }).map((_, index) => (
          <div 
            key={index}
            style={{
              padding: '10px 12px',
              borderRadius: '8px',
              cursor: 'pointer',
              marginBottom: '4px',
              fontSize: '14px',
              color: '#374151',
              backgroundColor: index === 0 ? '#f3f4f6' : 'transparent',
              transition: 'background-color 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            <span style={{
              fontSize: '12px',
              color: '#6b7280',
              flexShrink: 0
            }}>#{index + 1}</span>
            <span style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              聊天记录 {index + 1}
            </span>
          </div>
        ))}
      </div>
      
      {/* 底部信息 */}
      <div style={{
        padding: '16px',
        borderTop: '1px solid #e5e7eb',
        fontSize: '12px',
        color: '#6b7280',
        textAlign: 'center'
      }}>
        © 2025 AI图像生成助手
      </div>
    </div>
  );
} 