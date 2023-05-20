import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Patch,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto, UpdatePostDto } from './post.dto';
import { Comment } from './post.schema';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}
  @Post('newpost')
  async newPost(@Body() Body: CreatePostDto): Promise<any> {
    return await this.postService.createPost(Body);
  }

  @Delete(':id/delete')
  async deletePost(@Param('id') id: string) {
    return await this.postService.deletePost(id);
  }

  @Patch(':id/update')
  async updatePost(@Param('id') id: string, @Body() data: UpdatePostDto) {
    return await this.postService.updatePost(id, data);
  }

  @Get(':id/one')
  async getOnePost(@Param('id') id: string) {
    console.log(id);
    return await this.postService.getOnePost(id);
  }

  @Get('All')
  async getAllPost() {
    return await this.postService.getAllPost();
  }

  @Post('addLike/:id')
  async addLike(@Body() { userId }, @Param('id') id: string): Promise<any> {
    console.log('+++++++++++++', id, userId);

    return await this.postService.addLike(id, userId);
  }

  @Get('getLike/:id')
  async getLike(@Param('id') id: string): Promise<any> {
    return await this.postService.getLike(id);
  }

  @Post('addComment/:id')
  async addComment(
    @Param('id') id: string,
    @Body() comment: Comment,
  ): Promise<any> {
    return await this.postService.addComment(id, comment);
  }

  @Get('getComment/:id')
  async getComment(@Param('id') id: string) {
    return await this.postService.getComment(id);
  }

  @Delete('deleteComment/:id')
  async deleteComment(@Param('id') commentId: Comment, @Body() Body: any) {
    return await this.postService.deleteComment(commentId, Body.postId);
  }
}
