import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto, UpdatePostDto } from './post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}
  @Post('newpost')
  async newPost(@Body() Body: CreatePostDto): Promise<any> {
    return await this.postService.createPost(Body);
  }

  @Delete(':id/delete')
  deletePost(@Param('id') id: string) {
    return this.postService.deletePost(id);
  }

  @Patch(':id/update')
  updatePost(@Param('id') id: string, @Body() data: UpdatePostDto) {
    return this.postService.updatePost(id, data);
  }

  @Get(':id/one')
  getOnePost(@Param('id') id: string) {
    console.log(id);
    return this.postService.getOnePost(id);
  }

  @Get('All')
  getAllPost() {
    return this.postService.getAllPost();
  }
}
