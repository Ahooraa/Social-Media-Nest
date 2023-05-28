import {
  IsOptional,
  IsString,
  IsDate,
  IsBoolean,
  IsNotEmpty,
  IsEnum,
  MinLength,
  MaxLength,
  IsEmail,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(11)
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  password: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  profilePic: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  username: string;
  @IsOptional()
  @IsString()
  @MinLength(11)
  phoneNumber: string;
  @IsOptional()
  @IsString()
  @MinLength(5)
  password: string;
  @IsOptional()
  @IsString()
  profilePic: string;
}

export class loginDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  password: string;
}
