import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel('user') private readonly userModel: Model<User>) {}

  async createUser(user: User) {
    return await this.userModel.create(user);
  }
  async getUser(userId) {
    return await this.findUser(userId);
  }

  private async findUser(userId): Promise<User> {
    let user;
    try {
      user = await this.userModel.findById(userId).exec();
    } catch (error) {
      throw new NotFoundException('user not found');
    }
    if (!user) {
      throw new NotFoundException('user not found');
    }
    console.log(user.id);

    return user;
  }
}
