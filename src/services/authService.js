import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';

import { auth, db } from '../firebase';
import { setDoc, doc } from 'firebase/firestore';

// ✅ INSCRIPTION avec email/mot de passe
export async function signUp(email, password) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

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

  await setDoc(doc(db, 'users', user.uid), {
    email: user.email,
    displayName: user.displayName,
    createdAt: new Date()
  }, { merge: true });

  return user;
}

// ✅ DÉCONNEXION
export async function signOut() {
  await firebaseSignOut(auth);
}
