import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreatePostDto, UpdatePostDto } from './post.dto';
import { Post } from './post.schema';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private readonly Post: Model<Post>) {}

  async createPost(body: CreatePostDto): Promise<Post> {
    const post = await this.Post.create(body);
    return post;
  }

  async deletePost(id: string) {
    return await this.Post.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
  }

  async updatePost(postId: string, data: UpdatePostDto): Promise<Post> {
    return await this.Post.findByIdAndUpdate(postId, data);
  }

  async getOnePost(id: string): Promise<Post> {
    return await this.Post.findById({ _id: id });
  }

  async getAllPost(): Promise<Post[]> {
    return await this.Post.find();
  }
}
