import { useState } from "react";
import styles from "./styles/select.module.css";
import { Check } from "lucide-react";

export type optionType = {
  id: string;
  value: string;
};

type SelectProps = {
  label?: string;
  placeholder: string;
  data: optionType[];
  multiple?: boolean;
  handler?: { data: optionType[]; addItem: (item: optionType) => void; changeItem: (item: optionType) => void };
  value?: optionType | optionType[];
  setValue?: (value: optionType | optionType[]) => void;
  error?: string;
};

const Select = ({
  label,
  placeholder = "",
  data = [],
  handler,
  multiple = false,
  value,
  setValue,
  error = "",
}: SelectProps) => {
  const [isOpenOptions, setIsOpenOptions] = useState(false);

  const changeStateOption = () => setIsOpenOptions(!isOpenOptions);

  return (
    <>
      {!handler ? <div className={styles.container}>
        {label && <label>{label}</label>}

        <div onClick={changeStateOption} className={styles.input}>
          {" "}
          {value ? !Array.isArray(value) ? value.value : value[0].value : placeholder}
        </div>
        {error && <span className={styles.error}>{error}</span>}
        {isOpenOptions && (
          <div className={styles.options}>
            {data.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  setValue(item)
                  changeStateOption()
                }
                }
              >
                {item.value}
                {multiple &&
                  handler.data.some((prevItem) => prevItem.id === item.id) && (
                    <Check color="#3E990D" />
                  )}
              </div>
            ))}
          </div>
        )}
      </div > : <div className={styles.container}>
        {label && <label>{label}</label>}

        <div onClick={changeStateOption} className={styles.input}>
          {" "}
          {handler.data.length === 0 ? placeholder : handler.data[0].value}
        </div>
        {error && <span className={styles.error}>{error}</span>}
        {isOpenOptions && (
          <div className={styles.options}>
            {data.map((item) => (
              <div
                key={item.id}
                onClick={() =>
                  multiple ? handler.addItem(item) : handler.changeItem(item)
                }
              >
                {item.value}
                {multiple &&
                  handler.data.some((prevItem) => prevItem.id === item.id) && (
                    <Check color="#3E990D" />
                  )}
              </div>
            ))}
          </div>
        )}
      </div>
      }
    </>

  );
};

export default Select;
