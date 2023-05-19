import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreatePostDto, UpdatePostDto } from './post.dto';
import { Comment, Post } from './post.schema';

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

  async addComment(id: string, comment: Comment) {
    const post = await this.Post.findById(id);
    if (!post) console.log("Post doesn't exist");
    else {
      await this.Post.findByIdAndUpdate(id, { $push: { comment: comment } });
      return 'Comment submitted';
    }
  }
  async getComment(id: string) {
    const post = await this.Post.findById(id);
    if (!post) console.log("Post doesn't exist");
    else {
      return post.comment;
    }
  }

  async addLike(id: string, userId: string) {
    console.log('-----------', id, userId);
    const post = await this.Post.findById(id);

    if (!post) console.log("post doesn't exist");
    else {
      if (!post.liked.includes(userId)) {
        await this.Post.findByIdAndUpdate(id, { $push: { liked: userId } });
        return 'Liked';
      } else {
        while (post.liked.includes(userId)) {
          let index = post.liked.indexOf(userId);
          post.liked.splice(index, 1);
        }

        await this.Post.findByIdAndUpdate(id, post);
        return 'Unliked';
      }
    }
  }

  async getLike(id: string) {
    const post = await this.Post.findById(id);
    if (!post) console.log("Post doesn't exist");
    else {
      return post.liked;
    }
    return;
  }

  async deleteComment(commentId: Comment, postId: string): Promise<any> {
    const post = await this.Post.findById(postId);
    // console.log(post.comment.includes(commentId));

    if (!post) return "Post doesn't exist";
    if (!post.comment.includes(commentId)) return "comment doesn't exist";
    const resualt = await this.Post.findByIdAndUpdate(
      postId,
      {
        $pull: { comment: { _id: commentId } },
      },
      { new: true },
    );
    return resualt;
  }
}
