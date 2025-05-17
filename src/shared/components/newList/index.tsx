interface INewList {
  colunasLista: string[];
  itensLista: React.ReactNode[];
}

export default function NewList({ colunasLista, itensLista }: INewList) {
  return (
    <div className="max-h-80 overflow-y-auto">
      <table className="w-full divide-y-2 divide-gray-300 ">
        <thead className="bg-blue-50 font-bold sticky top-0">
          <tr>
            {colunasLista.map((coluna) => {
              return <td className="px-3 py-1">{coluna}</td>;
            })}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-300 ">{itensLista}</tbody>
      </table>
    </div>
  );
}