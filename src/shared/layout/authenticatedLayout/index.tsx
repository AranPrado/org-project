import { Outlet } from "react-router-dom";
import Header from "./headerPage";
import NavPage from "./navPage";

export default function AuthenticatedLayout() {
  return (
    <div className="w-screen h-screen bg-gray-200 p-8">
      <main className="bg-gray-300 w-full rounded-md p-8 flex shadow-2xl">
        <div className="w-full flex rounded-sm overflow-hidden p-4 bg-gray-200 shadow-lg">
          <div className="">
            <NavPage />
          </div>
          <div className="w-full flex flex-col">
            <Header />
            <div className="bg-white rounded-sm ml-3 mt-3 h-full">
              <Outlet />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
