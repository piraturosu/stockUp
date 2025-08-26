// src/components/Header.jsx
import { Link, useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { initialData } from "../data/dummyData";

function Header() {
  const [appData, setAppData] = useLocalStorage("appData", initialData);
  let isAuthed = false;
  if (appData && appData.user && appData.user.name) {
    if (appData.user.name.trim().length > 0) {
      isAuthed = true;
    }
  }
  const navigate = useNavigate();

  const handleLogout = () => {
    setAppData({ ...appData, user: null });
    navigate("/");
  };

  return (
    <header className="flex justify-between items-center p-4 bg-background shadow mb-4">
      <Link
        to={isAuthed ? "/home" : "/"}
        className="font-bold text-logo text-2xl"
      >
        <h1>StockUp</h1>
      </Link>

      {!isAuthed ? (
        <div className="flex gap-3">
          <Link
            to="/login"
            className="px-4 py-2 rounded border border-border hover:border-logo"
          >
            Log in
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 rounded bg-primary text-white hover:bg-logo"
          >
            Register
          </Link>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <Link
            to="/dashboard"
            className="px-3 py-2 rounded border border-border hover:border-logo"
          >
            Dashboard
          </Link>
          <button
            onClick={handleLogout}
            className="px-3 py-2 rounded border border-border text-destructive hover:border-destructive hover:text-destructive"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
