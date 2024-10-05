import mongoose, { Schema, Types } from "mongoose";

export interface IList {
  _id: Types.ObjectId,
  name: string
}
const listSchema = new Schema<IList>({
  name: { type: String, required: true },
});

export const ListModel = mongoose.models.List || mongoose.model('List', listSchema)

