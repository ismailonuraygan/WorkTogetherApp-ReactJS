import React from 'react'
import styled from 'styled-components';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import CreateIcon from '@material-ui/icons/Create';
import SidebarItems from './SidebarItems';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import AppsIcon from '@material-ui/icons/Apps';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import { db } from '../firebase';
import { useCollection } from 'react-firebase-hooks/firestore'
import { useAuthState } from 'react-firebase-hooks/auth';
import {auth} from '../firebase'





function Sidebar() {
    const [channels] = useCollection(db.collection('rooms'));

    const [user] = useAuthState(auth)

    return (
        <SidebarContainer>
            <SidebarHeader>
                <SidebarInfo>
                    <h2>Dev's World</h2>
                    <h3>
                        <FiberManualRecordIcon/>
                        {user.displayName}
                    </h3>
                </SidebarInfo>
                <CreateIcon/>
            </SidebarHeader>

            <SidebarItems Icon={InsertCommentIcon} title="Threads"/>
            <SidebarItems Icon={InboxIcon} title="Mentions & reactions"/>
            <SidebarItems Icon={DraftsIcon} title="Saved items"/>
            <SidebarItems Icon={BookmarkBorderIcon} title="Channel browser"/>
            <SidebarItems Icon={PeopleAltIcon} title="People & user groups"/>
            <SidebarItems Icon={AppsIcon} title="Apps"/>
            <SidebarItems Icon={FileCopyIcon} title="File browser"/>
            <SidebarItems Icon={ExpandLessIcon} title="Show less"/>
            <hr/>
            <SidebarItems Icon={ExpandMoreIcon} title="Channels"/>
            <hr/>
            <SidebarItems Icon={AddIcon} addChannelOption title="Add Channels"/>
            
            {channels?.docs.map(doc=> (
                <SidebarItems
                 key={doc.id}
                 id= {doc.id}
                 title={doc.data().name} />
            ))}
        </SidebarContainer>
    )
}

export default Sidebar

const SidebarContainer = styled.div`
    color: white;
    background-color: var(--slack-color);
    flex: 0.3;
    border-top: 1px solid #49274b;
    max-width: 260px;
    margin-top: 60px;

    >hr {
        margin-top: 10px;
        margin-bottom: 10px;
        border: 1px solid #49274b;
    }
`

const SidebarHeader = styled.div`
    display: flex;
    border-bottom: 1px solid #49274b;
    padding: 13px;
    
    > .MuiSvgIcon-root {
        padding: 8px;
        color: #49274b;
        font-size: 18px;
        background-color: white;
        border-radius: 999px;
        
    }	
`

const SidebarInfo = styled.div`
    flex: 1;

    > h2 {
        font-size: 15px;
        font-weight: 900;
        margin-bottom: 5px;
    }

    > h3 {
        display: flex;
        font-size: 13px;
        font-weight: 400;
        align-items: center;
    }

    > h3 > .MuiSvgIcon-root{
        font-size:14px;
        margin-top: 1px;
        margin-right: 2px;
        color: green;
    }
`
