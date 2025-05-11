import Button from "../../../../../shared/components/button";
import type { ListViewProps } from "./list.types";

export function ListView(props: ListViewProps) {
  return (
    <div className="max-h-80 overflow-y-auto">
      <table className="w-full divide-y-2 divide-gray-300 ">
        <thead className="bg-blue-50 font-bold sticky top-0">
          <tr>
            <td className="px-3 py-1">EPI</td>
            <td className="px-3 py-1">Preço</td>
            <td className="px-3 py-1">Tamanho</td>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-300 ">
          {props.data.map((epi) => {
            return (
              <tr key={epi.id} className="">
                <td className="px-3 py-1 ">{epi.nome}</td>
                <td className="px-3 py-1">{epi.preco}</td>
                <td className="px-3 py-1">{epi.tamanho}</td>
                <td className="px-3 py-1">
                  <Button>Editar</Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
