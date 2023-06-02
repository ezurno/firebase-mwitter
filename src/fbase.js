import { initializeApp } from "firebase/app";
import "firebase/auth";
import { getAuth } from "firebase/auth";
import "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
  appId: process.env.REACT_APP_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const authService = getAuth();
// firebase 의 authentical-service 를 사용하기 위함

export const dbService = getFirestore();
// firebase 의 firestore db 를 사용하기 위

export const storageService = getStorage();

export default app;
