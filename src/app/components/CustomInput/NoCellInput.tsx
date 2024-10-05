'use client'
import { FieldType, IFieldSelectItem } from "@/models/type";
import { createCellValue, updateCellValue } from "@/services";
import { useCallback, useState } from "react";

export default function EmptyInput({
  rowId,
  value,
  type,
  fieldId,
  data
}: {
  rowId: string,
  value: any,
  fieldId: string,
  data: any,
  type: FieldType
}) {
  const t = type === FieldType.Date ? 'date' : 'text'
  const [val, setValue] = useState(value || '')

  const onUpdateValue = useCallback(() => {
    console.log(val, fieldId, rowId)
    if (!val || !fieldId || !rowId) return
    createCellValue({
      fieldId,
      rowId,
      value: val
    }).then(res => {
      console.log(res)
    })
  }, [rowId, fieldId, val])

  if (type === FieldType.Select && data) {
    const options = data as IFieldSelectItem[]
    return <select>
      {options.map(option => {
        return <option key={option.name} value={option.name}>{option.name}</option>
      })}
    </select>
  }



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
