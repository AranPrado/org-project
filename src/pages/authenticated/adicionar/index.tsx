import { useState } from "react";
import HeaderComponent from "../../../shared/components/HeaderComponent";
import NewForm from "../../../shared/components/newForm";
import Input from "../../../shared/components/Inputs";
import Button from "../../../shared/components/button";
import Select from "../../../shared/components/Select";
import { EPI_DATA, EPI_SIZES } from "../../../apiMock/epis";
import NewList from "../../../shared/components/newList";
import type { Add } from "../../../data/types/Adicionar";
import { ADICIONADOS } from "../../../apiMock/adicionar";
import { COOP_DATA } from "../../../apiMock/coop";

export default function Adicionar() {
  const [abrirForm, setAbrirForm] = useState<boolean>(false);
  const [listaAdicionar, setListaAdicionar] = useState<Add[]>(ADICIONADOS);
  const [matriculaCoop, setMatriculaCoop] = useState<number>(0);
  const [nomeCoop, setNomeCoop] = useState<string>("");
  const [epiCoop, setEpiCoop] = useState<string>("");
  const [tamanhoEpiCoop, setTamanhoEpiCoop] = useState<string>("");
  const [quantidadeEpiCoop, setQuantidadeEpiCoop] = useState<number>(0);
  const [valorEpiCoop, setValorEpiCoop] = useState<number>(10);
  const [dataEpiCoop, setDataEpiCoop] = useState<string>("");
  const [tipo, setTipo] = useState<'Criar' | 'Editar'>('Criar')
  const [idSelecionado, setIdSelecionado] = useState<number>(0)

  
  const adicionarItem = () => {
    setTipo('Criar')
    if (
      nomeCoop === "" ||
      matriculaCoop === 0 ||
      epiCoop === "" ||
      tamanhoEpiCoop === "" ||
      quantidadeEpiCoop === 0 ||
      valorEpiCoop === 0 ||
      dataEpiCoop === ""
    ) {
      return alert("Preencha todos os campos!");
    }
    if(tipo === 'Criar') {
      const dadosAdicionados: Add = {
        id: listaAdicionar.length + 1,
        nomeCoop: nomeCoop,
        matriculaCoop: matriculaCoop,
        nomeEpi: epiCoop,
        quantidadeEpi: quantidadeEpiCoop,
        tamanhoEpi: tamanhoEpiCoop,
        valorEpi: valorEpiCoop * quantidadeEpiCoop,
        data: dataEpiCoop,
      };
      setListaAdicionar([...listaAdicionar, dadosAdicionados]);
      limparInput();
      setAbrirForm(false)
    }else {
      const salvarEdicao = listaAdicionar.map((dados: Add) => 
        dados.id === idSelecionado ? {
          ...dados,
          nomeCoop: nomeCoop,
          matriculaCoop: matriculaCoop,
          nomeEpi: epiCoop,
          quantidadeEpi: quantidadeEpiCoop,
          tamanhoEpi: tamanhoEpiCoop,
          valorEpi: valorEpiCoop * quantidadeEpiCoop,
          data: dataEpiCoop,
        }: dados,
    )
    setListaAdicionar(salvarEdicao)
    limparInput()
    setAbrirForm(false)
    }}

  const editar = (id: number) => {
    setTipo('Editar');
    setIdSelecionado(id);
    const opcaoEditar = listaAdicionar.find((opcao) => {
      return opcao.id === id
    })
    if (opcaoEditar) {
      setAbrirForm(true);
      setNomeCoop(opcaoEditar.nomeCoop);
      setMatriculaCoop(opcaoEditar.matriculaCoop);
      setEpiCoop(opcaoEditar.nomeEpi);
      setQuantidadeEpiCoop(opcaoEditar.quantidadeEpi);
      setTamanhoEpiCoop(opcaoEditar.tamanhoEpi);
      setValorEpiCoop(opcaoEditar.valorEpi);
      setDataEpiCoop(opcaoEditar.data)
    }
  }


  const excluir = (id: number) => {
    const excluido = listaAdicionar.filter((item) => {
      return id !== item.id
    })
    setListaAdicionar(excluido)
  }

  const preencherNome = (matricula: number) => {
    const matriculaCoop = COOP_DATA.find((coop) => {
      return coop.matricula === matricula;
    });
    if (matriculaCoop) {
      setNomeCoop(matriculaCoop.nome);
    } else {
      setNomeCoop("");
    }
  };
  const preencherValor = (epi: string) => {
    const tipoEpi = EPI_DATA.find((dado) => {
      return dado.nome === epi
    })
    if(tipoEpi) {
      setValorEpiCoop(tipoEpi.preco)
    }else {
      setValorEpiCoop(0)
    }
  }
   const limparInput = () => {
    setNomeCoop('');
    setMatriculaCoop(0);
    setEpiCoop('');
    setQuantidadeEpiCoop(0);
    setTamanhoEpiCoop('');
    setValorEpiCoop(0);
    setDataEpiCoop('')
  };

  const opcaoTamanho = EPI_SIZES.map((item, id) => ({
    id: id,
    option: item.option,
  }));

  //continuar o codigo de select com os epis
  const opcaoEpi = EPI_DATA.map((item, id) => ({
    id: id,
    option: item.nome,
  }));

  return (
    <section>
      <HeaderComponent
        titulo="Registro de Equipamentos retirados"
        tituloBotao="Adicionar"
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
                  placeholder="Nome Coop"
                  type="text"
                  name="Nome"
                  id="number"
                  disabled
                  className="bg-gray-100 px-3 rounded-md border border-blue-400 w-full cursor-not-allowed"
                  value={nomeCoop}
                  readOnly
                />
                <Input
                  placeholder="Matricula"
                  type="number"
                  name="Matricula"
                  id="number"
                  value={matriculaCoop}
                  onChange={(e) => {
                    const matriculaDigitada = Number(e.target.value);
                    setMatriculaCoop(matriculaDigitada);
                    preencherNome(matriculaDigitada);
                  }}
                />
                <Select
                  options={opcaoEpi}
                  texto="Selecione o EPI"
                  value={epiCoop}
                  onChange={(e) => {
                    const epiEscolhido = String(e.target.value)
                    preencherValor(epiEscolhido)
                    setEpiCoop(epiEscolhido);
                  }}
                />
                <Input
                  placeholder="Quantidade"
                  type="number"
                  name="Quantidade"
                  id="number"
                  value={quantidadeEpiCoop}
                  onChange={(e) => {
                    setQuantidadeEpiCoop(Number(e.target.value));
                  }}
                />
                <Select
                  options={opcaoTamanho}
                  texto="Selecione o tamanho"
                  value={tamanhoEpiCoop}
                  onChange={(e) => {
                    setTamanhoEpiCoop(e.target.value);
                  }}
                />
                <Input
                  placeholder="Valor"
                  type="number"
                  name="Valor"
                  id="number"
                  disabled
                  className="bg-gray-100 px-3 rounded-md border border-blue-400 w-full cursor-not-allowed"
                  value={valorEpiCoop * quantidadeEpiCoop}
                  onChange={(e) => {
                    setValorEpiCoop(Number(e.target.value));
                  }}
                />
                <Input
                  type="date"
                  name="Data"
                  id="number"
                  value={dataEpiCoop}
                  onChange={(e) => {
                    setDataEpiCoop(e.target.value);
                  }}
                />
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    adicionarItem();
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
        colunasLista={[
          "Nome",
          "Matricula",
          "EPI",
          "Quantidade",
          "Tamanho",
          "Valor",
          "Data",
          "",
        ]}
        itensLista={listaAdicionar.map((item) => {
          return (
            <tr>
              <td className="px-3 py-1">{item.nomeCoop}</td>
              <td className="px-3 py-1">{item.matriculaCoop}</td>
              <td className="px-3 py-1">{item.nomeEpi}</td>
              <td className="px-3 py-1">{item.quantidadeEpi}</td>
              <td className="px-3 py-1">{item.tamanhoEpi}</td>
              <td className="px-3 py-1">{item.valorEpi}</td>
              <td className="px-3 py-1">{item.data}</td>
              <td>
                <Button onClick={() => {
                  editar(item.id)
                }}>Editar</Button>
                <Button onClick={() => {
                  excluir(item.id)
                }}>Excluir</Button>
              </td>
            </tr>
          );
        })}
      />
    </section>
  );
}
