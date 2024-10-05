import mongoose, { Schema, Types } from "mongoose";
import { FieldType, IField } from "./type";

const fieldSchema = new Schema<IField>({
  name: { type: String, required: true },
  type: { type: String, enum: FieldType, required: true },
  data: { type: Schema.Types.Mixed },
  order: { type: Number, required: false },
  listId: { type: mongoose.Schema.Types.ObjectId, ref: 'List' }
});


export const FieldModel = mongoose.models.Field || mongoose.model('Field', fieldSchema);


