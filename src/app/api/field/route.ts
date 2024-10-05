import { connectDB } from "@/models/connect"
import { FieldModel } from "@/models/Field"
import { ListModel } from "@/models/List"
import { FieldType, IFieldSelectItem } from "@/models/type"
import { NextRequest } from "next/server"

export const revalidate = 60

export async function POST(req: Request) {
  const { name, order, type, listId, selectItems } = await req.json() as {
    name: string
    type: FieldType
    listId: string
    order: number
    selectItems: IFieldSelectItem[]
  }


  await connectDB()
  console.log(selectItems)
  // return Response.json({ result: 1 })
  const result = await FieldModel.create({
    order,
    name,
    type,
    data: selectItems,
    listId
  })

  return Response.json({ result })
}

export async function PUT(req: Request) {
  const { order, id } = await req.json() as {
    id: string
    order: string
  }

  const orderNumber = parseInt(order, 10)

  await connectDB()

  const result = await FieldModel.updateOne({
    _id: id
  }, {
    order: orderNumber
  })

  return Response.json({ result })
}
export async function GET(req: NextRequest) {
  const listId = req.nextUrl.searchParams.get('listId')

  await connectDB()
  const result = await FieldModel.find({ listId }, null, { sort: { "order": 1 } })

  return Response.json({ result })

}
