import { createBrowserRouter, Navigate } from "react-router-dom";
import Authenticated from "../pages/authenticated";
import AuthenticatedLayout from "../shared/layout/authenticatedLayout";
import Adicionar from "../pages/authenticated/adicionar";
import CadastrarCoop from "../pages/authenticated/cadastrar-coop";
import CadastrarEpi from "../pages/authenticated/cadastrar-epi";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Authenticated />,
    children: [
      {
        path: "/",
        element: <AuthenticatedLayout />,
        children: [
          {
            path: "/",
            element: <Navigate to="/adicionar" />,
          },
          {
            path: "/adicionar",
            element: <Adicionar />,
          },
          {
            path: "/cadastrar-coop",
            element: <CadastrarCoop />,
          },
          {
            path: "/cadastrar-epi",
            element: <CadastrarEpi />,
          },
          {
            path: "*",
            element: <Navigate to="/adicionar" />,
          },
        ],
      },
    ],
  },
]);
