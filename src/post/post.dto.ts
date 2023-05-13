import { IsOptional, IsString, IsNotEmpty, IsArray } from 'class-validator';
import { User } from '../user/user.schema';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  userId!: string;

  @IsString()
  @IsNotEmpty()
  image!: string;

  @IsString()
  @IsOptional()
  text: string;

  @IsArray()
  @IsOptional()
  liked: User[];

  @IsArray()
  @IsOptional()
  comment: User[];
}

export class UpdatePostDto {
  @IsString()
  @IsOptional()
  userId: string;

  @IsOptional()
  @IsString()
  image: string;

  @IsOptional()
  @IsString()
  text: string;

  @IsOptional()
  @IsArray()
  liked: User[];

  @IsOptional()
  @IsArray()
  comment: User[];
}
