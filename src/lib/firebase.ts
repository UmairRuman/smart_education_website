// src/lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// --- IMPORTANT ---
// Replace this with your own Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-AngDENc7J2UKETlQau7LUfrVphfMR6M",
  authDomain: "ai-taleem-app.firebaseapp.com",
  projectId: "ai-taleem-app",
  storageBucket: "ai-taleem-app.firebasestorage.app",
  messagingSenderId: "875468350917",
  appId: "1:875468350917:web:6e2de97f001a625d4917ac",
  measurementId: "G-E6F45VL9G5"
};

// Initialize Firebase lazily to work in both client and server contexts
let app: ReturnType<typeof initializeApp> | undefined;
let db: ReturnType<typeof getFirestore> | undefined;

export function getFirebaseApp() {
  if (typeof window === 'undefined') {
    // Server side
    if (!app) {
      app = initializeApp(firebaseConfig, 'server');
    }
    return app;
  }

  // Client side
  if (!app) {
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  }
  return app;
}

export function getDb() {
  if (!db) {
    db = getFirestore(getFirebaseApp());
  }
  return db;
}