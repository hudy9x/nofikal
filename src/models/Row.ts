import mongoose, { Schema } from "mongoose";
import { IRow } from "./type";

const rowSchema = new Schema<IRow>({
  listId: { type: mongoose.Schema.Types.ObjectId, ref: 'List' },
  createdAt: { type: Date, default: Date.now, require: true }
});

export const RowModel = mongoose.models.Row || mongoose.model('Row', rowSchema)
