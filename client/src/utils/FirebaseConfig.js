import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; //retrieve current authenticated user state

const firebaseConfig = {
  apiKey: "AIzaSyCHsCUpm2ufIYkHgpg1HlqCuH2Wc0jsGB0",
  authDomain: "whatapp-clone-cf16f.firebaseapp.com",
  projectId: "whatapp-clone-cf16f",
  storageBucket: "whatapp-clone-cf16f.appspot.com",
  messagingSenderId: "73869129183",
  appId: "1:73869129183:web:f1f6dbac8d03f34ea3406a",
  measurementId: "G-QV44EG2XBV",
};

const app = initializeApp(firebaseConfig);

// Get the Firebase Authentication object
export const firebaseAuth = getAuth(app);
