interface TableProps {
  title: string;
  columns: { title: string; key: string }[];
  data: Record<string, string>[];
}

const Table = ({ title, columns, data }: TableProps) => {
  return (
    <div>
      <h2 className="josefin-sans text-xl mb-4 text-[#585858]">{title}</h2>
      <table className="w-full bg-[#F7F7F7] shadow-md rounded-lg">
        <thead className="josefin-sans font-light text-left bg-[#EBEBEB]">
          <tr>
            {columns.map((col) => (
              <th key={col.key as string} className="p-4 border-b font-medium">
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} className="josefin-sans">
              {columns.map((col) => (
                <td key={col.key as string} className="p-4 border-b font-light">
                  {row[col.key] as string}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
