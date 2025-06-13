// authService.js
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail as firebaseSendPasswordResetEmail // Importez cette fonction
} from 'firebase/auth';

import { auth, db } from '../firebase'; // Assurez-vous que le chemin vers votre config Firebase est correct
import { setDoc, doc } from 'firebase/firestore';

// ✅ INSCRIPTION avec email/mot de passe
export async function signUp(email, password) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Enregistrez les informations de base de l'utilisateur dans Firestore
  await setDoc(doc(db, 'users', user.uid), {
    email: user.email,
    createdAt: new Date()
  });

  return user;
}

// ✅ CONNEXION avec email/mot de passe
export async function signIn(email, password) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

// ✅ CONNEXION avec Google
export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);

  const user = result.user;

  // Enregistrez ou mettez à jour les informations de l'utilisateur dans Firestore après la connexion Google
  await setDoc(doc(db, 'users', user.uid), {
    email: user.email,
    displayName: user.displayName,
    createdAt: new Date()
  }, { merge: true }); // Utilisez merge: true pour ne pas écraser d'autres champs si l'utilisateur existe déjà

  return user;
}

// ✅ DÉCONNEXION
export async function signOut() {
  await firebaseSignOut(auth);
}

// ✅ RÉINITIALISATION DU MOT DE PASSE
export async function sendPasswordResetEmail(email) {
  await firebaseSendPasswordResetEmail(auth, email);
}