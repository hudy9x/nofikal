import { Document, Types } from "mongoose"

export interface IField extends Document {
  _id: Types.ObjectId
  name: string
  type: FieldType
  data?: any,
  order: number
  listId: Types.ObjectId
}

export enum FieldType {
  Date = 'Date',
  Select = 'Select',
  Checkbox = 'Checkbox',
  Formula = 'Formula',
  Text = 'Text',
  LongText = 'LongText',
  Number = 'Number',
  Email = 'Email',
  Link = 'Link'
}

export interface IFieldSelectItem {
  name: string
  color: string
}

export interface ICell extends Document {
  _id: Types.ObjectId
  value: any
  rowId: Types.ObjectId
  fieldId: Types.ObjectId
}

export interface IRow extends Document {
  _id: Types.ObjectId
  listId: Types.ObjectId
  createdAt: Date
}

export type IRowDetail = IRow & {
  cells: (ICell & {
    fieldMetadata: IField
  })[]
}
