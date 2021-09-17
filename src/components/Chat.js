import React from 'react';
import styled from 'styled-components';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import InfoIcon from '@material-ui/icons/Info';
import ChatInput from './ChatInput';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import {selectRoomId} from '../features/appSlice';
import {useSelector} from 'react-redux';



function Chat() {
    const roomId = useSelector(selectRoomId)

    const[roomDetails] = useDocument(
        roomId && db.collection('rooms').doc(roomId)
    )

    const[roomMessages] = useCollection(
        roomId && db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc')
    )
    console.log(roomMessages);

    return (
        <ChatContainer>
        <>
            <Header>
                <HeaderLeft>
                    <h4>
                        <strong>{roomId ? `#${roomDetails?.data().name}` : "You have not joined a room yet" }</strong>
                    </h4>
                    <StarBorderIcon />
                </HeaderLeft>

                <HeaderRight>
                    <p>
                        <InfoIcon /> Details
                    </p>
                </HeaderRight>
            </Header>
            <ChatMessages>
                {roomMessages?.doc().map((doc) => {
                    const { message, timestamp, user, userImage } = doc.data();
                })}
            </ChatMessages>

            <ChatInput
                channelName = {roomDetails?.data().name}
            />
        </>
        </ChatContainer>


    )
}

export default Chat


const ChatContainer = styled.div`
    flex: 0.7;
    flex-grow: 1;
    overflow-y: scroll;
    margin-top: 60px;
`

const Header = styled.div`
        display: flex;
        justify-content: space-between;
        padding: 20px;
        border-bottom: 1px solid lightgray;
    `

const HeaderLeft = styled.div`
    display: flex;
    align-items: center;
    
    >h4 {
        display: flex;
        text-transform: lowercase;
        margin-right: 10px;
    }

    > .MuiSvgIcon-root	 {
        margin-left: 10px;
        font-size: 18px;
    }
`

const HeaderRight = styled.div`
    > p {
        display: flex;
        align-items: center;
        font-size: 14px;
    }

    > p > .MuiSvgIcon-root {
        margin-right: 5px !important;
        font-size: 16px;
    }
`

const ChatMessages = styled.div``


