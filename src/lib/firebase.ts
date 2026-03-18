// src/lib/firebase.ts
import { initializeApp, type FirebaseApp } from "firebase/app";
import { getDatabase, type Database } from "firebase/database";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getAnalytics, isSupported, type Analytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Check if Firebase can be initialized (has minimum required config)
const hasRequiredConfig = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId
);

let app: FirebaseApp | null = null;
let realtimeDb: Database | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let analytics: Analytics | null = null;

if (hasRequiredConfig) {
  try {
    app = initializeApp(firebaseConfig);

    // Only initialize realtime database if URL is provided
    if (firebaseConfig.databaseURL) {
      realtimeDb = getDatabase(app);
    }

    auth = getAuth(app);
    db = getFirestore(app);

    // Initialize Analytics only in browser environment
    if (typeof window !== "undefined") {
      isSupported().then((supported) => {
        if (supported && app) {
          analytics = getAnalytics(app);
        }
      });
    }
  } catch (error) {
    // Silently fail - Firebase is optional for preview
    if (process.env.NODE_ENV === "development") {
      console.warn("Firebase initialization skipped:", error);
    }
  }
}

export { realtimeDb, auth, db, analytics };

export const generateId = () => {
  return `nav-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export default app;
