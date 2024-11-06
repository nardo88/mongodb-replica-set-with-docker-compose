import mongoose, { Schema } from "mongoose";

export interface IThings {
  _id: string;
  name: string;
  cost: number;
  total: number;
  createdAt: number;
  updatedAt: number;
}

const ThingsSchema = new Schema(
  {
    _id: Schema.Types.String,
    name: {
      type: Schema.Types.String,
      require: true,
    },
    cost: Schema.Types.Number,
    total: Schema.Types.Number,
    createdAt: { type: Schema.Types.Number },
    updatedAt: { type: Schema.Types.Number },
  },
  { timestamps: true, collection: "things", autoCreate: true }
);

export default mongoose.model<IThings & mongoose.Document>(
  "Things",
  ThingsSchema
);
