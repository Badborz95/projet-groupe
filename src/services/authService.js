import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, db } from '../firebase';
import { setDoc, doc } from 'firebase/firestore';

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);

  const user = result.user;

  // Création ou mise à jour du document utilisateur
  await setDoc(doc(db, 'users', user.uid), {
    email: user.email,
    displayName: user.displayName,
    createdAt: new Date()
  }, { merge: true });

  return user;
}
export async function signOut() {
  await auth.signOut();
}