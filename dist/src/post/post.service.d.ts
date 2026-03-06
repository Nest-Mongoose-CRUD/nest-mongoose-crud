import { Model } from 'mongoose';
import { BaseCrudService } from 'utils/base-crud.service';
import { PostDocument } from './schemas/post.schema';
import { CreatePostUpdated } from './dto/create-post-update.dto';
export declare class PostService extends BaseCrudService<PostDocument> {
    constructor(postModel: Model<PostDocument>);
    findAllUpdate(): string;
    createOneUpdate(updatePostDto: CreatePostUpdated): CreatePostUpdated;
}
