import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { GenerateImageDto } from '../dto/generate-image.dto';

@Injectable()
export class ImageGenerationService {
  private readonly logger = new Logger(ImageGenerationService.name);
  private readonly apiKey = '替换为你自己的API_KEY';
  private readonly modelId = 'doubao-seedream-3-0-t2i-250415';
  private readonly baseURL = 'https://ark.cn-beijing.volces.com/api/v3';
  private openai: OpenAI;

  constructor(private configService: ConfigService) {
    this.logger.log(`初始化图像生成服务，API URL: ${this.baseURL}`);
    this.logger.log(`使用模型ID: ${this.modelId}`);
    
    // 初始化OpenAI客户端
    this.openai = new OpenAI({
      apiKey: this.apiKey,
      baseURL: this.baseURL,
      dangerouslyAllowBrowser: true,
      timeout: 120000, // 120秒超时
      maxRetries: 5    // 最多重试5次
    });
  }

  async generateImage(generateImageDto: GenerateImageDto) {
    try {
      const { prompt, size } = generateImageDto;
      
      this.logger.log(`准备生成图像，模型ID: ${this.modelId}, 大小: ${size}`);
      this.logger.log(`提示词: ${prompt}`);
      
      try {
        // 使用OpenAI客户端
        const response = await this.openai.images.generate({
          model: this.modelId,
          prompt,
          size,
          response_format: 'url'
        });
        
        this.logger.log('图像生成成功');
        this.logger.log(`响应数据: ${JSON.stringify(response)}`);
        
        return {
          model: this.modelId,
          created: response.created,
          url: response.data?.[0]?.url,
          usage: response.usage
        };
      } catch (requestError: any) {
        this.logger.error(`API请求错误详情: ${JSON.stringify({
          message: requestError.message,
          name: requestError.name,
          status: requestError.status
        })}`);
        
        if (requestError.response) {
          this.logger.error(`响应状态: ${requestError.response.status}`);
          this.logger.error(`响应数据: ${JSON.stringify(requestError.response.data)}`);
        }
        
        throw requestError;
      }
    } catch (error: any) {
      this.logger.error(
        `图像生成错误: ${error.message || '未知错误'}`,
        error.stack || '无堆栈跟踪'
      );
      throw new InternalServerErrorException(`生成图像失败: ${error.message}`);
    }
  }
}
