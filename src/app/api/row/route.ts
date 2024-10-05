import { CellModel, ICellWithoutId } from "@/models/Cell"
import { connectDB } from "@/models/connect"
import { FieldModel } from "@/models/Field"
import { RowModel } from "@/models/Row"
import { IField, IRow, IRowDetail } from "@/models/type"
import { Types } from "mongoose"
import { NextRequest } from "next/server"

export const revalidate = 0

const fieldMap = new Map<string, IField[]>()
const getFields = async (listId: string) => {
  if (fieldMap.has(listId)) {
    return fieldMap.get(listId) || []
  }

  const fields = await FieldModel.find({
    listId
  }) as IField[]

  fieldMap.set(listId, fields || [])

  return fields
}

export async function POST(req: Request) {
  const { listId } = await req.json() as {
    listId: string
  }

  await connectDB()
  const fields = await getFields(listId)
  if (!fields.length) {
    return Response.error()
  }
  const row = await RowModel.create({
    listId,
    createdAt: new Date()
  }) as IRow

  const cellDatas: ICellWithoutId[] = []

  fields.map(field => {
    cellDatas.push({
      value: null,
      rowId: row._id,
      fieldId: field._id
    })
  })

  const cells = await CellModel.insertMany(cellDatas)

  return Response.json({
    row,
    cells
  })
}

export async function GET(req: NextRequest) {
  const listId = req.nextUrl.searchParams.get('listId')

  await connectDB()
  // const result = await RowModel.find({ listId })

  const pageSize = 20

  console.log('listid', listId)

  const rows = await RowModel.aggregate([
    { $match: { listId: new Types.ObjectId(listId || '') } },
    {
      $lookup: {
        from: 'cells',
        localField: '_id',
        foreignField: 'rowId',
        as: 'cells',
        pipeline: [
          {
            $lookup: {
              from: 'fields',
              localField: 'fieldId',
              foreignField: '_id',
              as: 'fieldMetadata',
            }
          },
          {
            $unwind: {
              path: '$fieldMetadata'
            }
          },
        ]
      }
    },

    // SEARCH BY CONDITION
    // {
    //   $match: {
    //     $and: [
    //       // { 'cells.fieldMetadata.name': 'Age' },
    //       // { 'cells.fieldMetadata.name': 'Created' },
    //       // { 'cells.value': { $gt: new Date(2024, 9, 12) } },
    //
    //       // Cursor-base pagination
    //       // This condition used for pagination
    //       // { _id: { $gt: new Types.ObjectId('66ced3237fcd4426947a76d9') } }
    //
    //     ]
    //   }
    // },

    // PAGINATION BY CURSOR-BASE
    // {
    //   $match: {
    //     $and: [
    //       // Cursor-base pagination
    //       // This condition used for pagination
    //       // { _id: { $gt: new Types.ObjectId('66ced3237fcd4426947a76d9') } }
    //
    //     ]
    //   }
    // },


    // SORT start  ==========================================================================
    // Add a field for the Created value
    {
      $addFields: {
        ageCell: {
          $arrayElemAt: [
            {
              $filter: {
                input: '$cells',
                cond: { $eq: ['$$this.fieldMetadata.name', 'age'] }
              }
            },
            0
          ]
        },

        createdCell: {
          $arrayElemAt: [
            {
              $filter: {
                input: '$cells',
                cond: { $eq: ['$$this.fieldMetadata.name', 'created'] }
              }
            },
            0
          ]
        }
      }
    },

    // Convert Age to a number for proper sorting

    {
      $addFields: {
        ageValue: { $toInt: '$ageCell.value' }
      }
    },

    // Sort rows by the Created field in descending order
    {
      $sort: {
        ageValue: -1,
        // 'createdCell.value': -1
      }
    },
    // SORT end ==========================================================================



    // IGNORE SOME FIELDS
    {
      $project: {
        '__v': 0,
        'cells.__v': 0,
        // 'cells.fieldMetadata._id': 0,
        'cells.fieldMetadata.__v': 0,
        'cells.fieldMetadata.listId': 0,
        // createdValue: '$createdCell.value'
        // 'cells.fieldMetadata.order': 0
      }
    },

    // PAGINATION
    // There an issue with $skip as follows
    // If you get 10 records at page 1 => everything ok
    // But with 10 records at page 50 => it will take a lot of time
    // To resolve this issue, use cursor-base pagination
    // That means you have to find records with $match. Ex:
    // $match: { $and: [ { '_id': { $gt: new Types.ObjectId('66ced3237fcd4426947a76d9') } } ] }
    // This will find records that has id greater than last Id
    // So you have to get the lastId and use it for pagination
    //
    // { $skip: (page - 1) * pageSize },
    { $limit: pageSize },
  ])

  return Response.json({ rows })

}
