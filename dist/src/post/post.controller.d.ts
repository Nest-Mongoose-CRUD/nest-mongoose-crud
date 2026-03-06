import { PostService } from './post.service';
import { CreatePostUpdated } from './dto/create-post-update.dto';
declare const PostControllerBase: any;
export declare class PostController extends PostControllerBase {
    private service;
    constructor(service: PostService);
    findAll(): string;
    create(dto: CreatePostUpdated): CreatePostUpdated;
}
export {};
