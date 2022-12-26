import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD0Dq2DpN_dnkj7j3FEKW5q5bwLj7u0QxE",
  authDomain: "myfirstphoneapp.firebaseapp.com",
  projectId: "myfirstphoneapp",
  storageBucket: "myfirstphoneapp.appspot.com",
  messagingSenderId: "1022708882200",
  appId: "1:1022708882200:web:b75f77adffa9195a53dc6d",
  measurementId: "G-2Z8WS38PWT"
};

const app = initializeApp(firebaseConfig);

export default app;
