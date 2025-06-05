import { Body, Controller, Post } from '@nestjs/common';
import { ImageGenerationService } from './image-generation/image-generation.service';
import { GenerateImageDto } from './dto/generate-image.dto';

@Controller('ai')
export class AiController {
  constructor(private readonly imageGenerationService: ImageGenerationService) {}

  @Post('generate-image')
  async generateImage(@Body() generateImageDto: GenerateImageDto) {
    // 简单验证
    if (!generateImageDto.prompt) {
      throw new Error('Prompt is required');
    }
    
    // 设置默认值
    if (!generateImageDto.size) {
      generateImageDto.size = '1024x1024';
    }
    
    return this.imageGenerationService.generateImage(generateImageDto);
  }
}
