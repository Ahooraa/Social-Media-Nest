import { Body, Controller, Post, Get, Param, Patch, Delete } from '@nestjs/common';
import { CreateUserDto } from '../dto/user.dto';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() userData: CreateUserDto) {
    console.log(userData);
    return await this.userService.createUser(userData);
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
  async deleteUser(@Param('userId') userId: string){
    await this.userService.deleteUser(userId)
  }
}
