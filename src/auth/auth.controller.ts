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
import { CreateUserDto, loginDto } from '../user/user.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('signup')
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
}
