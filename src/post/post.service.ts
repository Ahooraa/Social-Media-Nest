import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePostDto } from '../dto/post.dto';
import { Post } from '../schema/post.schema';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private readonly Post: Model<Post>) {}
  async createPost(body: CreatePostDto): Promise<Post> {
    const post = await this.Post.create({
      userId: body.userId,
      text: body.text,
    });
    return post;
  }
}
