export class GenerateImageDto {
  prompt: string;
  size?: '1024x1024' | '1536x1024' | '1024x1536' | '256x256' | '512x512' | '1792x1024' | '1024x1792' | 'auto' = '1024x1024';
} 