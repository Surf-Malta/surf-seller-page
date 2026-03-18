// src/lib/firebase.ts
// Firebase initialization with graceful fallback when env vars are missing

import type { FirebaseApp } from "firebase/app";
import type { Database } from "firebase/database";
import type { Auth } from "firebase/auth";
import type { Firestore } from "firebase/firestore";
import type { Analytics } from "firebase/analytics";

// Declare variables with null defaults
let app: FirebaseApp | null = null;
let realtimeDb: Database | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let analytics: Analytics | null = null;

// Only attempt initialization if we have the minimum required config
const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "";
const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "";
const databaseURL = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL ?? "";

const shouldInitialize = apiKey.length > 0 && projectId.length > 0;

if (shouldInitialize) {
  // Dynamic imports to prevent module-level crashes
  const initializeFirebase = async () => {
    try {
      const { initializeApp } = await import("firebase/app");
      const { getAuth } = await import("firebase/auth");
      const { getFirestore } = await import("firebase/firestore");

      const firebaseConfig = {
        apiKey,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        databaseURL: databaseURL || undefined,
        projectId,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
        measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
      };

      app = initializeApp(firebaseConfig);
      auth = getAuth(app);
      db = getFirestore(app);

      // Only initialize Realtime Database if URL is provided
      if (databaseURL.length > 0) {
        try {
          const { getDatabase } = await import("firebase/database");
          realtimeDb = getDatabase(app);
        } catch {
          realtimeDb = null;
        }
      }

      // Initialize Analytics only in browser
      if (typeof window !== "undefined") {
        try {
          const { getAnalytics, isSupported } = await import("firebase/analytics");
          const supported = await isSupported();
          if (supported && app) {
            analytics = getAnalytics(app);
          }
        } catch {
          analytics = null;
        }
      }
    } catch {
      // Firebase initialization failed - keep all values as null
      app = null;
      auth = null;
      db = null;
      realtimeDb = null;
      analytics = null;
    }
  };

  // Don't await - let it initialize in the background
  initializeFirebase();
}

export { realtimeDb, auth, db, analytics };

export const generateId = () => {
  return `nav-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export default app;
