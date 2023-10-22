"use client"

import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

const getFromLocalStorage = () => {
    // At the beginning, even client-side component will be server-side.
    // Once the transition to client-side happens, we will get the value from localStorage.
    if(typeof window !== "undefined") {
        const value = localStorage.getItem("theme");
        return value || "light";
    }
}

export const ThemeContextProvider = ({children}) => {
    const [theme, setTheme] = useState(() => {
        return getFromLocalStorage();
    });

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    }

    useEffect(() => {
        localStorage.setItem("theme", theme);
    }, [theme])

    return <ThemeContext.Provider value={{theme, toggleTheme}}>
        {children}
    </ThemeContext.Provider>
}