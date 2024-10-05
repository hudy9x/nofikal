'use client'

import { createRow } from "@/services"
import { useRowUpdateState } from "@/state"

export default function CreateRow({ listId }: { listId: string }) {
  const [_, setUpdate] = useRowUpdateState()

  const onClick = () => {
    createRow(listId).then(res => {
      setUpdate(counter => counter + 1)

    })
  }

  return <div className="mt-2">
    <button onClick={onClick}>+ Add new row</button>
  </div>
}
