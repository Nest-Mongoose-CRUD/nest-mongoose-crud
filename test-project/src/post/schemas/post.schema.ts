import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

export type PostDocument = Post & Document;

export enum PostStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
  DELETED = 'deleted',
}

export enum PostVisibility {
  PUBLIC = 'public',
  PRIVATE = 'private',
  UNLISTED = 'unlisted',
}

@Schema({ timestamps: true })
export class Post {
  @Prop({ required: true, index: true, text: true })
  title: string;

  @Prop({ required: true, index: true, text: true })
  content: string;

  @Prop({
    type: String,
    enum: PostStatus,
    default: PostStatus.DRAFT,
    index: true,
  })
  status: PostStatus;

  @Prop({
    type: String,
    enum: PostVisibility,
    default: PostVisibility.PUBLIC,
    index: true,
  })
  visibility: PostVisibility;

  // --- MANY-TO-ONE RELATIONSHIP WITH USER ---
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  })
  author: User;

  // --- FIELDS FOR SEARCHING ---
  @Prop([String])
  keywords: string[];

  @Prop([String])
  categories: string[];

  // --- FIELDS FOR RANGE QUERIES ---
  @Prop({ default: 0 })
  viewCount: number;

  @Prop({ default: 0 })
  likeCount: number;

  @Prop({ default: 0 })
  commentCount: number;

  @Prop({ type: Date })
  publishedAt: Date;

  @Prop()
  readingTime: number; // in minutes

  // --- FIELDS FOR FILTERING ---
  @Prop({ default: false, index: true })
  isFeatured: boolean;

  @Prop({ default: false, index: true })
  isPinned: boolean;

  @Prop({ default: false, index: true })
  allowComments: boolean;

  @Prop({ default: true })
  allowSharing: boolean;

  @Prop([String])
  tags: string[];

  // --- METADATA & SEO ---
  @Prop()
  excerpt: string;

  @Prop()
  coverImage: string;

  @Prop()
  slug: string;

  @Prop()
  metaTitle: string;

  @Prop()
  metaDescription: string;

  @Prop({ type: MongooseSchema.Types.Mixed })
  metadata: Record<string, any>;
}

export const PostSchema = SchemaFactory.createForClass(Post);

// --- COMPOUND INDEXES FOR OPTIMIZED QUERIES ---

// Text search index on title and content
PostSchema.index({ title: 'text', content: 'text' });

// For user's post feed
PostSchema.index({
  status: 1,
  visibility: 1,
  publishedAt: -1,
  isFeatured: 1,
});
