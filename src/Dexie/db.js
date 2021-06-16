import Dexie from 'dexie';

const db = new Dexie('CartItems');
db.version(1).stores({ items: 'id++,name,quantity,price' });

export default db;


