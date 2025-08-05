export const KEYS = {
  USER_SESSION: 'user',
};

export const getDataFromLocalStorage = <T>(key: string, defaultValue: T): T => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultValue;
};

export const setDataToLocalStorage = <T>(key: string, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeDataFromLocalStorage = <T>(key: string): void => {
  localStorage.removeItem(key);
};
