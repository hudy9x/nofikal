import { connectDB } from "@/models/connect"
import { ListModel } from "@/models/List"

export const revalidate = 60

export async function POST(req: Request) {
  const { name } = await req.json()

  await connectDB()
  const result = await ListModel.create({
    name
  })

  return Response.json({ result })
}

export async function GET() {
  await connectDB()
  const result = await ListModel.find({})

  return Response.json({ result })

}
