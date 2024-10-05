'use client'

import { IRowDetail } from "@/models/type";
import { getRowByListId } from "@/services";
import { useRowState, useRowUpdateState } from "@/state";
import { useEffect } from "react";

export default function RowFetcher({ listId }: { listId: string }) {
  const [_, setRow] = useRowState()
  const [update] = useRowUpdateState()

  const getRow = (listId: string) => {
    getRowByListId(listId).then(res => {
      const { rows } = res;
      console.log(rows)
      setRow(rows as IRowDetail[])
    })
  }

  useEffect(() => {
    if (update > 0 && listId) {
      getRow(listId)
    }
  }, [update, listId])

  useEffect(() => {
    getRow(listId)
  }, [listId])


  return <></>
}
