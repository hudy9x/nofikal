'use client'

import CreateRow from "./CreateRow";
import RowTable from "./RowTable";

export default function RowList({ listId }: { listId: string }) {


  return <div className="card w-full">
    <h2>Table</h2>
    <RowTable listId={listId} />
    <CreateRow listId={listId} />
  </div>
}
