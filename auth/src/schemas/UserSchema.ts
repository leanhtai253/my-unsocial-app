import mongoose from 'mongoose';
import { UserDocument } from '../documents/UserDocument';
import { User } from '../models';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.pre('save', async function (this: UserDocument, next) {
  const existingUser = await User.findOne({ email: this.email });
  if (existingUser) {
    throw new Error('email already exists');
  }
  next();
});

export { userSchema };
