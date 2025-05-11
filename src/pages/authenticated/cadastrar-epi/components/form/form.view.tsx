import { EPI_SIZES } from "../../../../../apiMock/epis";
import { FORM_EPI_INPUTS } from "./data";

export function FormView() {
  return (
    <form className="flex border-t border-gray-300 p-3 gap-2">
      {FORM_EPI_INPUTS.map((subTitulo, id) => {
        return (
          <input
            key={id}
            placeholder={subTitulo.placeholder}
            type={subTitulo.type}
            name={subTitulo.name}
            id={subTitulo.id}
            className="bg-white px-3 rounded-md border border-blue-400 w-full"
          />
        );
      })}
      <select className="bg-white px-3 rounded-md border border-blue-400 w-full">
        {EPI_SIZES.map((selecao, id) => {
          return (
            <option key={id} value="">
              {selecao.option}
            </option>
          );
        })}
      </select>
    </form>
  );
}
