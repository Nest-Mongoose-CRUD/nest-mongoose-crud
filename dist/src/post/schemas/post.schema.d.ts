import mongoose, { Document } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
export type PostDocument = Post & Document;
export declare enum PostStatus {
    DRAFT = "draft",
    PUBLISHED = "published",
    ARCHIVED = "archived",
    DELETED = "deleted"
}
export declare enum PostVisibility {
    PUBLIC = "public",
    PRIVATE = "private",
    UNLISTED = "unlisted"
}
export declare class Post {
    title: string;
    content: string;
    status: PostStatus;
    visibility: PostVisibility;
    author: User;
    keywords: string[];
    categories: string[];
    viewCount: number;
    likeCount: number;
    commentCount: number;
    publishedAt: Date;
    readingTime: number;
    isFeatured: boolean;
    isPinned: boolean;
    allowComments: boolean;
    allowSharing: boolean;
    tags: string[];
    excerpt: string;
    coverImage: string;
    slug: string;
    metaTitle: string;
    metaDescription: string;
    metadata: Record<string, any>;
}
export declare const PostSchema: mongoose.Schema<Post, mongoose.Model<Post, any, any, any, mongoose.Document<unknown, any, Post, any, {}> & Post & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Post, mongoose.Document<unknown, {}, mongoose.FlatRecord<Post>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<Post> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
