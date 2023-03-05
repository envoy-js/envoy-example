import {ChatServerProvider, Messenger} from "@envoy-js/react";

import React, {useEffect, useState} from "react";
import {Button, Container, Grid, Paper, TextField, Typography} from "@mui/material";

interface User {
    username: string
    id: string
}

interface Message {
    id: string
    value: string
    roomid: string
}

interface Room {
    id: string
    users: User[]
}

const messenger = new Messenger<Message, Room>(
    "ws://localhost:3000",
    "id",
    (m) => m.roomid
)

export function ExampleMessenger() {
    return <ChatServerProvider messenger={messenger}>
        <MessagesArea/>
    </ChatServerProvider>
}

export function MessagesArea() {
    const {createRoom, rooms} = messenger.useChatServer()
    useEffect(() => {
        console.log(rooms)
    }, [createRoom, rooms])

    return <Container maxWidth={'md'}>
        <Grid container spacing={4}>
            {(rooms || []).map(r => <ExampleChat room={r.room}/>)}
        </Grid>
    </Container>
}


export function MessageEntry(props: { message: Message }) {
    return <Grid item xs={12}>
        <Paper color={'primary'}>
            <Typography>
                {props.message.value}
            </Typography>
        </Paper>
    </Grid>
}

export function ExampleChat(props: { room: { id: string } }) {
    const {sendMessage, messages} = messenger.useChatroom(props.room.id)
    const [content, setContent] = useState("")

    useEffect(() => {
        console.log("Messages changed: ", messages)
    }, [sendMessage, messages])

    return <Grid item xs={12}>
        <Paper>
            <Grid container justifyContent={'space-between'} direction={'column'}>
                <Grid item>
                    <Grid container spacing={1}>
                        {(messages || []).map(m => <MessageEntry message={m}/>)}
                    </Grid>
                </Grid>
                <Grid item display={'flex'} justifyContent={'space-between'}>
                    <TextField fullWidth value={content} onChange={(event) => setContent(event.target.value)}/>
                    <Button onClick={(event) => {
                        sendMessage!({value: content, roomid: props.room.id})
                        setContent("")
                    }}>
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    </Grid>
}