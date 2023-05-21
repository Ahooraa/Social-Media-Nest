import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Delete,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto, loginDto } from './user.dto';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.schema';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService, ) {}

  

  @Get('username/:username')
  async getUserWithUsername(@Param('username') username: string): Promise<User> {
    
    return await this.userService.findUserByUsername(username);
  }

  @Get(':userId')
  async getUser(@Param('userId') userId: string) {
    return await this.userService.getSingleUser(userId);
  }
  @Get()
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Patch(':userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() userData: CreateUserDto,
  ) {
    return await this.userService.updateUser(userId, userData);
  }

  @Delete(':userId')
  async deleteUser(@Param('userId') userId: string) {
    await this.userService.deleteUser(userId);
  }
}
