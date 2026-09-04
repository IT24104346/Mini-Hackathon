import mongoose, { Document, Schema } from 'mongoose';
import { SRI_LANKA_DISTRICTS, DistrictType } from './FloodReport';

export type UserRole = 'user' | 'admin';

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  passwordSalt: string;
  role: UserRole;
  district?: DistrictType;
  phone?: string;
  organization?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters long'],
      maxlength: [80, 'Name cannot exceed 80 characters']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    passwordHash: {
      type: String,
      required: [true, 'Password hash is required']
    },
    passwordSalt: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
    district: {
      type: String,
      enum: SRI_LANKA_DISTRICTS,
      default: 'Colombo'
    },
    phone: {
      type: String,
      trim: true
    },
    organization: {
      type: String,
      trim: true,
      default: 'Community Citizen'
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IUser>('User', UserSchema);
