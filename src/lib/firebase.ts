// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

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

const requiredEnvVars = [
  "NEXT_PUBLIC_FIREBASE_API_KEY",
  "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
  "NEXT_PUBLIC_FIREBASE_DATABASE_URL",
  "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
  "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
  "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
  "NEXT_PUBLIC_FIREBASE_APP_ID",
];

const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);

let app: ReturnType<typeof initializeApp> | null = null;
let realtimeDb: ReturnType<typeof getDatabase> | null = null;
let auth: ReturnType<typeof getAuth> | null = null;
let db: ReturnType<typeof getFirestore> | null = null;
let analytics: ReturnType<typeof getAnalytics> | null = null;

// Only initialize Firebase if required environment variables are present
const isFirebaseConfigured =
  firebaseConfig.apiKey &&
  firebaseConfig.projectId &&
  firebaseConfig.databaseURL;

if (isFirebaseConfigured) {
  try {
    app = initializeApp(firebaseConfig);
    realtimeDb = getDatabase(app);
    auth = getAuth(app);
    db = getFirestore(app);

    // Initialize Analytics only in browser environment
    if (typeof window !== "undefined") {
      isSupported().then((supported) => {
        if (supported && app) {
          analytics = getAnalytics(app);
          console.log("✅ Firebase Analytics initialized");
        }
      });
    }

    // Only log in development
    if (process.env.NODE_ENV === "development") {
      console.log("✅ Firebase initialized successfully");
      console.log(
        "📊 Project ID:",
        process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
      );
    }
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("❌ Firebase initialization error:", error);
    }
  }
} else if (process.env.NODE_ENV === "development") {
  console.warn(
    "⚠️ Firebase not initialized. Missing environment variables:",
    missingEnvVars
  );
}

export { realtimeDb, auth, db, analytics };

export const generateId = () => {
  return `nav-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export default app;
