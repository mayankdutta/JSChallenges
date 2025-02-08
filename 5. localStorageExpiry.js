const myLocalStorage = {
  setItem: (key, value, expiry) => {
    window.localStorage.setItem(key, value);
    setTimeout(() => {
      window.localStorage.removeItem(key); 
    }, expiry);
  },

  getItem: (key) => {
    return window.localStorage.getItem(key) || null;
  }
  
};
export default myLocalStorage;

/**
 * method 2
 */

const myLocalStorage = {
  setItem: (key, value, expiry) => {
    window.localStorage.setItem(key, JSON.stringify({ value, expiry: Date.now() + expiry }));
  },

  getItem: (key) => {
    const item = JSON.parse(window.localStorage.getItem(key));
    if (!item || Date.now() > item.expiry) {
      window.localStorage.removeItem(key);
      return null;
    }
    return item.value;
  }
};

export default myLocalStorage;
