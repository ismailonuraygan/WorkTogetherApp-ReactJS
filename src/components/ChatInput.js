import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import styled from 'styled-components'
import { db } from '../firebase';
import firebase from 'firebase';
import {useSelector} from 'react-redux';
import {selectRoomId} from '../features/appSlice';



function ChatInput({ channelName, channelId }) {

    const roomId = useSelector(selectRoomId)
    console.log(channelId)

    const [input, setInput] = useState('')
    const sendMessage = (e) => {
        e.preventDefault();
    

    if(!roomId) {
        return false;
    }
    db.collection("rooms").doc(roomId).collection("messages").add({
        message: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        user: 'Onur Aygan',
        userImage: "https://pbs.twimg.com/media/Eed9AJ_XgAERe7O.png"
    });

    setInput('');
    }

    return (
        <ChatInputContainer>
            <form>
                <input
                value={input}
                onChange={(e) => setInput(e.target.value) }
                placeholder={roomId ? `Message #${channelName}`: "Join channel to chat!"  } />
                <Button  type="submit" onClick={sendMessage}>
                    Send
                </Button>
            </form>
        </ChatInputContainer>
    )
}

export default ChatInput

const ChatInputContainer = styled.div`
    border-radius: 20px;

    > form {
        position: relative;
        display: flex;
        justify-content: center;
    }

    > form > input {
       position: fixed;
       bottom: 30px;
       width: 60%;
       border: 1px solid gray;
       border-radius: 3px;
       padding: 20px;
       outline: none;
    }

    > form > button {
        display: none !important;
    }
`