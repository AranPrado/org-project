import HeaderComponent from "../../../shared/components/HeaderComponent";
import { useState } from "react";
import NewForm from "../../../shared/components/newForm";
import Input from "../../../shared/components/Inputs";
import Select from "../../../shared/components/Select";
import Button from "../../../shared/components/button";
import { COOP_DATA, COOP_FUNCAO } from "../../../apiMock/coop";
import type { Coop } from "../../../data/types/Coop";
import NewList from "../../../shared/components/newList";

export default function CadastrarCoop() {
  const [abrirForm, setAbrirForm] = useState<boolean>(false);
  const [listaCoop, setListaCoop] = useState<Coop[]>(COOP_DATA);
  const [nomeCoop, setNomeCoop] = useState<string>("");
  const [matriculaCoop, setMatriculaCoop] = useState<number>(0);
  const [funcaoCoop, setFuncaoCoop] = useState<string>("");
  const [tipo, setTipo] = useState<"Criar" | "Editar">("Criar");
  const [idEpiSelecionado, setIdEpiSelecionado] = useState<number>(0);

  const coopFuncao = COOP_FUNCAO.map((item, id) => ({
    id: id,
    option: item.funcao,
  }));

  const adicionarCoop = () => {
    setTipo('Criar')
    if (nomeCoop === "" || matriculaCoop === 0 || funcaoCoop === "") {
      return alert("Preencha todos os campos!");
    }
    if (tipo === "Criar") {
      const dados: Coop = {
        id: listaCoop.length + 1,
        nome: nomeCoop,
        matricula: matriculaCoop,
        funcao: funcaoCoop,
      };
      setListaCoop([...listaCoop, dados]);
      limparInput();
    } else {
      const atualizado = listaCoop.map((coop: Coop) =>
        coop.id === idEpiSelecionado
          ? {
              ...coop,
              nome: nomeCoop,
              matricula: matriculaCoop,
              funcao: funcaoCoop,
            }
          : coop
      );
      setListaCoop(atualizado);
      limparInput();
      setAbrirForm(false);
    }
  };

  const editarCoop = (id: number) => {
    setTipo("Editar");
    setIdEpiSelecionado(id);
    const coopId = listaCoop.find((coop) => {
      return coop.id === id;
    });
    if (coopId) {
      setAbrirForm(true);
      setNomeCoop(coopId.nome);
      setMatriculaCoop(coopId.matricula);
      setFuncaoCoop(coopId.funcao);
    }
  };

  const excluir = (id: number) => {
    const excluido = listaCoop.filter((coop) => {
      return id !== coop.id;
    });
    setListaCoop(excluido);
  };

  const limparInput = () => {
    setNomeCoop("");
    setMatriculaCoop(0);
    setFuncaoCoop("");
  };

  return (
    <section>
      <HeaderComponent
        titulo="Cadastrar Coop"
        tituloBotao="Cadastrar"
        verBotao={true}
        cliqueDoBotao={() => {
          setAbrirForm(!abrirForm);
        }}
      />
      {abrirForm === true && (
        <>
          <NewForm
            children={
              <>
                <Input
                  placeholder="Nome do Cooperado"
                  type="text"
                  name="Cooperado"
                  id="number"
                  value={nomeCoop}
                  onChange={(e) => {
                    setNomeCoop(e.target.value);
                  }}
                />
                <Input
                  placeholder="Matricula"
                  type="number"
                  name="Matricula"
                  id="number"
                  min={"0"}
                  value={matriculaCoop}
                  onChange={(e) => {
                    setMatriculaCoop(Number(e.target.value));
                  }}
                />
                <Select
                  options={coopFuncao}
                  texto={"Selecione a função"}
                  value={funcaoCoop}
                  onChange={(e) => {
                    setFuncaoCoop(e.target.value);
                  }}
                />

                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    adicionarCoop();
                  }}
                >
                  Salvar
                </Button>
              </>
            }
          />
        </>
      )}

      <NewList
        colunasLista={["Cooperado", "Matricula", "Função", ""]}
        itensLista={listaCoop.map((coop) => {
          return (
            <tr>
              <td className="px-3 py-1">{coop.nome}</td>
              <td className="px-3 py-1">{coop.matricula}</td>
              <td className="px-3 py-1">{coop.funcao}</td>
              <td>
                <Button
                  onClick={() => {
                    editarCoop(coop.id);
                  }}
                >
                  Editar
                </Button>
                <Button
                  onClick={() => {
                    excluir(coop.id);
                  }}
                >
                  Excluir
                </Button>
              </td>
            </tr>
          );
        })}
      />
    </section>
  );
}
