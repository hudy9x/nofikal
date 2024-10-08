'use client'

import { createRow } from "@/services"
import { useFieldState, useRowUpdateState } from "@/state"

export default function CreateRow({ listId }: { listId: string }) {
  const [_, setUpdate] = useRowUpdateState()
  const [fields] = useFieldState()

  const onClick = () => {

    const rows = fields.map(field => {
      return {
        fieldId: field._id.toString(),
        value: null
      }
    })

    console.log('rows', rows)

    createRow(listId, rows).then(res => {
      setUpdate(counter => counter + 1)

    })
  }

  return <div className="mt-2">
    <button onClick={onClick}>+ Add new row</button>
  </div>
}
