import PusherClient from "@/app/components/PusherClient";
import RowList from "@/app/components/RowList";
import FieldContainer from "@/app/containers/Field";
import FieldFetcher from "@/app/containers/Field/FieldFetcher";
import RowFetcher from "@/app/containers/RowFetcher";
import Link from "next/link";

export default async function Page({ params }: { params: { listId: string } }) {
  const { listId } = params

  return <div className="w-[1200px] mt-[200px] mx-auto">
    <FieldFetcher listId={listId} />
    <RowFetcher listId={listId} />
    <PusherClient listId={listId} />

    <div className="flex items-center justify-between">
      <Link className="btn" href={'/'}>Back to List</Link>
      <button>Add Field</button>
    </div>
    <div className="flex mt-3 gap-2">
      <RowList listId={listId} />
    </div>
    <FieldContainer listId={listId} />
  </div>
}
