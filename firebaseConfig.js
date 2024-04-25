import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDijVK9_L3-yFe0J1DiSjbjI7goYqYocxE",
    authDomain: "test3-31ef5.firebaseapp.com",
    projectId: "test3-31ef5",
    storageBucket: "test3-31ef5.appspot.com",
    messagingSenderId: "822688839726",
    appId: "1:822688839726:web:7a18760e1a799de49f07bf",
    measurementId: "G-MLRK27EZ25",
  databaseURL: "https://test3-31ef5-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };