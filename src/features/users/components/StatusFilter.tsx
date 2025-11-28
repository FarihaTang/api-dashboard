import React from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export const StatusFilter = React.memo(function StatusFilter({
  value,
  onChange,
}: Props) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded px-3 py-2"
    >
      <option value="all">All</option>
      <option value="active">Active</option>
      <option value="disabled">Disabled</option>
    </select>
  );
});
