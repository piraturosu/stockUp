import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { initialData, springMenuOrderList } from "../data/dummyData";

const NewOrder = () => {
  const [page, setPage] = useState(0);
  const [items, setItems] = useState([]);
  const [locationName, setLocationName] = useState("Main Kitchen");
  const navigate = useNavigate();
  const location = useLocation();
  const [appData] = useLocalStorage("appData", initialData);
  const itemsPerPage = 10;

  useEffect(() => {
    const listId = location.state?.listId;
    let selectedItems = springMenuOrderList;
    let newLocationName = "Main Kitchen";

    if (listId) {
      const foundLocation = appData.locations.find((loc) =>
        loc.orderLists.some((l) => l.id === listId),
      );
      if (foundLocation) {
        newLocationName = foundLocation.name;
        const selectedList = foundLocation.orderLists.find(
          (l) => l.id === listId,
        );
        if (selectedList && selectedList.items.length > 0) {
          selectedItems = selectedList.items;
        }
      }
    }

    setItems(
      selectedItems.map((item) => ({
        ...item,
        quantity: "",
      })),
    );
    setLocationName(newLocationName);
  }, [location.state, appData]);

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

  const handleSeeSummary = () => {
    navigate(`/order-summary/temp`, { state: { items, locationName } });
  };

  const pageItems = items.slice(
    page * itemsPerPage,
    page * itemsPerPage + itemsPerPage,
  );

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <h2 className="text-2xl font-bold">New Order for {locationName}</h2>

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
          onClick={handleSeeSummary}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          See Order Summary
        </button>
      </div>
    </div>
  );
};

export default NewOrder;
