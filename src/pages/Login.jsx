import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { initialData } from "../data/dummyData";

export default function Login() {
  const [appData, setAppData] = useLocalStorage("appData", initialData);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Please enter a name");
      return;
    }

    setAppData({ ...appData, user: { name: name.trim() } });
    navigate("/dashboard");
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
        <button
          type="submit"
          className="w-full bg-primary text-white px-4 py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}
