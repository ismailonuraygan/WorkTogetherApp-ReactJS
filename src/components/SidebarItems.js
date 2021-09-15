import React from 'react'
import styled from 'styled-components';
import db from '../firebase';
import { collection, addDoc } from "firebase/firestore/lite"; 
import { useDispatch } from 'react-redux';
import { enterRoom } from '../features/appSlice';


function SidebarItems( { Icon, title, addChannelOption } ) {

    const dispatch = useDispatch()

    const addChannel = () => {
        const channelName = prompt('Please enter the channel name');

        if(channelName) {
            (async (db) => {
                const docRef = await addDoc(collection(db, "rooms"), {
                    name: channelName
                  });
                  console.log(docRef)
            
            }) (db)
        }
    };
    
    const selectChannel = (id) => {
        if (id) {
            dispatch(enterRoom({
                roomId: id
            }))
        }
    };
    
    return (
        <SidebarItemContainer
            onClick={addChannelOption ? addChannel : selectChannel}
        >

            {Icon && <Icon fontsize="small" style= {{ padding: 10 }}/> }
            {Icon ? (
                <h3>{title}</h3>
            ): (
                <SidebarItemChannel>
                    <span>#</span> {title}
                </SidebarItemChannel>
            )
        }
        </SidebarItemContainer>
    )
}

export default SidebarItems

const SidebarItemContainer = styled.div`
    display: flex;
    font-size: 12px;
    align-items: center;
    padding-left: 2px;
    cursor: pointer;

    :hover {
        opacity: 0.9;
        background-color: #340e36;
    }
    > h3 {
        font-weight: 500;
    }
    
    >h3 >span {
        padding: 15px;
    }
`;

const SidebarItemChannel = styled.h3`
    padding: 10px 0;
    font-weight: 300;
`;
