import React, { useEffect } from "react";
import { useState } from "react";
import { FC } from "react";

interface ContextValue {
    message: string;
    isVisible: boolean;
    setSnackbar: (message: string, isVisible: boolean) => void;
}

export const snackbarContext = React.createContext<ContextValue>({} as ContextValue);

const SnackbarProvider: FC = (props) => {
    const [mes, setMes] = useState<string>();
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const setSnackbar = (message: string, isVisible: boolean) => {
        setMes(message);
        setIsVisible(isVisible);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setSnackbar("", false);
        }, 2500);
        return () => clearTimeout(timer);
    }, [isVisible]);

    return (
        <snackbarContext.Provider
            value={{
                message: mes as string,
                isVisible: isVisible,
                setSnackbar: setSnackbar,
            }}
        >
            {props.children}
        </snackbarContext.Provider>
    );
};

export default SnackbarProvider;
