import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { initialData } from "../data/dummyData";

const CreateOrderList = () => {
  const { locationId } = useParams();
  const navigate = useNavigate();
  const [appData, setAppData] = useLocalStorage("appData", initialData);

  const [locationName, setLocationName] = useState("");
  const [stockAreas, setStockAreas] = useState([]);
  const [orderList, setOrderList] = useState({});
  const [listName, setListName] = useState("");

  useEffect(() => {
    const loc = appData.locations.find(
      (l) => l.id.toString() === locationId.toString(),
    );

    if (loc) {
      setLocationName(loc.name);
      setStockAreas(loc.stockAreas || []);

      // Initialize structure for shelves/products
      const initialList = {};
      (loc.stockAreas || []).forEach((area, areaIndex) => {
        initialList[areaIndex] = {};
        for (let i = 0; i < area.shelves; i++) {
          initialList[areaIndex][i] = [
            { name: "", supplier: appData.suppliers[0] || "" },
          ];
        }
      });

      setOrderList(initialList);
    } else {
      navigate("/");
    }
  }, [locationId, appData, navigate]);

  const handleProductChange = (areaIdx, shelfIdx, prodIdx, field, value) => {
    const updated = { ...orderList };
    updated[areaIdx][shelfIdx][prodIdx][field] = value;
    setOrderList(updated);
  };

  const addProductField = (areaIdx, shelfIdx) => {
    const updated = { ...orderList };
    updated[areaIdx][shelfIdx].push({
      name: "",
      supplier: appData.suppliers[0] || "",
    });
    setOrderList(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newListId =
      Math.max(
        0,
        ...appData.locations.flatMap((loc) =>
          loc.orderLists.map((list) => list.id),
        ),
      ) + 1;

    const newOrderList = {
      id: newListId,
      name: listName || `Order List ${newListId}`,
      items: Object.entries(orderList).flatMap(([areaIdx, shelves]) =>
        Object.entries(shelves).flatMap(([shelfIdx, products]) =>
          products
            .filter((p) => (p.name || "").trim() !== "")
            .map((p) => ({
              ...p,
              quantity: p.quantity ?? "",
              areaIndex: Number(areaIdx),
              shelfIndex: Number(shelfIdx),
            })),
        ),
      ),
    };

    const updatedLocations = appData.locations.map((loc) =>
      loc.id.toString() === locationId.toString()
        ? { ...loc, orderLists: [...loc.orderLists, newOrderList] }
        : loc,
    );

    setAppData({ ...appData, locations: updatedLocations });
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        Create Order List for {locationName}
      </h2>

      <input
        type="text"
        placeholder="Order List Name"
        value={listName}
        onChange={(e) => setListName(e.target.value)}
        className="w-full border px-3 py-1 rounded mb-4"
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
                      {appData.suppliers.map((supplier, index) => (
                        <option key={index} value={supplier}>
                          {supplier}
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
        Save Order List
      </button>
    </form>
  );
};

export default CreateOrderList;
