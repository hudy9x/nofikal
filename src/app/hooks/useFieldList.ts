import { IField } from "@/models/type"
import { getFieldByListId } from "@/services"
import { useFieldState } from "@/state"
import { useEffect, useState } from "react"

const fieldMap = new Map<string, IField[]>()

export const useFieldList = (listId: string) => {

  // const [fieldList, setFieldList] = useState<IField[]>([])
  const [fieldList, setFieldList] = useFieldState()

  useEffect(() => {

    getFieldByListId(listId)
      .then(res => {
        const { result } = res as { result: IField[] }

        fieldMap.set(listId, result)

        setFieldList(result)
      })
  }, [listId])

  return {
    fieldList
  }
}
