import { useState } from "react";
import { AlertModal } from "../components/AlertModal";
import { createContext } from "react";

type AlertType = {
    showAlert: (message: string) => void;
};

export const AlertContext = createContext<AlertType | null>(null);

export const AlertProvider = ({ children }: any) => {
    const [state, setState] = useState({
        isOpen: false,
        message: "",
    });

    const showAlert = (message: string) => {
        setState({
            isOpen: true,
            message,
        });
    };

    const handleClose = () => {
        setState({
            isOpen: false,
            message: "",
        });
    };

    return (
        <AlertContext.Provider value={{ showAlert }}>
            {children}

            {state.isOpen && (
                <AlertModal message={state.message} onClose={handleClose} />
            )}
        </AlertContext.Provider>
    );
};