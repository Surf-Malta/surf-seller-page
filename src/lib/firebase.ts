// src/lib/firebase.ts
// Lazy-loaded Firebase initialization - no synchronous execution

import type { FirebaseApp } from "firebase/app";
import type { Database } from "firebase/database";
import type { Auth } from "firebase/auth";
import type { Firestore } from "firebase/firestore";
import type { Analytics } from "firebase/analytics";

// Lazy-loaded singletons - only initialized when first accessed
let app: FirebaseApp | null = null;
let realtimeDb: Database | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let analytics: Analytics | null = null;
let initPromise: Promise<void> | null = null;

// Check if Firebase can be initialized
const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "";
const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "";

const canInitialize = apiKey.length > 0 && projectId.length > 0;

// Initialize Firebase on first access
async function initializeFirebase() {
  if (initPromise) return initPromise;

  initPromise = (async () => {
    if (!canInitialize || app) return;

    try {
      const { initializeApp } = await import("firebase/app");
      const { getAuth } = await import("firebase/auth");
      const { getFirestore } = await import("firebase/firestore");

      const firebaseConfig = {
        apiKey,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
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
      const databaseURL = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL;
      if (databaseURL && databaseURL.length > 0) {
        try {
          const { getDatabase } = await import("firebase/database");
          realtimeDb = getDatabase(app);
        } catch {
          // Realtime Database not configured
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
    } catch (error) {
      // Silent initialization failure
      app = null;
      auth = null;
      db = null;
      realtimeDb = null;
      analytics = null;
    }
  })();

  return initPromise;
}

// Lazy getters that trigger initialization
async function getApp(): Promise<FirebaseApp | null> {
  await initializeFirebase();
  return app;
}

async function getRealtimeDb(): Promise<Database | null> {
  await initializeFirebase();
  return realtimeDb;
}

async function getAuthService(): Promise<Auth | null> {
  await initializeFirebase();
  return auth;
}

async function getDb(): Promise<Firestore | null> {
  await initializeFirebase();
  return db;
}

async function getAnalyticsService(): Promise<Analytics | null> {
  await initializeFirebase();
  return analytics;
}

// Export lazy-loaded singletons
export {
  getApp as app,
  getRealtimeDb as realtimeDb,
  getAuthService as auth,
  getDb as db,
  getAnalyticsService as analytics,
};

export const generateId = () => {
  return `nav-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// For backward compatibility, also export as default
export default getApp;
