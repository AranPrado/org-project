import { useNavigate } from "react-router-dom";
import Button from "../../../components/button";
import { items } from "../../../constants/navConstants";

export default function NavPage() {
  const navigate = useNavigate();

  return (
    <aside className="block bg-white w-44 h-full shadow-lg">
      <h1 className="block border-b border-gray-300 py-2 text-center text-2xl text-gray-500 shadow-lg">
        COOP
      </h1>
      {items.map((item) => {
        return (
          <Button
            onClick={() => navigate(item.url)}
            className="block p-8 w-full border-b text-sm border-gray-300 text-center cursor-pointer hover:shadow-2xl transition-all duration-300 "
          >
            {item.label}
          </Button>
        );
      })}
    </aside>
  );
}
