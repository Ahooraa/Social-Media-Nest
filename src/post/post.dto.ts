import {
  IsOptional,
  IsString,
  IsNotEmpty,
  IsArray,
  isString,
  isNotEmpty,
} from 'class-validator';
import mongoose, { ObjectId } from 'mongoose';
import { User } from '../user/user.schema';
import { Comment } from './post.schema';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  // @IsString()
  @IsNotEmpty()
  userId!: ObjectId;

  // @isBuffer()
  @IsNotEmpty()
  image!: Buffer;

  @IsString()
  @IsOptional()
  text: string;

  @IsArray()
  @IsOptional()
  liked: string[];

  @IsArray()
  @IsOptional()
  comment: Comment[];
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
  liked: string[];

  @IsOptional()
  @IsArray()
  comment: Comment[];
}
