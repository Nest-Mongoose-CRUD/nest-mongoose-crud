import { PostStatus, PostVisibility } from '../schemas/post.schema';
export declare class CreatePostDto {
    title: string;
    content: string;
    status?: PostStatus;
    visibility?: PostVisibility;
    author: string;
    keywords?: string[];
    categories?: string[];
    readingTime?: number;
    isFeatured?: boolean;
    isPinned?: boolean;
    allowComments?: boolean;
    allowSharing?: boolean;
    tags?: string[];
    excerpt?: string;
    coverImage?: string;
    slug?: string;
    metaTitle?: string;
    metaDescription?: string;
    metadata?: Record<string, any>;
}
