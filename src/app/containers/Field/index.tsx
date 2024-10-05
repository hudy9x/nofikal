'use client'
import { useFieldState } from "@/state";
import CreateField from "./Create";
import { updateFieldOrder } from "@/services";

export default function FieldContainer({ listId }: { listId: string }) {
  const [fields] = useFieldState()
  const updateOrder = (id: string, order: string) => {
    updateFieldOrder({ id, order }).then(res => {
      console.log(res)
    })
  }

  return <div className="fixed right-0 top-0 h-screen bg-white w-[350px] card flex-shrink-0">
    <h2>Fields</h2>
    <div className="space-y-2">
      {fields.map(field => {
        const id = field._id.toString()
        return <div key={id} className="flex items-center gap-2">
          <input readOnly className="flex-shrink w-[100px]" value={field.name} />
          <input onKeyUp={ev => {
            const key = ev.key
            const target = ev.target as HTMLInputElement
            if (key === 'Enter') {
              updateOrder(id, target.value)
            }
          }} className="w-[50px]" defaultValue={field.order} />
          <span className="text-sm rounded-md bg-gray-50 border px-2 py-1">{field.type}</span>
          <button>X</button>
        </div>
      })}
    </div>
    <CreateField listId={listId} />
  </div>
}
