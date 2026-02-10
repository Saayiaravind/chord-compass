export default function Table({ columns, data, renderRow, className = '' }) {
  return (
    <div className={`overflow-x-auto rounded-2xl border border-neutral-200 ${className}`}>
      <table className="w-full">
        <thead>
          <tr className="bg-primary-50">
            {columns.map((col, i) => (
              <th
                key={i}
                className="px-4 py-3 text-left font-heading font-semibold text-primary-900 text-sm"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr
              key={item.id || i}
              className="border-t border-neutral-100 even:bg-neutral-50 hover:bg-primary-50/50 transition-colors"
            >
              {renderRow(item, i)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
