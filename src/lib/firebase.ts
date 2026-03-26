import { FirebaseApp, initializeApp } from "firebase/app";
import { Database, getDatabase } from "firebase/database";
import { Auth, getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";
import { Analytics, getAnalytics, isSupported } from "firebase/analytics";

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

let app: FirebaseApp | undefined;
let realtimeDb: Database | undefined;
let auth: Auth | undefined;
let db: Firestore | undefined;
let analytics: Analytics | undefined;

try {
  app = initializeApp(firebaseConfig);
  realtimeDb = getDatabase(app);
  auth = getAuth(app);
  db = getFirestore(app);

  // Initialize Analytics only in browser environment
  if (typeof window !== "undefined") {
    isSupported().then((supported) => {
      if (supported) {
        analytics = getAnalytics(app);
        console.log("✅ Firebase Analytics initialized");
      }
    });
  }

  // Only log in development
  if (process.env.NODE_ENV === "development") {
    if (missingEnvVars.length > 0) {
      console.warn(
        "⚠️ Missing Firebase environment variables:",
        missingEnvVars
      );
    } else {
      console.log("✅ Firebase initialized successfully");
      console.log(
        "📊 Project ID:",
        process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
      );
    }
  }
} catch (error) {
  if (process.env.NODE_ENV === "development") {
    console.error("❌ Firebase initialization error:", error);
  }
}

export { realtimeDb, auth, db, analytics };

export const generateId = () => {
  return `nav-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export default app;
