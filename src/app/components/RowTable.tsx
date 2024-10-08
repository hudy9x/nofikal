'use client'
import { useFieldList } from "../hooks/useFieldList"
import { useRowState } from "@/state"
import CustomInput from "./CustomInput"
import NoCellInput from "./CustomInput/NoCellInput"

export default function RowTable({ listId }: { listId: string }) {
  const { fieldList } = useFieldList(listId)
  const [rows] = useRowState()
  const sortedFieldList = fieldList.sort((a, b) => a.order - b.order)

  console.log('sortedFieldList', sortedFieldList)

  return <div>
    <table>
      <thead>
        <tr>
          <td>#</td>
          <td>ID</td>
          {sortedFieldList.map(f => {
            return <td key={f._id.toString()}>{f.name}</td>
          })}
        </tr>
      </thead>
      <tbody>

        {rows.map((row, index) => {
          const rowId = row._id.toString()
          return <tr key={rowId}>
            <td className="text-center text-sm">{index + 1}</td>
            <td>{rowId}</td>
            {sortedFieldList.map(f => {
              const cell = row.cells.find(cell => cell.fieldId === f._id)

              return <td key={f._id.toString()}>
                {cell ?
                  <CustomInput id={cell._id.toString()} value={cell.value} type={cell.fieldMetadata.type} /> :
                  <NoCellInput rowId={rowId} value={""} fieldId={f._id.toString()} type={f.type} data={f.data} />
                }
              </td>
            })}
          </tr>
        })}


      </tbody>
    </table>
  </div>
}
