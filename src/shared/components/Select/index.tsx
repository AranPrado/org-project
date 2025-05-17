import type { ComponentProps } from "react";
//import { EPI_SIZES } from "../../../apiMock/epis";

type SelectPros = ComponentProps<"select"> & {
    options: {id: number, option: string }[];
    texto: string
};

export default function Select({options, texto, ...props}: SelectPros) {
  return (
    <select
    {...props}
    //value={epiTamanho}
    className="bg-white px-3 rounded-md border border-blue-400 w-full"
    >
    <option value="">{texto}</option>
    {options.map(({id, option}) => (
        <option key={id} value={option}>
            {option}
        </option>
    ))}
    </select>
  );
}
