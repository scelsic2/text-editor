// Activity 19.23
import { openDB } from 'idb';

const initdb = async () =>
// rules for creating the database
// creates a database jate that has a store jate. a store is like a table
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // To get started, I have to init the db, like use in mysql
  const db = await initdb();
  // PUT requires both read and write
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  // To the store (table), i'm adding an object of content
  const id = await store.add({ content });
  console.log('Content added.')
  console.error('putDb not implemented'); 
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  // I have to call the database again, just like with mysql or local storage
  const db = await initdb();
  // GET route is read-only
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  // I need to get all the content from my store (table) jate.
  const allContent = await store.getAll();
  console.log('All content loaded.')
  console.error('getDb not implemented'); 
  // Now I need to return the content I grabbed.
  return allContent
}

initdb();
