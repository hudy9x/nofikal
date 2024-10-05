'use client'
import { FieldType } from "@/models/type";
import { updateCellValue } from "@/services";
import { useState } from "react";

export default function InputText({ id, value, type }: { id: string, value: any, type: FieldType }) {
  const t = type === FieldType.Date ? 'date' : 'text'
  const [val, setValue] = useState(value || '')

  const onUpdateValue = () => {
    updateCellValue({
      id, value
    })
  }

  if (type === FieldType.Text) {

  }

  return <input value={val} type={t} />
}
