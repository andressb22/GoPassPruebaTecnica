import styles from "./styles/ConfirmModal.module.css";
type Props = {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
};

export const ConfirmModal = ({ message, onConfirm, onCancel }: Props) => {
    return (
        <div className={styles.container}>
            <div className={styles.modal}>
                <p>{message}</p>
                <div className={styles.buttons}>
                    <button className={styles.cancelButton} onClick={onCancel}>Cancelar</button>
                    <button className={styles.confirmButton} onClick={onConfirm}>Aceptar</button>
                </div>

            </div>
        </div>
    );
};