import { db } from '../firebase';
import { collection, addDoc, getDocs, orderBy, query } from 'firebase/firestore';

export async function addGame(gameData) {
  const docRef = await addDoc(collection(db, 'games'), gameData);
  return docRef.id;
}

export async function fetchGames() {
  const q = query(collection(db, 'games'), orderBy('title'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
