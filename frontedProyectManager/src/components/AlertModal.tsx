import styles from "./styles/ConfirmModal.module.css";
type Props = {
    message: string;
    onClose: () => void;
};

export const AlertModal = ({ message, onClose }: Props) => {
    return (
        <div className={styles.container}>
            <div className={styles.modal}>
                <p className={styles.message}>{message}</p>
                <button className={styles.confirmButton} onClick={onClose}>
                    Aceptar
                </button>
            </div>
        </div>
    );
};