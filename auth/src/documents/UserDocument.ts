import mongoose from "mongoose";

export type UserDocument = mongoose.Document & {
    email: string,
    password: string
};