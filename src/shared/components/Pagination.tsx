import React from "react";

type Props = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
};

export const Pagination = React.memo(function Pagination({
  page,
  totalPages,
  onChange,
}: Props) {
  if (totalPages <= 1) return null;

  const prev = () => page > 1 && onChange(page - 1);
  const next = () => page < totalPages && onChange(page + 1);

  return (
    <div className="flex items-center space-x-2 mt-4">
      <button
        className="px-3 py-1 rounded border disabled:opacity-40"
        onClick={prev}
        disabled={page === 1}
      >
        Prev
      </button>

      <span className="px-3 py-1">
        Page {page} / {totalPages}
      </span>

      <button
        className="px-3 py-1 rounded border disabled:opacity-40"
        onClick={next}
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
});
