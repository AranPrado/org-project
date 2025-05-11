import { EPI_DATA, EPI_SIZES } from "../../../apiMock/epis";
import Button from "../../../shared/components/button";

import { List } from "./components/list";
import NewForm from "./components/newForm";
import FORM_EPI_INPUTS from "./components/newForm/data/inputs";

export default function CadastrarEpi() {
  return (
    <section className="border-t-2 border-gray-300">
      {/* Header da página de cadastro de EPI */}
      <div className="flex justify-between border-t-2 border-blue-300 p-3 ">
        <h3>Cadastro EPI</h3>
        <Button>Cadastrar</Button>
      </div>

      {/* Formulário */}
      <NewForm
        children={
          <>
            {FORM_EPI_INPUTS.map((infoForms, id) => {
              return (
                <input
                  key={id}
                  placeholder={infoForms.placeholder}
                  type={infoForms.type}
                  name={infoForms.name}
                  id={infoForms.id}
                  className="bg-white px-3 rounded-md border border-blue-400 w-full"
                  min={infoForms.min}
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
          </>
        }
      />

      {/* Tabela com os EPIs cadastrados */}
      <List data={EPI_DATA} />
    </section>
  );
}
