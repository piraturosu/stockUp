import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { initialData } from "../data/dummyData";

export default function EditOrderList() {
  const { listId: listIdParam } = useParams();
  const listId = Number(listIdParam);
  const navigate = useNavigate();
  const [appData, setAppData] = useLocalStorage("appData", initialData);

  const [locationName, setLocationName] = useState("");
  const [stockAreas, setStockAreas] = useState([]);
  const [orderList, setOrderList] = useState({});
  const [listName, setListName] = useState("");

  useEffect(() => {
    const location = appData.locations.find((loc) =>
      loc.orderLists.some((l) => l.id === listId),
    );
    if (!location) return navigate("/");

    const list = location.orderLists.find((l) => l.id === listId);
    setLocationName(location.name);
    setListName(list.name || "");
    setStockAreas(location.stockAreas || []);

    const initial = {};
    (location.stockAreas || []).forEach((area, areaIndex) => {
      initial[areaIndex] = {};
      for (let shelfIndex = 0; shelfIndex < area.shelves; shelfIndex++) {
        const shelfItems = (list.items || []).filter(
          (it) =>
            Number(it.areaIndex) === areaIndex &&
            Number(it.shelfIndex) === shelfIndex,
        );
        initial[areaIndex][shelfIndex] =
          shelfItems.length > 0
            ? shelfItems.map((it) => ({ name: it.name, supplier: it.supplier }))
            : [{ name: "", supplier: appData.suppliers[0] }];
      }
    });

    setOrderList(initial);
  }, [listId, appData, navigate]);

  const handleProductChange = (a, s, p, field, value) => {
    setOrderList((prev) => {
      const next = { ...prev };
      next[a] = { ...(next[a] || {}) };
      next[a][s] = [...(next[a][s] || [])];
      next[a][s][p] = { ...next[a][s][p], [field]: value };
      return next;
    });
  };

  const addProductField = (a, s) => {
    setOrderList((prev) => {
      const next = { ...prev };
      next[a] = { ...(next[a] || {}) };
      next[a][s] = [
        ...(next[a][s] || []),
        { name: "", supplier: appData.suppliers[0] },
      ];
      return next;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for duplicate in the same location
    const location = appData.locations.find((loc) =>
      loc.orderLists.some((l) => l.id === listId),
    );
    const nameTrimmed = listName.trim();
    const nameExists = location?.orderLists.some(
      (l) =>
        l.id !== listId && l.name.toLowerCase() === nameTrimmed.toLowerCase(),
    );
    if (nameExists) {
      alert("An order list with that name already exists in this location.");
      return;
    }
    const updatedItems = [];
    Object.entries(orderList).forEach(([areaIdx, shelves]) => {
      Object.entries(shelves).forEach(([shelfIdx, products]) => {
        products.forEach((p) => {
          const name = (p.name || "").trim();
          if (name) {
            updatedItems.push({
              name,
              supplier: p.supplier,
              quantity: p.quantity ?? "",
              areaIndex: Number(areaIdx),
              shelfIndex: Number(shelfIdx),
            });
          }
        });
      });
    });

    const updated = {
      ...appData,
      locations: appData.locations.map((loc) =>
        loc.orderLists.some((l) => l.id === listId)
          ? {
              ...loc,
              orderLists: loc.orderLists.map((l) =>
                l.id === listId
                  ? { ...l, name: listName || l.name, items: updatedItems }
                  : l,
              ),
            }
          : loc,
      ),
    };

    setAppData(updated);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        Edit Order List for {locationName}
      </h2>
      <input
        type="text"
        value={listName}
        onChange={(e) => setListName(e.target.value)}
        placeholder="Order List Name"
        className="w-full border px-3 py-2 rounded mb-4"
      />

      {stockAreas.map((area, areaIdx) => (
        <div key={areaIdx} className="border rounded p-4">
          <h3 className="font-semibold text-lg mb-2">{area.name}</h3>
          {Array.from({ length: area.shelves }).map((_, shelfIdx) => (
            <div key={shelfIdx} className="mb-4">
              <p className="font-medium mb-1">Shelf {shelfIdx + 1}</p>
              {(orderList[areaIdx]?.[shelfIdx] || []).map(
                (product, prodIdx) => (
                  <div
                    key={prodIdx}
                    className="flex flex-col sm:flex-row gap-2 mb-2"
                  >
                    <input
                      type="text"
                      value={product.name}
                      onChange={(e) =>
                        handleProductChange(
                          areaIdx,
                          shelfIdx,
                          prodIdx,
                          "name",
                          e.target.value,
                        )
                      }
                      placeholder="Enter product name"
                      className="w-full border px-3 py-1 rounded"
                    />
                    <select
                      value={product.supplier}
                      onChange={(e) =>
                        handleProductChange(
                          areaIdx,
                          shelfIdx,
                          prodIdx,
                          "supplier",
                          e.target.value,
                        )
                      }
                      className="w-full sm:w-48 border px-3 py-1 rounded"
                    >
                      {appData.suppliers.map((s, i) => (
                        <option key={i} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                ),
              )}
              <button
                type="button"
                onClick={() => addProductField(areaIdx, shelfIdx)}
                className="text-sm text-blue-600"
              >
                + Add another product
              </button>
            </div>
          ))}
        </div>
      ))}

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Save Changes
      </button>
    </form>
  );
}
