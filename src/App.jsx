import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import CreateLocation from "./pages/CreateLocation";
import EditLocation from "./pages/EditLocation";
import CreateOrderList from "./pages/CreateOrderList";
import EditOrderList from "./pages/EditOrderList";
import NewOrder from "./pages/NewOrder";
import OrderSummary from "./pages/OrderSummary";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Header />
      <main className="p-4">
        <Routes>
          {/* Public pages */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* After login */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          {/* Order flows */}
          <Route
            path="/create-location"
            element={
              <ProtectedRoute>
                <CreateLocation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-location/:id"
            element={
              <ProtectedRoute>
                <EditLocation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-order/:locationId"
            element={
              <ProtectedRoute>
                <CreateOrderList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-order/:listId"
            element={
              <ProtectedRoute>
                <EditOrderList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/new-order"
            element={
              <ProtectedRoute>
                <NewOrder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order-summary/:orderId"
            element={
              <ProtectedRoute>
                <OrderSummary />
              </ProtectedRoute>
            }
          />
          <Route
            path="/previous-orders/:orderId"
            element={
              <ProtectedRoute>
                <OrderSummary />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
