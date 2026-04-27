import { useState } from "react";
import { validateInput } from "../../utilities/validateInputs";

interface InputHandlerType {
  type: string;
  required: boolean;
  defaultText?: string;
}

export const useInputHandler = ({
  type,
  required,
  defaultText,
}: InputHandlerType) => {
  const [text, setText] = useState(defaultText ?? "");
  const [error, setError] = useState("");

  const handleChange = (textInput: string) => {
    setText(textInput);
  };

  const handleBlur = () => {
    if (required) {
      const { isValidInput, msg } = validateInput(type, text);
      if (!isValidInput) {
        setError(msg);
      }
    }
  };

  const handleFocus = () => {
    setError("");
  };

  return {
    handleChange,
    handleBlur,
    handleFocus,
    text,
    setError,
    error,
    type,
  };
};
