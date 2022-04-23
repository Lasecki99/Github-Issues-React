import { InputHTMLAttributes } from "react";
import styles from "./SearchInput.module.css";

const SearchInput = ({ ...props }: InputHTMLAttributes<HTMLInputElement>) => {
  return <input className={styles.searchInput} {...props} />;
};

export default SearchInput;
