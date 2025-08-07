import { UserIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-white shadow mb-4">
      <Link to="/" className="font-bold text-amber-900 text-2xl">
        <h1>StockUp</h1>
      </Link>
      <UserIcon className="h-6 w-6 text-gray-600 cursor-pointer" />
    </header>
  );
}

export default Header;
