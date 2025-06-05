import { Module } from '@nestjs/common';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { ImageGenerationService } from './image-generation/image-generation.service';

@Module({
  controllers: [AiController],
  providers: [AiService, ImageGenerationService]
})
export class AiModule {}
