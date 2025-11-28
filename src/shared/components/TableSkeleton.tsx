function TableSkeleton({ columns = 4, rows = 8 }: { columns?: number, rows?: number }) {
  return (
    <div className="border rounded-md overflow-hidden">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {Array.from({ length: columns }).map((_, i) => (
              <th key={i} className="px-4 py-3 bg-gray-100"></th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, rowIdx) => (
            <tr key={rowIdx} className="border-b last:border-0">
              {Array.from({ length: columns }).map((__, colIdx) => (
                <td key={colIdx} className="p-3">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default TableSkeleton