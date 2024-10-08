'use client'
import { useRowUpdateState } from "@/state";
import Pusher from "pusher-js";
import { useEffect } from "react"

export default function PusherClient({ listId }: { listId: string }) {
  const [_, setUpdate] = useRowUpdateState()

  useEffect(() => {
    if (!listId) return
    var pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_API_KEY || '', {
      cluster: process.env.NEXT_PUBLIC_PUSHER_REGION || ''
    });

    var channel = pusher.subscribe('table-channel');

    channel.bind(`row-${listId}-created`, function(data: any) {
      setUpdate(counter => counter + 1)
      console.log(JSON.stringify(data));
    });

    channel.bind(`row-${listId}-updated`, function(data: any) {
      console.log(JSON.stringify(data));
    });

    channel.bind(`row-${listId}-deleted`, function(data: any) {
      console.log(JSON.stringify(data));
    });

  }, [listId])
  return <></>
}
