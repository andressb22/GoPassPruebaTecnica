import { useState } from "react";
import type { optionType } from "../../components/Select";

interface InputHandlerType {
  type: string;
}

export const useSelectHandler = ({ type }: InputHandlerType) => {
  const [data, setData] = useState<optionType[]>([]);
  const [error, setError] = useState("");

  const changeItem = (item: optionType) => {
    setData([item]);
  };

  const addItem = (option: optionType) => {
    console.log(option);
    setData((prev) => {
      // Si ya está seleccionada, la quitamos; si no, la agregamos
      return prev.some((item) => item.id === option.id)
        ? prev.filter((item) => item.id !== option.id)
        : [...prev, option];
    });
  };

  const clearSelect = () => setData([])

  return {
    changeItem,
    data,
    setError,
    error,
    addItem,
    type,
    clearSelect
  };
};
