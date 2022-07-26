import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBY-QZiu33INx0-vsHciOwk_lvHZsdYcCo",
    authDomain: "discord-clone-7a6a1.firebaseapp.com",
    projectId: "discord-clone-7a6a1",
    storageBucket: "discord-clone-7a6a1.appspot.com",
    messagingSenderId: "483117607384",
    appId: "1:483117607384:web:be3a7b7f5369b5a8802aad"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  export const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  export {auth,provider};
