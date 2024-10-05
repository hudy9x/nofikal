'use client'
import { FieldType } from "@/models/type";
import { updateCellValue } from "@/services";
import { useCallback, useState } from "react";

export default function CustomInput({ id, value, type }: { id: string, value: any, type: FieldType }) {
  const t = type === FieldType.Date ? 'date' : 'text'
  const [val, setValue] = useState(value || '')

  const onUpdateValue = useCallback(() => {
    console.log(id, val)

    updateCellValue({
      id, value: val
    }).then(res => {
      console.log(res)
    })
  }, [id, val])



  return <input value={val}
    onKeyUp={ev => {
      if (ev.key === 'Enter') {
        onUpdateValue()
      }
    }}
    onBlur={() => {
      onUpdateValue()
    }}
    onChange={ev => {
      setValue(ev.target.value)
    }}
    type={t} />
}
