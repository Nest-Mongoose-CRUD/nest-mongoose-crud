import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostUpdated {
  @IsNotEmpty()
  @IsString()
  foo: string;
}
