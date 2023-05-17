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
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  @Post()
  async createUser(@Body() userData: CreateUserDto) {
    console.log(userData);
    return await this.userService.createUser(userData);
  }

  @Post('login')
  async login(@Body() body: loginDto): Promise<{ access_token: string }> {
    const user = await this.userService.findUserByUsername(body.username);
    console.log(user);

    if (!user) {
      throw new UnauthorizedException('username or password is incorrect!');
    }
    
    const comparePass = await bcrypt.compare(body.password, user.password);
    if (!comparePass) {
      throw new UnauthorizedException('username or password is incorrect!');
    }
    return { access_token: this.jwtService.sign({ id: user.id }) };
  }

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
