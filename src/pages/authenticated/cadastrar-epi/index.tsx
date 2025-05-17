import { useState } from "react";
import { EPI_DATA, EPI_SIZES } from "../../../apiMock/epis";
import Button from "../../../shared/components/button";
import HeaderComponent from "../../../shared/components/HeaderComponent";
import NewForm from "../../../shared/components/newForm";
import Input from "../../../shared/components/Inputs";
import Select from "../../../shared/components/Select";
import NewList from "../../../shared/components/newList";
import type { Epi } from "../../../data/types/Epi";

export default function CadastrarEpi() {
  const [abrirForm, setAbrirForm] = useState<boolean>(false);
  const [listaEpi, setListaEpi] = useState<Epi[]>(EPI_DATA);
  const [nomeEpi, setNomeEpi] = useState<string>("");
  const [valorEpi, setValorEpi] = useState<number>(0);
  const [epiTamanho, setEpiTamanho] = useState<string>("");
  const [tipo, setTipo] = useState<"Criar" | "Editar">("Criar");
  const [idEpiSelecionado, setIdEpiSelecionado] = useState<number>(0);

  const adicionarEpi = () => {
    setTipo("Criar");
    if (nomeEpi === "" || valorEpi === 0 || epiTamanho === "") {
      return alert("Preencha todos os campos!");
    }
    if (tipo === "Criar") {
      const dados: Epi = {
        id: listaEpi.length + 1,
        nome: nomeEpi,
        preco: valorEpi,
        tamanho: epiTamanho,
      };
      setListaEpi([...listaEpi, dados]);
      limparInput();
    } else {
      const atualizado = listaEpi.map((epi: Epi) =>
        epi.id === idEpiSelecionado
          ? { ...epi, nome: nomeEpi, preco: valorEpi, tamanho: epiTamanho }
          : epi
      );
      setListaEpi(atualizado);
      limparInput();
      setAbrirForm(false);
    }
  };

  const limparInput = () => {
    setNomeEpi("");
    setValorEpi(0);
    setEpiTamanho("");
  };

  const editarEpi = (id: number) => {
    setTipo("Editar");
    setIdEpiSelecionado(id);
    const filtro = listaEpi.find((epis) => {
      return epis.id === id;
    });
    if (filtro) {
      setAbrirForm(true);
      setNomeEpi(filtro.nome);
      setValorEpi(filtro.preco);
      setEpiTamanho(filtro.tamanho);
    }
  };
  const excluirEpi = (id: number) => {
    const excluido = listaEpi.filter((epis) => {
      return epis.id !== id;
    });
    setListaEpi(excluido);
  };

  const opcao = EPI_SIZES.map((item, id) => ({
    id: id,
    option: item.option,
  }));

  return (
    <section className="border-t-2 border-gray-300">
      {/* Header da página de cadastro de EPI */}
      <HeaderComponent
        titulo="Cadastrar EPI"
        tituloBotao="Cadastrar"
        verBotao={true}
        cliqueDoBotao={() => {
          setAbrirForm(!abrirForm);
          setTipo("Criar");
        }}
      />

      {/* Formulário */}
      {abrirForm === true && (
        <>
          <NewForm
            children={
              <>
                <Input
                  placeholder="Digite o EPI"
                  type="text"
                  name="EPI"
                  id="number"
                  value={nomeEpi}
                  onChange={(e) => {
                    setNomeEpi(e.target.value);
                  }}
                />
                <Input
                  placeholder="Digite o valor"
                  type="number"
                  name="Valor"
                  id="number"
                  min={"0"}
                  value={valorEpi}
                  onChange={(e) => {
                    setValorEpi(Number(e.target.value));
                  }}
                />
                <Select
                  onChange={(e) => {
                    setEpiTamanho(e.target.value);
                  }}
                  value={epiTamanho}
                  options={opcao}
                  texto={"Selecione o tamanho"}
                />

                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    adicionarEpi();
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
        colunasLista={["Epi", "Preço", "Tamanho", ""]}
        itensLista={listaEpi.map((epi) => {
          return (
            <tr>
              <td className="px-3 py-1">{epi.nome}</td>
              <td className="px-3 py-1">{epi.preco}</td>
              <td className="px-3 py-1">{epi.tamanho}</td>
              <td>
                <Button
                  onClick={() => {
                    editarEpi(epi.id);
                  }}
                >
                  Editar
                </Button>
                <Button
                  onClick={() => {
                    excluirEpi(epi.id);
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
