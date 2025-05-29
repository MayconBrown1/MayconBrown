/**
 * Save data to localStorage
 */
export const saveToStorage = (key: string, data: any): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving data to localStorage:', error);
  }
};

/**
 * Load data from localStorage
 */
export const loadFromStorage = (key: string): any => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading data from localStorage:', error);
    return null;
  }
};

/**
 * Check if IndexedDB is available
 */
export const isIndexedDBAvailable = (): boolean => {
  return 'indexedDB' in window;
};

/**
 * Clear all app data from storage
 */
export const clearStorageData = (): void => {
  try {
    localStorage.removeItem('appState');
  } catch (error) {
    console.error('Error clearing storage data:', error);
  }
};