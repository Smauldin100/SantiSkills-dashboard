// LocalStorage Service
const LOCAL_STORAGE_KEYS = {
  TASKS: 'dashboard_tasks',
  NOTES: 'dashboard_notes',
  SETTINGS: 'dashboard_settings',
  USER_PROFILE: 'dashboard_user_profile',
  NOTIFICATIONS: 'dashboard_notifications',
  FINANCE_DATA: 'dashboard_finance'
};

export const localStorageService = {
  // Generic methods
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      return false;
    }
  },

  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing from localStorage:', error);
      return false;
    }
  },

  // Specific methods for each data type
  tasks: {
    save: (tasks) => localStorageService.set(LOCAL_STORAGE_KEYS.TASKS, tasks),
    get: () => localStorageService.get(LOCAL_STORAGE_KEYS.TASKS) || [],
    addTask: (task) => {
      const tasks = localStorageService.tasks.get();
      tasks.push(task);
      return localStorageService.tasks.save(tasks);
    },
    updateTask: (taskId, updates) => {
      const tasks = localStorageService.tasks.get();
      const index = tasks.findIndex(t => t.id === taskId);
      if (index !== -1) {
        tasks[index] = { ...tasks[index], ...updates };
        return localStorageService.tasks.save(tasks);
      }
      return false;
    }
  },

  notes: {
    save: (notes) => localStorageService.set(LOCAL_STORAGE_KEYS.NOTES, notes),
    get: () => localStorageService.get(LOCAL_STORAGE_KEYS.NOTES) || [],
    addNote: (note) => {
      const notes = localStorageService.notes.get();
      notes.push(note);
      return localStorageService.notes.save(notes);
    }
  },

  settings: {
    save: (settings) => localStorageService.set(LOCAL_STORAGE_KEYS.SETTINGS, settings),
    get: () => localStorageService.get(LOCAL_STORAGE_KEYS.SETTINGS) || {},
    update: (updates) => {
      const settings = localStorageService.settings.get();
      const newSettings = { ...settings, ...updates };
      return localStorageService.settings.save(newSettings);
    }
  },

  userProfile: {
    save: (profile) => localStorageService.set(LOCAL_STORAGE_KEYS.USER_PROFILE, profile),
    get: () => localStorageService.get(LOCAL_STORAGE_KEYS.USER_PROFILE) || {},
    update: (updates) => {
      const profile = localStorageService.userProfile.get();
      const newProfile = { ...profile, ...updates };
      return localStorageService.userProfile.save(newProfile);
    }
  },

  notifications: {
    save: (notifications) => localStorageService.set(LOCAL_STORAGE_KEYS.NOTIFICATIONS, notifications),
    get: () => localStorageService.get(LOCAL_STORAGE_KEYS.NOTIFICATIONS) || [],
    add: (notification) => {
      const notifications = localStorageService.notifications.get();
      notifications.unshift(notification);
      return localStorageService.notifications.save(notifications);
    },
    markAsRead: (notificationId) => {
      const notifications = localStorageService.notifications.get();
      const index = notifications.findIndex(n => n.id === notificationId);
      if (index !== -1) {
        notifications[index].read = true;
        return localStorageService.notifications.save(notifications);
      }
      return false;
    }
  },

  finance: {
    save: (data) => localStorageService.set(LOCAL_STORAGE_KEYS.FINANCE_DATA, data),
    get: () => localStorageService.get(LOCAL_STORAGE_KEYS.FINANCE_DATA) || { expenses: [], income: [], budget: {} },
    addTransaction: (transaction) => {
      const data = localStorageService.finance.get();
      if (transaction.type === 'expense') {
        data.expenses.push(transaction);
      } else {
        data.income.push(transaction);
      }
      return localStorageService.finance.save(data);
    }
  }
};

export default localStorageService; 