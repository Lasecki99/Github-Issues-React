import { InputHTMLAttributes } from "react";
import styles from "./SearchInput.module.css";

const SearchInput = ({
  placeholder,
  ...rest
}: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input placeholder={placeholder} className={styles.searchInput} {...rest} />
  );
};

export default SearchInput;
