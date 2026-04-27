import React from "react";
import styles from "./styles/input.module.css";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error: string;
};

const Input = ({ label, error, ...inputProps }: InputProps) => {
  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      <input className={styles.input} {...inputProps} />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};

export default Input;
