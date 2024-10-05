'use client'

import { FieldType, IField, IFieldSelectItem } from "@/models/type";
import { createField } from "@/services";
import { useFieldState } from "@/state";
import { useState } from "react";

export default function CreateField({ listId }: { listId: string }) {
  const [fieldName, setFieldName] = useState('')
  const [fieldType, setFieldType] = useState<FieldType>(FieldType.Text)
  const [fieldOrder, setFieldOrder] = useState(0)
  const [selectItems, setSelectItems] = useState<IFieldSelectItem[]>([])
  const [_, setField] = useFieldState()

  const onClick = () => {
    if (!fieldName) return

    createField({
      name: fieldName,
      type: fieldType,
      order: fieldOrder + '',
      listId,
      selectItems: selectItems && selectItems.length ? selectItems : undefined
    })
      .then(res => {
        const { result } = res as { result: IField }
        setField(prev => [...[result], ...prev])
      })
  }

  return <div className="mt-4">
    <h2>Create new field</h2>
    <div className="flex flex-col gap-2">
      <input value={fieldName} className="w-full" onChange={ev => setFieldName(ev.target.value)} />
      <input value={fieldOrder} type="number" className="w-full" onChange={ev => setFieldOrder(parseInt(ev.target.value, 10))} />
      <select value={fieldType} className="w-full" onChange={ev => {
        setSelectItems([])
        setFieldType(ev.target.value as FieldType)
      }}>
        <option value={FieldType.Text}>{FieldType.Text}</option>
        <option value={FieldType.Select}>{FieldType.Select}</option>
        <option value={FieldType.Number}>{FieldType.Number}</option>
        <option value={FieldType.Date}>{FieldType.Date}</option>
      </select>
    </div>

    {fieldType === FieldType.Select ? <div className="mt-2">
      <div className="space-y-2">
        {selectItems.map((item, itemIndex) => {
          return <div key={itemIndex} className="border rounded-md px-2 py-1">
            {item.name}
          </div>
        })}
      </div>
      <div className="mt-2">
        <input placeholder="Input option name" onKeyUp={ev => {
          if (ev.key !== 'Enter') { return }

          const target = ev.target as HTMLInputElement
          const value = target.value
          setSelectItems(prev => [...prev, { name: value, color: 'blue' }])
          target.value = ''
        }} />
      </div>
    </div> : null}
    <button className="w-full mt-2" onClick={onClick}>Add</button>
  </div>
}
