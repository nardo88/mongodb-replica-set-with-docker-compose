import mongoose, { Schema } from "mongoose";

export interface IOrder {
  _id: string;
  userId: string;
  thingId: string;
  status: string;
  createdAt: number;
  updatedAt: number;
}

const OrderSchema = new Schema(
  {
    _id: Schema.Types.String,
    userId: {
      type: Schema.Types.String,
      require: true,
      ref: "Users",
    },
    thingId: {
      type: Schema.Types.String,
      require: true,
      ref: "Things",
    },
    status: {
      type: Schema.Types.String,
      enum: ["draft", "sended"],
    },
    createdAt: { type: Schema.Types.Number },
    updatedAt: { type: Schema.Types.Number },
  },
  { timestamps: true, collection: "orders", autoCreate: true }
);

export default mongoose.model<IOrder & mongoose.Document>("Order", OrderSchema);
