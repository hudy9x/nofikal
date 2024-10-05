'use client'

import { IList } from "@/models/List"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function List() {
  const [val, setVal] = useState('')
  const [list, setList] = useState<IList[]>([])
  const onClick = async () => {

    if (!val) return

    const result = await fetch('/api/list', {
      method: 'POST',
      body: JSON.stringify({
        name: val
      })
    })

    const { result: list } = await result.json() as { result: IList }
    setList(prev => [...[list], ...prev])
  }

  useEffect(() => {
    fetch('/api/list').then(res => res.json()).then(res => {
      const { result } = res as { result: IList[] }
      setList(result)
    })
  }, [])

  return <div>
    <div className="space-x-2">
      <input value={val} onChange={ev => setVal(ev.target.value)} />
      <button onClick={onClick}>Create list</button>
    </div>

    <div className="mt-2 space-y-2">
      {list.map(item => {
        const id = item._id.toString()
        return <Link href={`/list/${id}`} className="px-3 py-1 text-sm border rounded-md block bg-gray-100 hover:bg-gray-50 cursor-pointer" key={id}>{item.name}</Link>
      })}
    </div>

  </div>
}
