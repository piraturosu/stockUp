import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { initialData } from "../data/dummyData";

const NewOrder = () => {
  const [page, setPage] = useState(0);
  const [items, setItems] = useState([]);
  const [locationName, setLocationName] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [appData] = useLocalStorage("appData", initialData);
  const itemsPerPage = 10;

  useEffect(() => {
    const listId = location.state?.listId;
    if (!listId) {
      console.warn("No listId provided to NewOrder");
      return;
    }

    let selectedItems = [];
    let newLocationName = "";

    const foundLocation = appData.locations.find((loc) =>
      loc.orderLists.some((l) => l.id.toString() === listId.toString()),
    );

    if (foundLocation) {
      newLocationName = foundLocation.name;
      const selectedList = foundLocation.orderLists.find(
        (l) => l.id.toString() === listId.toString(),
      );

      if (location.state?.items && location.state.items.length > 0) {
        selectedItems = location.state.items;
      } else if (selectedList && selectedList.items.length > 0) {
        selectedItems = selectedList.items.map((item) => ({
          ...item,
          quantity: "",
        }));
      }
    }

    setItems(selectedItems);
    setLocationName(newLocationName);
  }, [location.state, appData]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [page]);

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
    navigate(`/order-summary/temp`, {
      state: { items, locationName, listId: location.state?.listId },
    });
  };

  const pageItems = items.slice(
    page * itemsPerPage,
    page * itemsPerPage + itemsPerPage,
  );

  return (
    <div className="max-w-2xl mx-auto space-y-1">
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
          className="px-4 py-2 bg-primary text-white rounded"
        >
          Order Summary
        </button>
      </div>
    </div>
  );
};

export default NewOrder;
