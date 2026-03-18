// Minimal lazy Firebase - zero synchronous execution
import type { Database } from 'firebase/database';
import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';

let initialized = false;
let db: Database | null = null;
let auth: Auth | null = null;
let firestore: Firestore | null = null;

async function init() {
  if (initialized) return;
  initialized = true;

  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

  if (!apiKey || !projectId) {
    return;
  }

  try {
    const { initializeApp } = await import('firebase/app');
    const { getAuth } = await import('firebase/auth');
    const { getFirestore } = await import('firebase/firestore');

    const app = initializeApp({
      apiKey,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
      projectId,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    });

    auth = getAuth(app);
    firestore = getFirestore(app);

    const dbUrl = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL;
    if (dbUrl) {
      try {
        const { getDatabase } = await import('firebase/database');
        db = getDatabase(app);
      } catch (e) {
        // DB not available
      }
    }
  } catch (e) {
    // Silent fail
  }
}

export async function realtimeDb() {
  await init();
  return db;
}

export async function authService() {
  await init();
  return auth;
}

export async function firestore() {
  await init();
  return firestore;
}

export const generateId = () => {
  return `nav-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};
