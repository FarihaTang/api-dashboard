import React from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

const SearchInput = React.memo(
  function SearchInput({ value,
    onChange,
    placeholder = "Search...",
    className = "", }: Props) {
    return (
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={
          "border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 " +
          className
        }
      />
    );
  }
)

export default SearchInput