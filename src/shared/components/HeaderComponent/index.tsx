import Button from "../button";


interface IHeaderComponent {
  titulo: string;
  tituloBotao?: string;
  verBotao: boolean;
  cliqueDoBotao: () => void;
}

export default function HeaderComponent(Props: IHeaderComponent) {
  return (
    <div className="flex justify-between border-t-2 border-blue-300 p-3 ">
      <h3>{Props.titulo}</h3>
      {Props.verBotao === true && (
        <div>
          <Button onClick={Props.cliqueDoBotao}>{Props.tituloBotao}</Button>
        </div>
      )}
    </div>
  );
}
