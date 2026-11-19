import { firebaseConfig } from './firebase-config.js';

let app = null;
let auth = null;
let db = null;
let currentUid = null;
let isConfigured = false;

let initializeApp, getAuth, signInAnonymously, getFirestore, collection, doc, setDoc, getDocs, query, orderBy, limit;

async function loadFirebaseSdk() {
  if (firebaseConfig.apiKey === 'YOUR_API_KEY' || !firebaseConfig.apiKey) {
    return false;
  }

  try {
    const appModule = await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js');
    const authModule = await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js');
    const firestoreModule = await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js');

    initializeApp = appModule.initializeApp;
    getAuth = authModule.getAuth;
    signInAnonymously = authModule.signInAnonymously;
    getFirestore = firestoreModule.getFirestore;
    collection = firestoreModule.collection;
    doc = firestoreModule.doc;
    setDoc = firestoreModule.setDoc;
    getDocs = firestoreModule.getDocs;
    query = firestoreModule.query;
    orderBy = firestoreModule.orderBy;
    limit = firestoreModule.limit;

    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    isConfigured = true;
    return true;
  } catch (err) {
    console.warn('Firebase SDK load notice:', err.message);
    return false;
  }
}

export async function initFirebaseAuth() {
  const ready = await loadFirebaseSdk();
  if (ready && auth) {
    try {
      const cred = await signInAnonymously(auth);
      currentUid = cred.user.uid;
      localStorage.setItem('phantom_firebase_uid', currentUid);
      return currentUid;
    } catch (err) {
      console.warn('Firebase anonymous auth failed:', err.message);
    }
  }

  let localUid = localStorage.getItem('phantom_firebase_uid');
  if (!localUid) {
    localUid = 'local_' + Math.random().toString(36).slice(2, 10);
    localStorage.setItem('phantom_firebase_uid', localUid);
  }
  currentUid = localUid;
  return currentUid;
}

export function getCurrentUid() {
  return currentUid || localStorage.getItem('phantom_firebase_uid') || 'local_guest';
}

export async function syncLeaderboardProfile(username, points, rank, discoveredSecrets = []) {
  const uid = getCurrentUid();
  const payload = {
    uid,
    username: username || 'Developer',
    points: Math.min(30, Math.max(0, points || 0)),
    rank: rank || 'EXPLORER',
    discoveredSecrets: Array.from(discoveredSecrets || []),
    updatedAt: new Date().toISOString()
  };

  localStorage.setItem('phantom_local_profile', JSON.stringify(payload));

  if (isConfigured && db) {
    try {
      const userRef = doc(db, 'leaderboard', uid);
      await setDoc(userRef, payload, { merge: true });
    } catch (err) {
      console.warn('Firestore sync notice:', err.message);
    }
  }
}

export async function getGlobalLeaderboard() {
  if (isConfigured && db) {
    try {
      const q = query(collection(db, 'leaderboard'), orderBy('points', 'desc'), orderBy('updatedAt', 'asc'), limit(50));
      const snapshot = await getDocs(q);
      const rows = [];
      snapshot.forEach(docSnap => {
        rows.push(docSnap.data());
      });
      if (rows.length > 0) return rows;
    } catch (err) {
      console.warn('Firestore fetch notice:', err.message);
    }
  }

  const raw = localStorage.getItem('phantom_local_profile');
  if (raw) {
    try {
      const profile = JSON.parse(raw);
      return [profile];
    } catch (_) {}
  }
  return [];
}
