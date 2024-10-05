'use client'
import { IField } from "@/models/type"
import { getFieldByListId } from "@/services"
import { useFieldState } from "@/state"
import { useEffect } from "react"

export default function FieldFetcher({ listId }: { listId: string }) {
  const [_, setFields] = useFieldState()

  useEffect(() => {
    getFieldByListId(listId)
      .then(res => {
        const { result } = res as { result: IField[] }

        setFields(result)
      })
  }, [listId])

  return <></>
}
