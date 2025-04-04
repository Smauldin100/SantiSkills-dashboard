import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

let db = null;

export const initDatabase = async () => {
  if (!db) {
    db = await open({
      filename: './santiskills.db',
      driver: sqlite3.Database
    });

    // Create tables if they don't exist
    await db.exec(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        completed BOOLEAN DEFAULT 0,
        priority TEXT DEFAULT 'medium',
        category TEXT DEFAULT 'work',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT,
        date DATETIME NOT NULL,
        notify BOOLEAN DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS notifications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT NOT NULL,
        title TEXT NOT NULL,
        message TEXT,
        read BOOLEAN DEFAULT 0,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS settings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        key TEXT UNIQUE NOT NULL,
        value TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS files (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        path TEXT NOT NULL,
        type TEXT NOT NULL,
        size INTEGER NOT NULL,
        uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);
  }
  return db;
};

// Tasks
export const getTasks = async () => {
  const db = await initDatabase();
  return db.all('SELECT * FROM tasks ORDER BY created_at DESC');
};

export const addTask = async (task) => {
  const db = await initDatabase();
  const { title, description, priority, category } = task;
  const result = await db.run(
    'INSERT INTO tasks (title, description, priority, category) VALUES (?, ?, ?, ?)',
    [title, description, priority, category]
  );
  return result.lastID;
};

export const updateTask = async (id, task) => {
  const db = await initDatabase();
  const { title, description, completed, priority, category } = task;
  await db.run(
    'UPDATE tasks SET title = ?, description = ?, completed = ?, priority = ?, category = ? WHERE id = ?',
    [title, description, completed, priority, category, id]
  );
};

export const deleteTask = async (id) => {
  const db = await initDatabase();
  await db.run('DELETE FROM tasks WHERE id = ?', [id]);
};

// Notes
export const getNotes = async () => {
  const db = await initDatabase();
  return db.all('SELECT * FROM notes ORDER BY date DESC');
};

export const addNote = async (note) => {
  const db = await initDatabase();
  const { title, content, date, notify } = note;
  const result = await db.run(
    'INSERT INTO notes (title, content, date, notify) VALUES (?, ?, ?, ?)',
    [title, content, date, notify]
  );
  return result.lastID;
};

export const updateNote = async (id, note) => {
  const db = await initDatabase();
  const { title, content, date, notify } = note;
  await db.run(
    'UPDATE notes SET title = ?, content = ?, date = ?, notify = ? WHERE id = ?',
    [title, content, date, notify, id]
  );
};

export const deleteNote = async (id) => {
  const db = await initDatabase();
  await db.run('DELETE FROM notes WHERE id = ?', [id]);
};

// Notifications
export const getNotifications = async () => {
  const db = await initDatabase();
  return db.all('SELECT * FROM notifications ORDER BY timestamp DESC');
};

export const addNotification = async (notification) => {
  const db = await initDatabase();
  const { type, title, message } = notification;
  const result = await db.run(
    'INSERT INTO notifications (type, title, message) VALUES (?, ?, ?)',
    [type, title, message]
  );
  return result.lastID;
};

export const markNotificationAsRead = async (id) => {
  const db = await initDatabase();
  await db.run('UPDATE notifications SET read = 1 WHERE id = ?', [id]);
};

export const deleteNotification = async (id) => {
  const db = await initDatabase();
  await db.run('DELETE FROM notifications WHERE id = ?', [id]);
};

// Settings
export const getSetting = async (key) => {
  const db = await initDatabase();
  const result = await db.get('SELECT value FROM settings WHERE key = ?', [key]);
  return result ? result.value : null;
};

export const setSetting = async (key, value) => {
  const db = await initDatabase();
  await db.run(
    'INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)',
    [key, value]
  );
};

// Files
export const addFile = async (file) => {
  const db = await initDatabase();
  const { name, path, type, size } = file;
  const result = await db.run(
    'INSERT INTO files (name, path, type, size) VALUES (?, ?, ?, ?)',
    [name, path, type, size]
  );
  return result.lastID;
};

export const getFiles = async () => {
  const db = await initDatabase();
  return db.all('SELECT * FROM files ORDER BY uploaded_at DESC');
};

export const deleteFile = async (id) => {
  const db = await initDatabase();
  await db.run('DELETE FROM files WHERE id = ?', [id]);
}; 