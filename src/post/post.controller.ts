// src/post/post.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Param,
  Patch,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PostService } from './post.service';
import type IQuery from '../interfaces/query.interface';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  // ============ Base CRUD Operations ============

  @Get()
  async getAll(@Query() query: IQuery) {
    return this.postService.getAll(query);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createOne(@Body() createPostDto: CreatePostDto) {
    return this.postService.createOne(createPostDto);
  }

  @Get(':id')
  async getOne(@Param('id') id: string, @Query() query: IQuery) {
    return this.postService.getOne(id, query);
  }

  @Patch(':id')
  async updateOne(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    // Fixed method name from 'upadateOne' to 'updateOne'
    return this.postService.updateOne(id, updatePostDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOne(@Param('id') id: string) {
    await this.postService.deleteOne(id);
  }
}
