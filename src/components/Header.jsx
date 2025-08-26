import { UserIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-background shadow mb-4">
      <Link to="/" className="font-bold text-logo text-2xl">
        <h1>StockUp</h1>
      </Link>
      <UserIcon className="h-8 w-8 text-logo cursor-pointer" />
    </header>
  );
}

export default Header;
