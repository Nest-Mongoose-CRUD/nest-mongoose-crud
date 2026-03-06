// src/post/post.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseCrudService } from 'utils/base-crud.service'; // Adjust path as needed
import { Post, PostDocument } from './schemas/post.schema';
import { CreatePostUpdated } from './dto/create-post-update.dto';

@Injectable()
export class PostService extends BaseCrudService<PostDocument> {
  constructor(@InjectModel(Post.name) postModel: Model<PostDocument>) {
    super(postModel);
  }

  findAllUpdate() {
    return 'Fimd all updated!';
  }

  createOneUpdate(updatePostDto: CreatePostUpdated) {
    return updatePostDto;
  }
}
