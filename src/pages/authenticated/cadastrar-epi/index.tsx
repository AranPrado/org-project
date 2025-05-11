import { useState } from "react";
import { EPI_DATA, EPI_SIZES } from "../../../apiMock/epis";
import Button from "../../../shared/components/button";
import HeaderPages from "../../../shared/components/headerPages";

import NewForm from "./components/newForm";

import type { EPI } from "../../../data/types/epis";
import NewList from "./components/newList";

export default function CadastrarEpi() {
  const regexNumero = /^\d*$/;
  const [idSelecionado, setIdSelecionado] = useState<number>(0);
  const [editarOuNovo, setEditarOuNovo] = useState<"editar" | "novo">("novo");
  const [epis, setEpis] = useState<EPI[]>(EPI_DATA);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [epiNome, setEpiNome] = useState<string>("");
  const [epiPreco, setEpiPreco] = useState<string>("");
  const [epiTamanho, setEpiTamanho] = useState<string>("");

  const clearInputs = () => {
    setEpiNome("");
    setEpiPreco("");
    setEpiTamanho("");
  };

  const novoEpi = () => {
    if (epiNome === "" || epiPreco === "" || epiTamanho === "")
      return alert("Preencha todos os campos!");
    if (editarOuNovo === "novo") {
      const novoEpi: EPI = {
        id: Date.now(),
        nome: epiNome,
        preco: parseFloat(epiPreco).toFixed(2),
        tamanho: epiTamanho,
      };

      setEpis([...epis, novoEpi]);
      setShowForm(false);
      clearInputs();
    } else {
      const atualizado = epis.map((epi) =>
        epi.id === idSelecionado
          ? { ...epi, nome: epiNome, preco: epiPreco, tamanho: epiTamanho }
          : epi
      );
      setEpis(atualizado);
      setShowForm(false);
      clearInputs();
    }
  };

  const excluirEpi = (id: number) => {
    const filtrado = [...epis].filter((epi) => epi.id !== id);
    setEpis(filtrado);
  };

  const editarEpi = (id: number) => {
    setEditarOuNovo("editar");
    const epi = epis.find((epi) => epi.id === id);

    if (epi) {
      setIdSelecionado(epi.id);
      setEpiNome(epi.nome);
      setEpiPreco(epi.preco);
      setEpiTamanho(epi.tamanho);
      setShowForm(true);
    }
  };

  return (
    <section className="border-t-2 border-gray-300">
      {/* Header da página de cadastro de EPI */}
      <HeaderPages
        title="Cadastrar EPI"
        showChildren
        children={
          <Button
            onClick={() => {
              clearInputs();
              setShowForm(!showForm);
            }}
          >
            Novo EPI
          </Button>
        }
      />

      {/* Formulário */}
      {showForm && (
        <NewForm
          children={
            <>
              <input
                placeholder="Digite o EPI"
                type="text"
                name="EPI"
                value={epiNome}
                id="number"
                className="bg-white px-3 rounded-md border border-blue-400 w-full"
                onChange={(e) => setEpiNome(e.target.value)}
              />
              <input
                placeholder="Digite o valor"
                type="text"
                name="valor"
                value={epiPreco}
                id="number"
                className="bg-white px-3 rounded-md border border-blue-400 w-full"
                min="0"
                onChange={(e) => {
                  if (regexNumero.test(e.target.value))
                    setEpiPreco(e.target.value);
                }}
              />
              <select
                value={epiTamanho}
                onChange={(e) => setEpiTamanho(e.target.value)}
                className="bg-white px-3 rounded-md border border-blue-400 w-full"
              >
                {EPI_SIZES.map((selecao, id) => {
                  return (
                    <option key={id} value={selecao.option}>
                      {selecao.option}
                    </option>
                  );
                })}
              </select>
              <Button
                onClick={(e) => {
                  e.preventDefault();

                  novoEpi();
                }}
              >
                Salvar
              </Button>
            </>
          }
        />
      )}

      {/* Tabela com os EPIs cadastrados */}
      {/* <List data={EPI_DATA} /> */}
      <NewList
        colunasLista={["EPI", "Preço", "Tamanho", "Opções"]}
        itensLista={epis.map((epi) => {
          return (
            <tr>
              <td className="px-3 py-1 ">{epi.nome}</td>
              <td className="px-3 py-1">{epi.preco}</td>
              <td className="px-3 py-1">{epi.tamanho}</td>

              <td className="px-3 py-1 gap-2 flex">
                <Button onClick={() => editarEpi(epi.id)}>Editar</Button>

                <Button onClick={() => excluirEpi(epi.id)}>Excluir</Button>
              </td>
            </tr>
          );
        })}
      />
    </section>
  );
}
