import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged, User, GoogleAuthProvider, linkWithPopup } from 'firebase/auth';
import { getDatabase, ref, set, get, child, update, runTransaction, onValue } from 'firebase/database';

// Firebase configuration using Vite environment variables with graceful fallback
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDummyKeyForDevelopment123456",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "animedle-app.firebaseapp.com",
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "https://animedle-app-default-rtdb.firebaseio.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "animedle-app",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "animedle-app.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1234567890:web:abcdef123456"
};

// Initialize Firebase app singleton
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const rtdb = getDatabase(app);

// Helper for Anonymous Authentication
export const initAnonymousAuth = (): Promise<User | null> => {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        resolve(user);
      } else {
        try {
          const userCred = await signInAnonymously(auth);
          resolve(userCred.user);
        } catch (error) {
          console.warn("Firebase Auth (Dev mode/offline fallback):", error);
          resolve(null);
        }
      }
    });
  });
};

// Link Anonymous Account with Google
export const linkGoogleAccount = async () => {
  if (!auth.currentUser) return null;
  const provider = new GoogleAuthProvider();
  try {
    const result = await linkWithPopup(auth.currentUser, provider);
    return result.user;
  } catch (error) {
    console.error("Error linking Google account:", error);
    throw error;
  }
};

// Realtime Database Types
export interface CommunityDayStats {
  totalPlayers: number;
  totalWins: number;
  guessDistribution: Record<number, number>;
}

export interface ChallengeSession {
  id: string;
  creatorId: string;
  creatorName: string;
  animeSlug: string;
  targetCharacterId: string;
  creatorGuessesCount: number;
  createdAt: number;
  players?: Record<string, { name: string; guessesCount: number; completedAt: number }>;
}

// -------------------------------------------------------------
// 1. COMMUNITY STATS (Realtime Database)
// -------------------------------------------------------------
export const recordGlobalWin = async (dateStr: string, animeSlug: string, guessesCount: number) => {
  try {
    const statsRef = ref(rtdb, `community_stats/${dateStr}/${animeSlug}`);
    await runTransaction(statsRef, (currentData) => {
      if (!currentData) {
        currentData = {
          totalPlayers: 1,
          totalWins: 1,
          guessDistribution: { [guessesCount]: 1 }
        };
      } else {
        currentData.totalPlayers = (currentData.totalPlayers || 0) + 1;
        currentData.totalWins = (currentData.totalWins || 0) + 1;
        if (!currentData.guessDistribution) currentData.guessDistribution = {};
        currentData.guessDistribution[guessesCount] = (currentData.guessDistribution[guessesCount] || 0) + 1;
      }
      return currentData;
    });
  } catch (err) {
    console.warn("Firebase Community Stats error (Offline/Dev mode):", err);
  }
};

export const subscribeCommunityStats = (
  dateStr: string,
  animeSlug: string,
  callback: (stats: CommunityDayStats | null) => void
) => {
  const statsRef = ref(rtdb, `community_stats/${dateStr}/${animeSlug}`);
  return onValue(statsRef, (snapshot) => {
    if (snapshot.exists()) {
      callback(snapshot.val());
    } else {
      callback(null);
    }
  });
};

// -------------------------------------------------------------
// 2. DESAFIO X1 MULTIPLAYER LINK (Realtime Database)
// -------------------------------------------------------------
export const createX1Challenge = async (
  creatorName: string,
  animeSlug: string,
  targetCharacterId: string,
  creatorGuessesCount: number
): Promise<string> => {
  const challengeId = Math.random().toString(36).substring(2, 9) + Date.now().toString(36).substring(4);
  const user = auth.currentUser;
  const creatorId = user ? user.uid : 'anon-' + Math.random().toString(36).substring(2, 7);

  const challengeData: ChallengeSession = {
    id: challengeId,
    creatorId,
    creatorName: creatorName || 'Desafiante',
    animeSlug,
    targetCharacterId,
    creatorGuessesCount,
    createdAt: Date.now()
  };

  try {
    await set(ref(rtdb, `challenges/${challengeId}`), challengeData);
  } catch (err) {
    console.warn("Firebase Challenge creation fallback:", err);
  }

  return challengeId;
};

export const getX1Challenge = async (challengeId: string): Promise<ChallengeSession | null> => {
  try {
    const snapshot = await get(child(ref(rtdb), `challenges/${challengeId}`));
    if (snapshot.exists()) {
      return snapshot.val() as ChallengeSession;
    }
  } catch (err) {
    console.warn("Firebase get Challenge error:", err);
  }
  return null;
};

export const submitX1ChallengeResult = async (
  challengeId: string,
  playerName: string,
  guessesCount: number
) => {
  try {
    const user = auth.currentUser;
    const userId = user ? user.uid : 'anon-' + Math.random().toString(36).substring(2, 7);
    const playerRef = ref(rtdb, `challenges/${challengeId}/players/${userId}`);
    await set(playerRef, {
      name: playerName || 'Adversário',
      guessesCount,
      completedAt: Date.now()
    });
  } catch (err) {
    console.warn("Firebase submit Challenge result error:", err);
  }
};

// -------------------------------------------------------------
// 3. SEGURANÇA E HASH ANTIFRAUDE (SHA-256)
// -------------------------------------------------------------
export const generateSecureHash = async (text: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(text + "_animedle_salt_2026");
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};
