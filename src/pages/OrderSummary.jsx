import { useLocation, useNavigate } from "react-router-dom";

const OrderSummary = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const items = state?.items || [];

  const grouped = items.reduce((acc, item) => {
    if (!item.quantity || parseInt(item.quantity) === 0) return acc;
    if (!acc[item.supplier]) acc[item.supplier] = [];
    acc[item.supplier].push(item);
    return acc;
  }, {});

  const handleModify = () => {
    navigate(-1);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
      {Object.entries(grouped).map(([supplier, items]) => (
        <div key={supplier} className="border rounded p-4">
          <h3 className="font-semibold text-lg mb-2">{supplier}</h3>
          <ul className="space-y-1">
            {items.map((item) => (
              <li key={item.id} className="flex justify-between">
                <span>{item.name}</span>
                <span className="font-semibold">{item.quantity}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <button
        onClick={handleModify}
        className="bg-yellow-500 text-white px-4 py-2 rounded"
      >
        Modify Quantities
      </button>

      <button
        onClick={() => navigate("/")}
        className="bg-gray-600 text-white px-4 py-2 rounded ml-2"
      >
        Home
      </button>
    </div>
  );
};

export default OrderSummary;
