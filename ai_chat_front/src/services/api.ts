import type { ImageGenerationRequest, ImageGenerationResponse } from '../types';

const API_BASE_URL = 'http://localhost:3000/api';

// 使用fetch API代替axios，因为我们可能没有成功安装axios
export const api = {
  // 生成图像
  async generateImage(request: ImageGenerationRequest): Promise<ImageGenerationResponse> {
    const response = await fetch(`${API_BASE_URL}/ai/generate-image`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error('图像生成失败');
    }

    return response.json();
  }
}; 