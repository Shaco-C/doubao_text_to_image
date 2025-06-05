# AI聊天与图像生成应用开发指南

## 目录

- [项目概述](#项目概述)
- [技术栈](#技术栈)
- [后端实现](#后端实现)
  - [项目结构](#项目结构)
  - [核心组件](#核心组件)
  - [配置详解](#配置详解)
- [API接口实现](#api接口实现)
  - [方舟API调用](#方舟api调用)
  - [OpenAI SDK配置](#openai-sdk配置)
  - [请求参数说明](#请求参数说明)
  - [图像生成实现](#图像生成实现)
- [常见问题与解决方案](#常见问题与解决方案)
- [优化与扩展](#优化与扩展)

## 项目概述

这是一个基于React和NestJS的AI聊天与图像生成应用，前端使用React展示界面，后端使用NestJS处理API请求，并调用方舟API生成图像。

## 技术栈

- 前端：React 19 + TypeScript + Vite
- 后端：NestJS + TypeScript
- API调用：OpenAI SDK（兼容方舟API）
- 环境配置：ConfigModule

## 后端实现

### 项目结构

```
ai_chat_backend/
├── src/
│   ├── ai/                    # AI相关模块
│   │   ├── dto/               # 数据传输对象
│   │   │   └── generate-image.dto.ts
│   │   ├── image-generation/  # 图像生成服务
│   │   │   └── image-generation.service.ts
│   │   ├── ai.controller.ts   # AI控制器
│   │   ├── ai.service.ts      # AI服务
│   │   └── ai.module.ts       # AI模块定义
│   ├── app.module.ts          # 应用模块
│   ├── app.controller.ts      # 应用控制器
│   ├── app.service.ts         # 应用服务
│   └── main.ts                # 入口文件
├── .env                       # 环境变量
└── package.json               # 依赖管理
```

### 核心组件

1. **AiModule**: AI功能的模块化封装
2. **ImageGenerationService**: 处理图像生成的服务
3. **GenerateImageDto**: 定义图像生成请求的数据结构
4. **AiController**: 提供API端点

### 配置详解

#### 环境变量设置

在`.env`文件中设置以下环境变量：

```
ARK_API_KEY=替换为你自己的api
ARK_API_BASE_URL=https://ark.cn-beijing.volces.com/api/v3
MODEL_ID=doubao-seedream-3-0-t2i-250415
PORT=3000
OPENAI_API_KEY=替换为你自己的api
```

#### ConfigModule配置

在`app.module.ts`中配置ConfigModule：

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AiModule } from './ai/ai.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AiModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

## API接口实现

### 方舟API调用

方舟API是一个与OpenAI API兼容的接口，可以使用OpenAI SDK进行调用。

#### 核心参数

- **API密钥**: `替换为你自己的api`
- **基础URL**: `https://ark.cn-beijing.volces.com/api/v3`
- **模型ID**: `doubao-seedream-3-0-t2i-250415`

### OpenAI SDK配置

我们使用OpenAI SDK与方舟API进行通信。关键配置如下：

```typescript
import OpenAI from 'openai';

// 初始化OpenAI客户端
const openai = new OpenAI({
  apiKey: '替换为你自己的api',
  baseURL: 'https://ark.cn-beijing.volces.com/api/v3',
  dangerouslyAllowBrowser: true,
  timeout: 120000, // 120秒超时
  maxRetries: 5    // 最多重试5次
});
```

### 请求参数说明

图像生成API需要以下参数：

| 参数 | 类型 | 说明 | 示例值 |
| --- | --- | --- | --- |
| model | string | 模型ID | 'doubao-seedream-3-0-t2i-250415' |
| prompt | string | 提示词 | '鱼眼镜头，一只猫咪的头部...' |
| size | string | 图像尺寸 | '1024x1024' |
| response_format | string | 响应格式 | 'url' |

### 图像生成实现

在`ImageGenerationService`中实现图像生成功能：

```typescript
async generateImage(generateImageDto: GenerateImageDto) {
  try {
    const { prompt, size } = generateImageDto;
    const modelId = 'doubao-seedream-3-0-t2i-250415';
    
    this.logger.log(`准备生成图像，模型ID: ${modelId}, 大小: ${size}`);
    this.logger.log(`提示词: ${prompt}`);
    
    try {
      // 使用OpenAI客户端发送请求
      const response = await this.openai.images.generate({
        model: modelId,
        prompt,
        size,
        response_format: 'url'
      });

      this.logger.log('图像生成成功');
      
      return {
        model: modelId,
        created: response.created,
        url: response.data?.[0]?.url,
        usage: response.usage
      };
    } catch (requestError) {
      // 错误处理...
    }
  } catch (error) {
    // 错误处理...
  }
}
```

## 常见问题与解决方案

### 1. 连接错误

**问题**: 出现"Connection error"错误。

**解决方法**:
- 确保baseURL格式正确，包含完整路径：`https://ark.cn-beijing.volces.com/api/v3`
- 增加超时时间设置：`timeout: 120000`
- 添加重试机制：`maxRetries: 5`

### 2. API密钥认证问题

**问题**: 出现"The OPENAI_API_KEY environment variable is missing"错误。

**解决方法**:
- 直接在代码中指定apiKey而不依赖环境变量
- 添加`dangerouslyAllowBrowser: true`参数
- 或者设置`OPENAI_API_KEY`环境变量

### 3. 404响应错误

**问题**: 服务器返回404错误。

**解决方法**:
- 验证API端点路径是否正确
- 确认模型ID是否正确：`doubao-seedream-3-0-t2i-250415`

## 替代实现：使用原生Fetch API

如果OpenAI SDK出现问题，可以使用原生fetch API直接调用：

```typescript
const response = await fetch(`${baseURL}/images/generations`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  },
  body: JSON.stringify({
    model: modelId,
    prompt,
    size,
    response_format: 'url'
  })
});

if (!response.ok) {
  const errorText = await response.text();
  throw new Error(`API请求失败: ${response.status} ${errorText}`);
}

const data = await response.json();
```

## 优化与扩展

### 可能的优化点

1. **缓存机制**：对于相同提示词的请求进行缓存，减少API调用次数
2. **错误重试策略**：更智能的错误处理和重试机制
3. **图像处理**：添加图像处理功能，如裁剪、滤镜等
4. **并发控制**：限制并发请求数量，避免API限流

### 扩展功能

1. **聊天功能**：集成文本生成API实现聊天功能
2. **图像变体**：基于已有图像生成变体
3. **提示词优化**：提供提示词建议和优化
4. **用户历史记录**：保存用户的生成历史
5. **图像检索**：通过描述搜索已生成的图像

---

## 调用示例

### 后端API调用示例

**请求**:
```http
POST /api/ai/generate-image HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{
  "prompt": "鱼眼镜头，一只猫咪的头部，画面呈现出猫咪的五官因为拍摄方式扭曲的效果。",
  "size": "1024x1024"
}
```

**响应**:
```json
{
  "model": "doubao-seedream-3-0-t2i-250415",
  "created": 1748963513,
  "url": "https://ark-content-generation-v2-cn-beijing.tos-cn-beijing.volces.com/...",
  "usage": {
    "generated_images": 1
  }
}
```

### 前端调用示例

```javascript
async function generateImage(prompt) {
  try {
    const response = await fetch('http://localhost:3000/api/ai/generate-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        size: '1024x1024'
      })
    });
    
    if (!response.ok) {
      throw new Error('图像生成失败');
    }
    
    const data = await response.json();
    return data.url;
  } catch (error) {
    console.error('请求错误:', error);
    throw error;
  }
}
```