import { Body, Controller, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}
  @Post('newpost')
  async newPost(@Body() Body: CreatePostDto): Promise<any> {
    return await this.postService.createPost(Body);
  }
}
