import './App.css';
import Sidebar from './Components/Sidebar';
import Chat from './Components/Chat';
import {useSelector,useDispatch} from 'react-redux';
import { selectUser } from './features/userSlice';
import Login from './Components/Login';
import { useEffect } from 'react';
import { auth } from './firebase';
import {login,logout} from './features/userSlice' ;

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();


  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        dispatch(login({
          uid: authUser.uid,
          photo:authUser.photoURL,
          email:authUser.email,
          displayName: authUser.displayName,
        }))

      }else{
            dispatch(logout())
      }
    })
  },[dispatch])

  return (
    <div className="App">
    {user ? (
      <>
      <Sidebar/>
       <Chat/>
      </>
   
    ) : <Login/>}
      
    </div>
  );
}

export default App;
