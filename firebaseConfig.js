// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCo6T6wZfK8pJYONsl_uJxOjPjmhu6O5Ic",
    authDomain: "test2-b5df8.firebaseapp.com",
    projectId: "test2-b5df8",
    storageBucket: "test2-b5df8.appspot.com",
    messagingSenderId: "473665564520",
    appId: "1:473665564520:web:94f80b224db47119b770dd",
    measurementId: "G-H92YHG4XNP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get instances for Firebase services
const auth = getAuth(app);

// Export the Firebase services you want to use
export { auth };