import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createUserDto } from 'src/dto/create-user.dto.';
import { User } from 'src/schema/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly User: Model<User>) {}

  async createUser(body: createUserDto): Promise<User> {
    const user = await this.User.create({
      email: body.email,
      password: body.password,
    });
    return user;
  }
}
