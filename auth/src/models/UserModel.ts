import mongoose from "mongoose";
import { UserDocument } from "../documents/UserDocument";
import { userSchema } from "../schemas/UserSchema";

export interface UserModel extends mongoose.Model<UserDocument> {};

const User = mongoose.model<UserDocument, UserModel>('User', userSchema);

export default User;