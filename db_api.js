import db from './db.json';

export function index(type) {
    return db[type];
  }
  
  export function get(type, id) {
    return db[type].find(
      (item) => item.id === id
    );
  }