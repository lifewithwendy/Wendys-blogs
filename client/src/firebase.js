import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
console.log(import.meta.env.VITE_FIREBASE_API_KEY);
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY, 
  authDomain: "wendy-s-blog.firebaseapp.com",
  projectId: "wendy-s-blog",
  storageBucket: "wendy-s-blog.appspot.com",
  messagingSenderId: "376177951521",
  appId: "1:376177951521:web:0c1d3b0b0748f652c63460"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

