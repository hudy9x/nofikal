import { FieldType, IFieldSelectItem } from "@/models/type"

const host = ''
export const getFieldByListId = async (listId: string) => {
  return fetch(`${host}/api/field?listId=${listId}`)
    .then(res => res.json())
}

export const createRow = async (listId: string) => {
  return fetch(`${host}/api/row`, {
    method: 'POST',
    body: JSON.stringify({ listId })
  }).then(res => res.json())
}

export const updateFieldOrder = async ({ order, id }: { order: string, id: string }) => {
  return fetch(`${host}/api/field`, {
    method: 'PUT',
    body: JSON.stringify({
      id,
      order
    })
  }).then(res => res.json())
}

export const createField = async ({ name, type, listId, order, selectItems }: { name: string, type: FieldType, listId: string, selectItems?: IFieldSelectItem[], order: string }) => {
  return fetch(`${host}/api/field`, {
    method: 'POST',
    body: JSON.stringify({
      name,
      order,
      type,
      listId,
      selectItems,
    })
  }).then(res => res.json())
}

export const getRowByListId = async (listId: string) => {
  return fetch(`${host}/api/row?listId=${listId}`)
    .then(res => res.json())
}

export const updateCellValue = async ({ id, value }: { id: string, value: any }) => {
  return fetch(`${host}/api/cell`, {
    method: 'PUT',
    body: JSON.stringify({
      id,
      value
    })
  }).then(res => res.json())
}

export const createCellValue = async ({
  fieldId,
  rowId,
  value }: {
    fieldId: string,
    rowId: string,
    value: any
  }) => {
  return fetch(`${host}/api/cell`, {
    method: 'POST',
    body: JSON.stringify({
      fieldId,
      rowId,
      value
    })
  }).then(res => res.json())
}
