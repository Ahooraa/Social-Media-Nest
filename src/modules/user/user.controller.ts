import {
    Body,
    Controller,
    Get,
    HttpCode,
    Param,
    ParseEnumPipe,
    Post,
  } from '@nestjs/common';

  import { UserService } from './user.service';
import { User } from './user.schema';

  @Controller('users')
  export class userController {
    constructor(private readonly userService: UserService){}

    @Get(':id')
    async getProduct(@Param('id') productId: string):Promise<User>{
        return await this.userService.getUser(productId)
    }
  }
