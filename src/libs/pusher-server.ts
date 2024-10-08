import Pusher from "pusher";

const pusher = new Pusher({
  appId: process.env.PUSHER_APPID || '',
  key: process.env.NEXT_PUBLIC_PUSHER_API_KEY || '',
  secret: process.env.PUSHER_SECRET_KEY || '',
  cluster: process.env.NEXT_PUBLIC_PUSHER_REGION || '',
  useTLS: true
});

export const notifyRowCreated = (listId: string) => {
  pusher.trigger('table-channel', `row-${listId}-created`, {
    type: 'ROW_CREATED',
    data: {
      message: "Done"
    }
  });
}

export const notifyRowUpdated = (cellId: string) => {
  pusher.trigger('table-channel', `row-${cellId}-updated`, {
    type: 'ROW_UPDATED',
    data: {
      message: "Done"
    }
  });
}

export const notifyRowDeleted = (cellId: string) => {
  pusher.trigger('table-channel', `row-${cellId}-deleted`, {
    type: 'ROW_DELETED',
    data: {
      message: "Done"
    }
  });
}

