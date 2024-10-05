
import { CellModel } from "@/models/Cell"
import { connectDB } from "@/models/connect"
import { Types } from "mongoose"

export const revalidate = 60

export async function POST(req: Request) {
  const { value, rowId, fieldId } = await req.json() as {
    rowId: string
    fieldId: string
    value: string
  }

  await connectDB()

  const result = await CellModel.create({
    value,
    rowId,
    fieldId
  })

  return Response.json({ result })
}

export async function PUT(req: Request) {
  const { value, id } = await req.json() as {
    id: string
    value: string
  }

  await connectDB()

  console.log(id, value)

  const result = await CellModel.updateOne({
    _id: new Types.ObjectId(id)
  }, {
    value
  })


  return Response.json({ result })
}
