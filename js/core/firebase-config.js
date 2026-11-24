/**
 * Firebase Project Configuration
 * 
 * To obtain your configuration:
 * 1. Open the Firebase Console at https://console.firebase.google.com
 * 2. Select or create your Firebase project.
 * 3. In Project Settings (gear icon) -> General, scroll to "Your apps".
 * 4. Add or select a Web App (</>) to view your firebaseConfig object.
 * 5. Enable Anonymous Authentication in Build -> Authentication -> Sign-in method.
 * 6. Create a Cloud Firestore database in Build -> Firestore Database (in production mode).
 * 7. Replace the placeholder values below with your credentials.
 */

export const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
