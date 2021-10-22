import mongoose, { Schema } from 'mongoose'
import { UserInterface } from '../interfaces-types-abstracts/user.interface';

const userSchema = new Schema({
  _id:{
    type: String,
    required: true
  },
  email: String,
  password: String
}, {timestamps: true});

export const User = mongoose.model<UserInterface & mongoose.Document>('User', userSchema);