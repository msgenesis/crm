import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyAIKlAguaMraOTO5Sy1H6HKNrCYmss0eT4",
  authDomain: "genesis-7c1cc.firebaseapp.com",
  databaseURL: "https://genesis-7c1cc.firebaseio.com",
  projectId: "genesis-7c1cc",
  storageBucket: "genesis-7c1cc.appspot.com",
  messagingSenderId: "712534524878",
  appId: "1:712534524878:web:8b2c50bca5198cd6"
};
export default firebase.initializeApp(firebaseConfig);