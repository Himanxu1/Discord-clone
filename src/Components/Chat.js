import React, { useEffect, useState } from 'react';
import './Chat.css';
import ChatHeader from './ChatHeader';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CardGiftcardIcon  from '@mui/icons-material/CardGiftcard';
import GifIcon from '@mui/icons-material/Gif';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import Message from './Message';
import { selectUser } from '../features/userSlice';
import { selectChannelId } from '../features/appSlice';
import { selectChannelName } from '../features/appSlice';
import { useSelector } from 'react-redux';
import {db} from '../firebase';
import firebase from 'firebase/compat/app';

const Chat = () => {

  const user = useSelector(selectUser);
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  const [input,setInput] = useState("");
  const [messages,setMessages] = useState([]);

  useEffect(()=>{
    if(channelId){
      db.collection('channels')
      .doc(channelId).collection("message")
      .orderBy('timestamp',"desc")
      .onSnapshot((snapshot)=>setMessages(snapshot.docs.map((doc)=> doc.data())))
    }
  },[channelId])

 const sendMessage = (e)=>{
  e.preventDefault();
  db.collection("channels").doc(channelId).collection("message").add({
    timestamp : firebase.firestore.FieldValue.serverTimestamp(),
    message:input,
    user:user
  })

  setInput("");

 }
  return (
    <div className='chat'>
        <ChatHeader channelName ={channelName} channelId={channelId}/>
        <div className='chat__message'>
           {messages.map((message)=>{
              return <Message 
              timestamp= {message.timestamp}
              message={message.message}
              user={message.user}
              />
           })}

        </div>
        <div className='chat__input'>
            <AddCircleIcon/>
            <form >
            <input placeholder='Message' value={input} onChange={(e)=> setInput(e.target.value)} />  
            <button type='submit' onClick={sendMessage} >send</button> 
            </form>
            <div className='chat__inputIcons'>
                <CardGiftcardIcon/>
                <GifIcon/>
                <EmojiEmotionsIcon/>
            </div>
        </div>
    </div>
  )
}

export default Chat