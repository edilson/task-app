import { IsAlpha, IsBoolean, MinLength } from 'class-validator';

export class UpdateTaskDTO {
  @MinLength(5)
  @IsAlpha()
  title?: string;

  @MinLength(10)
  @IsAlpha()
  description?: string;

  @IsBoolean()
  completed?: boolean;
}
