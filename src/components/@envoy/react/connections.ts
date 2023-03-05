import {io} from "socket.io-client";

export interface Message {
    id: string,
    room_id: string,
    content: string,
    author_id: string
}

export interface Room {
    id: string,
    name: string,
}

export class Messenger<MessageType = Message, RoomType = Room> {
    ws_url: string
    room_key: keyof RoomType

    constructor(ws_url: string, room_key: keyof RoomType) {
        this.ws_url = ws_url
        this.room_key = room_key
    }
}

export class ChatConnection<MessageType = Message, RoomType = Room> {
    public socket
    public messenger

    constructor(messenger: Messenger) {
        this.messenger = messenger
        this.socket = io(messenger.ws_url)
    }

    sendMessage(room_id: any, message: any) {

    }

    createRoom(name: string) {

    }
}