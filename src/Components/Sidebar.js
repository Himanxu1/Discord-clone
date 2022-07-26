import React, { useEffect,useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './Sidebar.css';
import AddIcon from '@mui/icons-material/Add';
import SidebarChannel from './SidebarChannel';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import InfoOutlineIcon from '@mui/icons-material/InfoOutlined';
import CallIcon from '@mui/icons-material/Call';
import { Avatar } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import HeadsetIcon from '@mui/icons-material/Headset';
import SettingsIcon from '@mui/icons-material/Settings';
import {useSelector} from 'react-redux';
import { auth , db} from '../firebase';




const Sidebar = () => {
  const {user} = useSelector((state)=> state.user);
  const {photo,displayName,uid} = user;

  const [channels,setChannels] = useState([]);

  useEffect(()=>{
    db.collection("channels").onSnapshot((snapshot) =>
      setChannels(
        snapshot.docs.map((doc)=>({
          id:doc.id,
          channel: doc.data(),
        }))
      )
    )
  },[])

  const handleAddChannel =()=>{
    const channelName = prompt("Enter a new Channel Name");

    if(channelName){
      db.collection("channels").add({
        channelName: channelName,

      })
       }
  }

  return (
    <div className='sidebar'>
        <div className="sidebar__top">
            <h3>Discord</h3>
            <ExpandMoreIcon/>
        </div>
        <div className="sidebar__channels">
            <div className="sidebar__channelsHeader">
                <div className="sidebar__header">
                   <ExpandMoreIcon/>
                   <h4>Text Channels</h4>
                </div>
                <AddIcon className='sidebar__addchannel' onClick={handleAddChannel}/>
            </div>
            <div className="sidebar__channelList">
              {channels.map(({id,channel}) =>{
               return <SidebarChannel key={id} channelName={channel.channelName} id={id}/>

              })}
            
        </div>
        </div>
        <div className='sidebar__voice'>
          <SignalCellularAltIcon className='sidebar__voiceIcon' fontSize="large"/>
               <div className='sidebar__voiceInfo'>
                  <h3>Voice Connected</h3>
                  <p>Stream</p>
               </div>
               <div className='sidebar__voiceIcons'>
                <InfoOutlineIcon/>
                <CallIcon/>

               </div>
        </div>
        <div className='sidebar__profile'>
          <Avatar src={photo} onClick={() => auth.signOut()}/>
          <div className='sidebar__profileInfo'>
            <h3>@{displayName}</h3>
            <p>#{uid.substring(0,5)}</p>
          </div>
          <div className='sidebar__profileIcons'>
            <MicIcon/>
            <HeadsetIcon/>
            <SettingsIcon/>
          </div>
        </div>
        
    </div>
  )
}

export default Sidebar