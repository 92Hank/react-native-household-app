import React from "react";

type PreferencesContextType = {
    theme: "light" | "dark";
    toggleTheme: () => void;
};

export const PreferencesContext = React.createContext<PreferencesContextType>({
    theme: "light",
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    toggleTheme: () => {},
});
