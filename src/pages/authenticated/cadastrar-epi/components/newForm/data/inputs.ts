import type { ComponentProps } from "react";

type InputProps = ComponentProps<"input">;

const FORM_EPI_INPUTS: InputProps[] = [
  {
    placeholder: "Digite o EPI",
    name: "EPI",
    id: "number",
    type: "text",
  },
  {
    placeholder: "Digite o valor",
    name: "valor",
    id: "number",
    type: "number",
    min: "0",
  },
];
export default FORM_EPI_INPUTS;
