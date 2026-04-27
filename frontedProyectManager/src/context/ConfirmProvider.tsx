import { useState } from "react";
import { ConfirmModal } from "./../components/ConfrimModal";
import { createContext } from "react";

export const ConfirmContext = createContext(null);

export const ConfirmProvider = ({ children }: any) => {
    const [state, setState] = useState({
        isOpen: false,
        message: "",
        resolve: null as null | ((value: boolean) => void),
    });

    const showConfirm = (message: string) => {
        return new Promise<boolean>((resolve) => {
            setState({
                isOpen: true,
                message,
                resolve,
            });
        });
    };

    const handleConfirm = () => {
        state.resolve?.(true);
        setState({ isOpen: false, message: "", resolve: null });
    };

    const handleCancel = () => {
        state.resolve?.(false);
        setState({ isOpen: false, message: "", resolve: null });
    };

    return (
        <ConfirmContext.Provider value={{ showConfirm }}>
            {children}

            {state.isOpen && (
                <ConfirmModal
                    message={state.message}
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                />
            )}
        </ConfirmContext.Provider>
    );
};