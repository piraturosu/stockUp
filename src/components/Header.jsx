import { UserIcon } from "@heroicons/react/24/outline";

function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-white shadow mb-4">
      <h1 className="text-2xl font-bold">StockUp</h1>
      <UserIcon className="h-6 w-6 text-gray-600 cursor-pointer" />
    </header>
  );
}

export default Header;
