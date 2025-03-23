// Function to save data with expiry time (1 day)
const saveToLocalStorage = (key: string, value: string) => {
    const expiryTime = new Date().getTime() + 24 * 60 * 60 * 1000; // 1 day in milliseconds
    const data = { value, expiry: expiryTime };
    localStorage.setItem(key, JSON.stringify(data));
};

// Function to get data and check expiry
const getFromLocalStorage = (key: string) => {
    const dataString = localStorage.getItem(key);
    if (!dataString) return null;

    const data = JSON.parse(dataString);
    if (new Date().getTime() > data.expiry) {
        localStorage.removeItem(key);
        return null;
    }
    return data.value;
};

// Function to remove credentials manually (optional)
const clearCredentials = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
};

export { saveToLocalStorage, getFromLocalStorage, clearCredentials };