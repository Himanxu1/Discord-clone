import React from 'react';
import './SidebarChannel.css';
import { useDispatch } from 'react-redux';
import { setChannelInfo } from '../features/appSlice';

const SidebarChannel = ({key,channelName,id}) => {
  const dispatch = useDispatch();



  return (
    <div className='sidebarChannel' onClick={()=> dispatch(setChannelInfo({
      channelId : id,
      channelName: channelName
    }))} id={key}> 
      <h4><span className='sidebarChannel_hash'># {channelName}</span></h4>
    </div>
  )
}

export default SidebarChannel