import { Body, Controller, Post } from '@nestjs/common';
import { createUserDto } from 'src/dto/create-user.dto.';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Post('signup')
  async createUser(@Body() body: createUserDto) {
    console.log(body);
    await this.UserService.createUser(body);
  }
}
