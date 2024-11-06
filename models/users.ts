import mongoose, { Schema, model } from "mongoose";

export interface IUser {
  _id: string;
  email: string;
  name: string;
  createdAt: number;
  updatedAt: number;
}
const UserSchema = new Schema(
  {
    _id: Schema.Types.String,
    email: {
      type: Schema.Types.String,
      unique: true,
      require: true,
    },
    name: {
      type: Schema.Types.String,
      require: true,
    },
    createdAt: { type: Schema.Types.Number },
    updatedAt: { type: Schema.Types.Number },
  },
  { timestamps: true, collection: "users", autoCreate: true }
);

export default model<IUser & mongoose.Document>("Users", UserSchema);
