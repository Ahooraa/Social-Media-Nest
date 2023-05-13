import {
  IsOptional,
  IsString,
  IsDate,
  IsBoolean,
  IsNotEmpty,
  IsEnum,
  MinLength,
  MaxLength,
} from 'class-validator';
import { User } from '../user/user.schema';

export class CreatePostDto {
  userId: string;
  image: string;
  text: string;
  liked: User[];
  comment: User[];
}

export class UpdatePostDto {
  userId: string;
  image: string;
  text: string;
  liked: User[];
  comment: User[];
}
