
import { CellModel } from "@/models/Cell"
import { connectDB } from "@/models/connect"
import { FieldModel } from "@/models/Field"
import { ListModel } from "@/models/List"
import { RowModel } from "@/models/Row"

export const revalidate = 60

export async function GET() {
  await connectDB()
  const truncatePromise = []
  truncatePromise.push(ListModel.deleteMany({}))
  truncatePromise.push(RowModel.deleteMany({}))
  truncatePromise.push(CellModel.deleteMany({}))
  truncatePromise.push(FieldModel.deleteMany({}))

  console.log('start truncating tables')
  await Promise.all(truncatePromise)
  console.log('stop truncating tables')

  return Response.json({ done: true })

}
