import { useState, useEffect } from "react";

const checkShemePreference = () => {
    if (process.browser) {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)")
            .matches;

        return prefersDark ? "dark" : "light";
    }
};

export const useTheme = () => {
    const [theme, _setTheme] = useState(() => {
        if (process.browser) {
            try {
                const theme = window.localStorage.getItem("darkMode");
                return theme !== null
                    ? JSON.parse(theme)
                    : checkShemePreference(); // <-- LocalStorage can only save data as plain text
            } catch {
                return checkShemePreference();
            }
        } else {
            return "light";
        }
    });

    const setTheme = value => {
        try {
            window.localStorage.setItem("darkMode", JSON.stringify(value));
            _setTheme(value);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        document.body.dataset.theme = theme;
    }, [theme]);

    return [theme, setTheme];
};
