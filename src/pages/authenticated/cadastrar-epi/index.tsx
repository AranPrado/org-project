import { EPI_DATA } from "../../../apiMock/epis";
import Button from "../../../shared/components/button";
import { Form } from "./components/form";
import { List } from "./components/list";

export default function CadastrarEpi() {
  return (
    <section className="border-t-2 border-gray-300">
      {/* Header da página de cadastro de EPI */}
      <div className="flex justify-between border-t-2 border-blue-300 p-3 ">
        <h3>Cadastro EPI</h3>
        <Button>Cadastrar</Button>
      </div>

      {/* Formulário */}
      <Form />

      {/* Tabela com os EPIs cadastrados */}
      <List data={EPI_DATA} />
    </section>
  );
}
