// import {ChatServerProvider, Messenger} from "@envoy/react";

import React from "react";
import {ChatServerProvider, Messenger} from "../envoy";

interface Message {
    room_id: string,
    content: string
}

interface Room {
    id: string
}

const messenger = new Messenger<Message, Room>(
    "ws://localhost:3000",
    "id",
    (m) => m.room_id
)

export function ExampleMessenger() {
    return <ChatServerProvider messenger={messenger}>
        This is epic
        <ChatRooms/>
    </ChatServerProvider>
}

export function ChatRooms() {
    const {createRoom, rooms} = messenger.useChatServer()
    return (
        <>
            {
                (rooms || []).map(r => <ExampleChat room={r.room}/>)
            }
        </>
    )
}

export function ExampleChat(props: { room: { id: string } }) {
    const {sendMessage, messages} = messenger.useChatroom(props.room.id)

    return <div>
        {(messages || []).map(m => <div>{m.content}</div>)}
    </div>
}