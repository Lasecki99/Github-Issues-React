import { InputHTMLAttributes } from "react";
import styles from "./SearchInput.module.css";

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onInputChange: (value: string) => void;
}

const SearchInput = ({ onInputChange, ...props }: SearchInputProps) => {
  return (
    <input
      className={styles.searchInput}
      {...props}
      onChange={(e) => onInputChange(e.target.value)}
    />
  );
};

export default SearchInput;
