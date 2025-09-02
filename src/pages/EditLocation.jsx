import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { initialData } from "../data/dummyData";

export default function EditLocation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appData, setAppData] = useLocalStorage("appData", initialData);

  const [name, setName] = useState("");
  const [stockAreas, setStockAreas] = useState([]);

  // Load location on mount
  useEffect(() => {
    const loc = appData.locations.find(
      (l) => l.id.toString() === id.toString(),
    );
    if (!loc) {
      alert("Location not found");
      navigate("/dashboard");
      return;
    }
    setName(loc.name);
    setStockAreas(loc.stockAreas || []);
  }, [id, appData, navigate]);

  const handleAddArea = () => {
    setStockAreas([...stockAreas, { name: "", shelves: 1 }]);
  };

  const handleRemoveArea = (index) => {
    const next = [...stockAreas];
    next.splice(index, 1);
    setStockAreas(next);
  };

  const handleUpdateArea = (index, field, value) => {
    const next = [...stockAreas];
    next[index] = { ...next[index], [field]: value };
    setStockAreas(next);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedName = name.trim();
    if (!trimmedName) {
      alert("Location name is required.");
      return;
    }

    // 🔑 Unique name check (ignore current location)
    const duplicate = appData.locations.find(
      (l) =>
        l.id.toString() !== id.toString() &&
        l.name.trim().toLowerCase() === trimmedName.toLowerCase(),
    );
    if (duplicate) {
      alert(`Location name "${trimmedName}" already exists.`);
      return;
    }

    const updatedLocations = appData.locations.map((loc) =>
      loc.id.toString() === id.toString()
        ? {
            ...loc,
            name: trimmedName,
            stockAreas: stockAreas.map((a) => ({
              ...a,
              name: a.name.trim(),
              shelves: Number(a.shelves) || 1,
            })),
          }
        : loc,
    );

    setAppData({ ...appData, locations: updatedLocations });
    navigate("/dashboard");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto space-y-6 rounded-xl border border-border p-6 shadow"
    >
      <h2 className="text-2xl font-bold">Edit Location</h2>

      {/* Location name */}
      <div>
        <label className="block text-sm font-medium mb-1">Location Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          placeholder="e.g. Main Kitchen"
        />
      </div>

      {/* Stock Areas */}
      <div>
        <label className="block text-sm font-medium mb-2">Stock Areas</label>
        <div className="space-y-4">
          {stockAreas.map((area, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row gap-2 items-start sm:items-center"
            >
              <input
                type="text"
                value={area.name}
                onChange={(e) => handleUpdateArea(idx, "name", e.target.value)}
                className="flex-1 border px-3 py-2 rounded"
                placeholder="Area name (e.g. Walk-in Fridge)"
              />
              <input
                type="number"
                min="1"
                value={area.shelves}
                onChange={(e) =>
                  handleUpdateArea(idx, "shelves", e.target.value)
                }
                className="w-24 border px-3 py-2 rounded"
                placeholder="Shelves"
              />
              <button
                type="button"
                onClick={() => handleRemoveArea(idx)}
                className="text-destructive hover:underline text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={handleAddArea}
          className="mt-3 text-sm text-primary hover:underline"
        >
          + Add Stock Area
        </button>
      </div>

      {/* Save */}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="px-4 py-2 rounded border border-border hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded bg-primary text-white hover:bg-logo"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}
