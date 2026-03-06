import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

// Define enums for specific filterable values
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest',
}

export enum UserStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
}

@Schema({ timestamps: true }) // 'timestamps: true' automatically adds createdAt/updatedAt
export class User {
  @Prop({ required: true, unique: true, index: true })
  email: string;

  @Prop({ index: true })
  username: string;

  // --- Fields for Searching ---
  @Prop({ required: true, index: true })
  firstName: string;

  @Prop({ required: true, index: true })
  lastName: string;

  // --- Fields for Range Queries ---
  @Prop()
  age: number;

  @Prop({ type: Date })
  lastLogin: Date;

  // --- Fields for Filtering ---
  @Prop({ type: String, enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Prop({ type: String, enum: UserStatus, default: UserStatus.PENDING })
  status: UserStatus;

  @Prop({ default: false })
  isActive: boolean;

  // --- Field for Array Filtering ---
  @Prop([String])
  tags: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);

// --- Optional: Create a compound index for text search ---
UserSchema.index({ email: 'text' });
