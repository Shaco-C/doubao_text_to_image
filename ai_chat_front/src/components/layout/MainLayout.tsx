import type { ReactNode } from 'react';
import { Sidebar } from './Sidebar';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* 侧边栏 - 添加固定宽度和阴影 */}
      <div className="sidebar-container" style={{ 
        width: '260px', 
        flexShrink: 0,
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        zIndex: 10 
      }}>
        <Sidebar />
      </div>
      
      {/* 主内容区域 */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 头部 - 添加阴影和更好的样式 */}
        <header style={{ 
          height: '60px', 
          borderBottom: '1px solid #e5e7eb',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 24px',
          backgroundColor: 'white',
          zIndex: 5
        }}>
          <h2 style={{ 
            fontSize: '18px', 
            fontWeight: 600,
            color: '#111827'
          }}>AI图像聊天</h2>
        </header>
        
        {/* 主内容 */}
        <main className="flex-1 overflow-hidden bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
} 