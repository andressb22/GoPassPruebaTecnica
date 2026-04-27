import React from "react";
import styles from "./styles/button.module.css";
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
};

const Button = ({ text, ...buttonProps }: ButtonProps) => {
  return (
    <button className={styles.button} {...buttonProps}>
      {text}
    </button>
  );
};

export default Button;
