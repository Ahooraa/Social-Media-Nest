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
      const user = await this.findUserById(userId);
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

  // async followUser(userId: string) Promise<User>{
  //   try {

  //   } catch (error) {
  //     throw new Error(error.message);
  //   }
  // }

  async findUserByUsername(username: string): Promise<any> {
    let user;

    try {
      user = await this.User.findOne({ username: username }).exec();
    } catch (error) {
      throw new NotFoundException('user not found');
    }
    if (!user) {
      throw new NotFoundException('user not found');
    }
    console.log(user.id);
    console.log(typeof user.id);
    

    return user;
  }

  async findUserById(userId): Promise<User> {
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
