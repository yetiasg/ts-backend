import mongoose, { Schema } from 'mongoose'
import { UserInterface } from '../interfaces/user.interface';

const userSchema = new Schema({
  _id:{
    type: String,
    required: true
  },
  email: String,
  password: String
}, {timestamps: true});

export const UserModel = mongoose.model<UserInterface & mongoose.Document>('User', userSchema);