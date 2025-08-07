import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummySuppliers } from "../data/dummyData";

// Simulated flat order list from CreateOrderList, ordered by shelf order
const dummyOrderItems = Array.from({ length: 25 }).map((_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
  supplier: dummySuppliers[i % dummySuppliers.length],
  quantity: "",
}));

const NewOrder = () => {
  const [page, setPage] = useState(0);
  const [items, setItems] = useState(dummyOrderItems);
  const navigate = useNavigate();
  const itemsPerPage = 10;

  const handleChangeQuantity = (index, value) => {
    const updated = [...items];
    updated[page * itemsPerPage + index].quantity = value;
    setItems(updated);
  };

  const handleNext = () => {
    if ((page + 1) * itemsPerPage < items.length) setPage(page + 1);
  };

  const handlePrevious = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleFinish = () => {
    navigate("/order-summary", { state: { items } });
  };

  const pageItems = items.slice(
    page * itemsPerPage,
    page * itemsPerPage + itemsPerPage,
  );

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <h2 className="text-2xl font-bold">New Order for Main Kitchen</h2>

      {pageItems.map((item, idx) => (
        <div
          key={item.id}
          className="flex justify-between items-center border-b py-2"
        >
          <div>
            <p className="font-medium">{item.name}</p>
            <p className="text-sm text-gray-500">{item.supplier}</p>
          </div>
          <input
            type="number"
            placeholder="Qty"
            value={item.quantity}
            onChange={(e) => handleChangeQuantity(idx, e.target.value)}
            className="w-24 border px-2 py-1 rounded"
          />
        </div>
      ))}

      <div className="flex justify-between pt-4">
        <button
          onClick={handlePrevious}
          disabled={page === 0}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={(page + 1) * itemsPerPage >= items.length}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
        <button
          onClick={handleFinish}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Finish Order
        </button>
      </div>
    </div>
  );
};

export default NewOrder;
