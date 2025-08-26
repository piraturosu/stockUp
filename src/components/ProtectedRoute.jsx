import { Navigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { initialData } from "../data/dummyData";

export default function ProtectedRoute({ children }) {
  const [appData] = useLocalStorage("appData", initialData);
  const isAuthed = Boolean(appData.user?.name);
  return isAuthed ? children : <Navigate to="/login" replace />;
}
