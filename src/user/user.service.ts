import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly User: Model<User>) {}

  async createUser(userData: CreateUserDto): Promise<string> {
    try {
      const newUser = new this.User(userData);
      const result = await newUser.save();
      console.log(result);
      return result.id as string;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async updateUser(userId, userData: UpdateUserDto): Promise<User> {
    try {
      return await this.User.findByIdAndUpdate(userId, userData);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getSingleUser(userId: string): Promise<User> {
    try {
      const user = await this.findUser(userId);
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getAllUsers(): Promise<User[]> {
    try {
      const allUsers = await this.User.find();
      return allUsers;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteUser(userId): Promise<void> {
    try {
      await this.User.deleteOne({ _id: userId }).exec();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  private async findUser(userId): Promise<User> {
    let user;
    try {
      user = await this.User.findById(userId).exec();
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
