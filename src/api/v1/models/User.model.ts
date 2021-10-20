import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
  _id:{
    type: String,
    required: true
  },
  email: String,
  password: String
}, {timestamps: true});

export const User = mongoose.model('User', userSchema);