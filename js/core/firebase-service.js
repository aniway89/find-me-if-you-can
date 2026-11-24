import { firebaseConfig } from './firebase-config.js';
import { getRankInfo } from '../engine/ranking.js';

let app = null;
let auth = null;
let db = null;
let currentUid = null;
let isConfigured = false;
let initPromise = null;
let authErrorMessage = null;

let initializeApp, getAuth, signInAnonymously, onAuthStateChanged;
let getFirestore, collection, doc, getDoc, setDoc, updateDoc, getDocs, query, orderBy, limit, runTransaction, onSnapshot, getCountFromServer;

export function getAuthErrorMessage() {
  return authErrorMessage;
}

export function isFirebaseConfigured() {
  return Boolean(firebaseConfig.apiKey && firebaseConfig.apiKey !== 'YOUR_API_KEY');
}

export async function initFirebase() {
  if (initPromise) return initPromise;

  initPromise = (async () => {
    if (!isFirebaseConfigured()) {
      let localUid = localStorage.getItem('phantom_firebase_uid');
      if (!localUid) {
        localUid = 'local_' + Math.random().toString(36).slice(2, 11);
        localStorage.setItem('phantom_firebase_uid', localUid);
      }
      currentUid = localUid;
      return { configured: false, uid: currentUid };
    }

    try {
      const [appMod, authMod, fsMod] = await Promise.all([
        import('https://www.gstatic.com/firebasejs/13.4.0/firebase-app.js'),
        import('https://www.gstatic.com/firebasejs/13.4.0/firebase-auth.js'),
        import('https://www.gstatic.com/firebasejs/13.4.0/firebase-firestore.js')
      ]);

      initializeApp = appMod.initializeApp;
      getAuth = authMod.getAuth;
      signInAnonymously = authMod.signInAnonymously;
      onAuthStateChanged = authMod.onAuthStateChanged;

      getFirestore = fsMod.getFirestore;
      collection = fsMod.collection;
      doc = fsMod.doc;
      getDoc = fsMod.getDoc;
      setDoc = fsMod.setDoc;
      updateDoc = fsMod.updateDoc;
      getDocs = fsMod.getDocs;
      query = fsMod.query;
      orderBy = fsMod.orderBy;
      limit = fsMod.limit;
      runTransaction = fsMod.runTransaction;
      onSnapshot = fsMod.onSnapshot;
      getCountFromServer = fsMod.getCountFromServer;

      app = initializeApp(firebaseConfig);
      auth = getAuth(app);
      db = getFirestore(app);
      isConfigured = true;

      const user = await new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, async (u) => {
          unsubscribe();
          if (u) {
            resolve(u);
          } else {
            try {
              const cred = await signInAnonymously(auth);
              resolve(cred.user);
            } catch (err) {
              console.warn('[Firebase Auth] Anonymous sign-in error:', err);
              if (err?.code === 'auth/configuration-not-found') {
                authErrorMessage = 'Anonymous Authentication is disabled in Firebase Console. Enable it in Authentication -> Sign-in method.';
              } else {
                authErrorMessage = err.message || 'Firebase Auth error';
              }
              resolve(null);
            }
          }
        });
      });

      if (user) {
        currentUid = user.uid;
        localStorage.setItem('phantom_firebase_uid', currentUid);
      } else {
        currentUid = localStorage.getItem('phantom_firebase_uid') || 'local_' + Math.random().toString(36).slice(2, 10);
      }

      return { configured: true, uid: currentUid };
    } catch (err) {
      console.warn('[Firebase] Initialization error:', err);
      isConfigured = false;
      currentUid = localStorage.getItem('phantom_firebase_uid') || 'local_' + Math.random().toString(36).slice(2, 10);
      return { configured: false, uid: currentUid };
    }
  })();

  return initPromise;
}

export function getCurrentUid() {
  return currentUid || localStorage.getItem('phantom_firebase_uid') || 'local_guest';
}

export function validateUsernameFormat(username) {
  if (!username || typeof username !== 'string') {
    return { valid: false, error: 'Username is required.' };
  }
  const clean = username.trim();
  if (clean.length < 3 || clean.length > 16) {
    return { valid: false, error: 'Username must be between 3 and 16 characters.' };
  }
  if (!/^[a-zA-Z0-9_]{3,16}$/.test(clean)) {
    return { valid: false, error: 'Only letters, numbers, and underscores are allowed.' };
  }
  return { valid: true, clean };
}

export async function checkUsernameAvailable(username) {
  const validation = validateUsernameFormat(username);
  if (!validation.valid) {
    return { available: false, error: validation.error };
  }

  const usernameLower = validation.clean.toLowerCase();

  await initFirebase();

  if (isConfigured && db) {
    try {
      const unameDocRef = doc(db, 'usernames', usernameLower);
      const snap = await getDoc(unameDocRef);
      if (snap.exists()) {
        const data = snap.data();
        if (data.uid === currentUid) {
          return { available: true, clean: validation.clean };
        }
        return { available: false, error: 'Username is already taken. Please choose another.' };
      }
      return { available: true, clean: validation.clean };
    } catch (err) {
      console.warn('[Firestore] Username check error:', err);
      return { available: true, clean: validation.clean };
    }
  }

  try {
    const rawClaimed = localStorage.getItem('phantom_claimed_usernames');
    const claimed = rawClaimed ? JSON.parse(rawClaimed) : {};
    if (claimed[usernameLower] && claimed[usernameLower] !== currentUid) {
      return { available: false, error: 'Username is already taken in this browser.' };
    }
  } catch (_) {}

  return { available: true, clean: validation.clean };
}

export async function registerPlayer(rawUsername, currentScore = 0, currentSecrets = []) {
  const val = validateUsernameFormat(rawUsername);
  if (!val.valid) {
    throw new Error(val.error);
  }

  const username = val.clean;
  const usernameLower = username.toLowerCase();
  const uid = getCurrentUid();
  const rank = getRankInfo(currentScore).name;
  const now = new Date().toISOString();

  const profile = {
    uid,
    username,
    usernameLowercase: usernameLower,
    score: Math.min(30, Math.max(0, currentScore || 0)),
    rank,
    discoveredSecrets: Array.from(currentSecrets || []),
    createdAt: now,
    updatedAt: now
  };

  await initFirebase();

  if (isConfigured && db) {
    if (auth && !auth.currentUser) {
      try {
        const cred = await signInAnonymously(auth);
        currentUid = cred.user.uid;
        profile.uid = currentUid;
        localStorage.setItem('phantom_firebase_uid', currentUid);
      } catch (authErr) {
        if (authErr?.code === 'auth/configuration-not-found') {
          throw new Error('Anonymous Authentication is disabled in Firebase Console. Please enable it under Authentication -> Sign-in method.');
        }
        throw new Error('Firebase Authentication failed: ' + (authErr.message || authErr.code));
      }
    }

    try {
      await runTransaction(db, async (transaction) => {
        const activeUid = currentUid || uid;
        const unameRef = doc(db, 'usernames', usernameLower);
        const playerRef = doc(db, 'players', activeUid);

        const unameSnap = await transaction.get(unameRef);
        if (unameSnap.exists()) {
          const existingData = unameSnap.data();
          if (existingData.uid !== activeUid) {
            throw new Error('Username already taken. Please choose another.');
          }
        }

        profile.uid = activeUid;
        transaction.set(unameRef, { uid: activeUid, username, createdAt: now });
        transaction.set(playerRef, profile);
      });
    } catch (txErr) {
      if (txErr?.code === 'permission-denied') {
        throw new Error('Firestore permission denied (403). Ensure Anonymous Authentication is enabled and firestore.rules is published in Firebase Console.');
      }
      throw txErr;
    }
  }

  try {
    const rawClaimed = localStorage.getItem('phantom_claimed_usernames');
    const claimed = rawClaimed ? JSON.parse(rawClaimed) : {};
    claimed[usernameLower] = uid;
    localStorage.setItem('phantom_claimed_usernames', JSON.stringify(claimed));
    localStorage.setItem('phantom_local_profile', JSON.stringify(profile));
    localStorage.setItem('phantom_username', username);
  } catch (_) {}

  return profile;
}

export async function fetchCurrentPlayerProfile() {
  await initFirebase();
  const uid = getCurrentUid();

  if (isConfigured && db) {
    try {
      const playerDoc = await getDoc(doc(db, 'players', uid));
      if (playerDoc.exists()) {
        const data = playerDoc.data();
        localStorage.setItem('phantom_local_profile', JSON.stringify(data));
        localStorage.setItem('phantom_username', data.username);
        return data;
      }
    } catch (err) {
      console.warn('[Firestore] Profile fetch error:', err);
    }
  }

  const raw = localStorage.getItem('phantom_local_profile');
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch (_) {}
  }
  return null;
}

export async function syncLeaderboardProfile(username, points, rank, discoveredSecrets = []) {
  const uid = getCurrentUid();
  if (!username) return;

  const score = Math.min(30, Math.max(0, points || 0));
  const rName = rank || getRankInfo(score).name;
  const now = new Date().toISOString();

  let profile = {
    uid,
    username,
    usernameLowercase: username.toLowerCase(),
    score,
    rank: rName,
    discoveredSecrets: Array.from(discoveredSecrets || []),
    updatedAt: now
  };

  const rawOld = localStorage.getItem('phantom_local_profile');
  if (rawOld) {
    try {
      const parsed = JSON.parse(rawOld);
      profile.createdAt = parsed.createdAt || now;
    } catch (_) {
      profile.createdAt = now;
    }
  } else {
    profile.createdAt = now;
  }

  localStorage.setItem('phantom_local_profile', JSON.stringify(profile));

  if (isConfigured && db) {
    try {
      const playerRef = doc(db, 'players', uid);
      await setDoc(playerRef, {
        score,
        rank: rName,
        discoveredSecrets: profile.discoveredSecrets,
        updatedAt: now
      }, { merge: true });
    } catch (err) {
      console.warn('[Firestore] Score sync notice:', err.message);
    }
  }
}

export async function getGlobalLeaderboard(limitCount = 50) {
  await initFirebase();

  if (isConfigured && db) {
    try {
      // Query by score desc. Single-field indexes are automatic in Firestore.
      // This avoids requiring a manual composite index in Firebase Console.
      const q = query(
        collection(db, 'players'),
        orderBy('score', 'desc'),
        limit(limitCount)
      );
      const snapshot = await getDocs(q);
      const rows = [];
      snapshot.forEach(docSnap => rows.push(docSnap.data()));

      // Apply tie-breaker in memory: earliest achievement of equal scores
      rows.sort((a, b) => {
        if ((b.score || 0) !== (a.score || 0)) {
          return (b.score || 0) - (a.score || 0);
        }
        return (a.updatedAt || '').localeCompare(b.updatedAt || '');
      });

      let totalCount = rows.length;
      try {
        const countSnap = await getCountFromServer(collection(db, 'players'));
        totalCount = countSnap.data().count;
      } catch (_) {}

      return { rows, totalCount, isConfigured: true };
    } catch (err) {
      console.warn('[Firestore] Leaderboard query notice:', err.message);
      throw err;
    }
  }

  const raw = localStorage.getItem('phantom_local_profile');
  const rows = [];
  if (raw) {
    try {
      rows.push(JSON.parse(raw));
    } catch (_) {}
  }
  return { rows, totalCount: rows.length, isConfigured: false };
}

export function subscribeToLeaderboard(onSuccess, onError, limitCount = 50) {
  if (!isConfigured || !db) {
    getGlobalLeaderboard(limitCount)
      .then(data => onSuccess(data))
      .catch(err => onError(err));
    return () => {};
  }

  try {
    // Single-field ordering by score desc works immediately without requiring composite indexes
    const q = query(
      collection(db, 'players'),
      orderBy('score', 'desc'),
      limit(limitCount)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const rows = [];
      snapshot.forEach(docSnap => rows.push(docSnap.data()));
      // Sort ties in memory: highest score first, earliest achievement for equal scores
      rows.sort((a, b) => {
        if ((b.score || 0) !== (a.score || 0)) {
          return (b.score || 0) - (a.score || 0);
        }
        return (a.updatedAt || '').localeCompare(b.updatedAt || '');
      });
      onSuccess({ rows, totalCount: rows.length, isConfigured: true });
    }, (err) => {
      console.warn('[Firestore] Leaderboard snapshot error:', err);
      if (onError) onError(err);
    });

    return unsubscribe;
  } catch (err) {
    if (onError) onError(err);
    return () => {};
  }
}
