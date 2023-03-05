import {ChatServerProvider, Messenger} from "@envoy-js/react";

import React, {useEffect, useMemo, useState} from "react";
import {Avatar, Button, Container, Grid, Paper, TextField, Typography} from "@mui/material";

interface User {
    username: string
    id: string,
    avatar: string
}

interface Message {
    id: string
    value: string
    roomid: string,
    author: User
}

interface Room {
    id: string
    users: User[]
}

const messenger = new Messenger<Message, Room, User>(
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

    return <main style={{width: '100vw', height: '100vh', marginLeft: 'auto', marginRight: 'auto'}}>
        <Container maxWidth={'md'}>
            <Grid container spacing={4}>
                {(rooms || []).map((r, i) => <ExampleChat room={r.room} key={i}/>)}
            </Grid>
        </Container>
    </main>
}


export function MessageEntry(props: { message: Message }) {
    const {me} = messenger.useChatServer()
    const {message} = props
    const isMine = useMemo(() => (message.author.username === me?.username), [message, me])

    return <Grid item xs={12} display={'flex'}
                 justifyContent={isMine ? 'right' : 'left'}>
        {!isMine &&
            <Avatar src={props.message.author.avatar} variant={'rounded'} sx={{width: 48, height: 48}}/>
        }
        <Paper sx={{
            padding: 1,
            // minWidth: 250,
            backgroundColor: isMine ? '#78cbde' : '#FFF',
            display: 'flex',
            justifyContent: isMine ? 'right' : 'left',
            marginRight: 1,
            marginLeft: 1,
            alignItems: 'center',
            maxWidth: 450,
            overflowWrap: 'anywhere'
        }} variant="outlined">
            <Typography>
                {props.message.value}
            </Typography>
        </Paper>
        {isMine &&
            <Avatar src={props.message.author.avatar} variant={'rounded'} sx={{width: 48, height: 48}}/>}
    </Grid>
}

export function ExampleChat(props: { room: { id: string } }) {
    const {sendMessage, messages} = messenger.useChatroom(props.room.id)
    const [content, setContent] = useState("")

    return <Grid item xs={12}>
        <Paper sx={{width: '100%', padding: 2, maxHeight: '100vh', overflow: "scroll"}} variant="outlined">
            <Grid container justifyContent={'space-between'} direction={'column'} spacing={2} sx={{minHeight: 500}}>
                <Grid item xs={12}>
                    <Grid container spacing={1}>
                        {(messages || []).map((m, i) => <MessageEntry message={m} key={i}/>)}
                    </Grid>
                </Grid>
                <Grid item xs={12} display={'flex'} justifyContent={'space-between'}>
                    <TextField fullWidth value={content} onChange={(event) => setContent(event.target.value)}
                               multiline/>
                    <Button onClick={(event) => {
                        sendMessage!({value: content, roomid: props.room.id})
                        setContent("")
                    }} sx={{marginLeft: 2}} variant={'contained'}>
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    </Grid>
}