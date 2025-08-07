import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateLocation from "./pages/CreateLocation";
import EditLocation from "./pages/EditLocation";
import CreateOrderList from "./pages/CreateOrderList";
import EditOrderList from "./pages/EditOrderList";
import Header from "./components/Header";
import NewOrder from "./pages/NewOrder";
import OrderSummary from "./pages/OrderSummary";

function App() {
  return (
    <Router>
      <Header />
      <main className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-location" element={<CreateLocation />} />
          <Route path="/edit-location/:id" element={<EditLocation />} />
          <Route
            path="/create-order/:locationId"
            element={<CreateOrderList />}
          />
          <Route path="/edit-order/:orderId" element={<EditOrderList />} />
          <Route path="/new-order" element={<NewOrder />} />
          <Route path="/order-summary" element={<OrderSummary />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
