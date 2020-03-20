import { useState } from "react";

export const useLocalStorage = (key, initalValue) => {
    const [storedValue, setValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item !== null ? JSON.parse(item) : initalValue; // <-- LocalStorage can only save data as plain text
        } catch {
            return initalValue;
        }
    });

    const setLocalStorage = value => {
        try {
            window.localStorage.setItem(key, JSON.stringify(value));
            setValue(value);
        } catch (error) {
            console.log(error);
        }
    };

    return [storedValue, setLocalStorage];
};
