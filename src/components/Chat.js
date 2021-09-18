import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import InfoIcon from '@material-ui/icons/Info';
import ChatInput from './ChatInput';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import { selectRoomId } from '../features/appSlice';
import { useSelector } from 'react-redux';
import Message from './Message';


function Chat() {

    const chatRef = useRef(null)
    console.log(chatRef)
    const roomId = useSelector(selectRoomId)

    const [roomDetails] = useDocument(
        roomId && db.collection('rooms').doc(roomId)
    ) //firebase hook

    const [roomMessages, loading] = useCollection(
        roomId && db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc')
    ) //firebase hook


    useEffect(() => {
        chatRef?.current?.scrollIntoView({ behavior: "smooth" });
    }, [roomId, loading])

    return (
        <ChatContainer>
            {roomDetails && roomMessages && (
                <>
                    <Header>
                        <HeaderLeft>
                            <h4>
                                <strong>{roomId ? `#${roomDetails?.data().name}` : "You have not joined a room yet"}</strong>
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
                        {roomMessages?.docs.map((doc) => {
                            const { message, timestamp, user, userImage } = doc.data();

                            return (
                                <Message
                                    key={doc.id}
                                    message={message}
                                    timestamp={timestamp}
                                    user={user}
                                    userImage={userImage}
                                />
                            )
                        })}
                        <ChatBottom ref={chatRef} />
                    </ChatMessages>

                    <ChatInput
                        chatRef={chatRef}
                        channelName={roomDetails?.data().name}
                    />
                </>
            )}
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
        z-index: 100;
        background-color: white;
    `

const HeaderLeft = styled.div`
    display: flex;
    align-items: center;
    color: black;

    >h4 {
        display: flex;
        text-transform: lowercase;
        padding-right: 10px;        
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
        color: black;
        margin-right: 20px;
    }

    > p > .MuiSvgIcon-root {
        margin-right: 5px !important;
        font-size: 16px;
    }
`

const ChatMessages = styled.div``

const ChatBottom = styled.div`
    padding-bottom: 200px;
`


