import Button from "../../../components/button";
import PerfilPng from "../../../../assets/perfil.png";

export default function Header() {
  return (
    <header className="bg-gray-100 w-full flex justify-between px-5 py-2 items-center shadow-lg">
      <div className="flex gap-2 w-full ">
        <input
          type="text"
          placeholder="Buscar"
          className="w-full bg-white px-3 rounded-md border border-blue-400 max-w-2/3"
        />
        <Button>Pesquisar</Button>
      </div>
      <img
        className="cursor-pointer"
        src={PerfilPng}
        alt="Avatar"
        width={30}
        height={30}
      />
    </header>
  );
}
