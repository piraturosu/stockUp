import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { dummyLocations } from "../data/dummyData";

const EditLocation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [locationName, setLocationName] = useState("");
  const [stockAreas, setStockAreas] = useState([]);

  useEffect(() => {
    const loc = dummyLocations.find((l) => l.id === id);
    if (loc) {
      setLocationName(loc.name);
      setStockAreas(loc.stockAreas);
    } else {
      navigate("/");
    }
  }, [id, navigate]);

  const handleChangeArea = (index, field, value) => {
    const updated = [...stockAreas];
    updated[index][field] = value;
    setStockAreas(updated);
  };

  const addStockArea = () => {
    setStockAreas([...stockAreas, { name: "", shelves: 1 }]);
  };

  const removeStockArea = (index) => {
    setStockAreas(stockAreas.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedLocation = {
      id,
      name: locationName,
      stockAreas,
    };
    console.log("Updated Location:", updatedLocation);
    navigate("/");
  };

  const handleDelete = () => {
    console.log("Delete location with id:", id);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold">Edit Location</h2>

      <div>
        <label className="block mb-1">Location Name</label>
        <input
          value={locationName}
          onChange={(e) => setLocationName(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      {stockAreas.map((area, index) => (
        <div key={index} className="border p-3 rounded">
          <label className="block mb-1">Stock Area Name</label>
          <input
            value={area.name}
            onChange={(e) => handleChangeArea(index, "name", e.target.value)}
            className="w-full border px-2 py-1 rounded"
          />

          <label className="block mt-2 mb-1">Number of Shelves</label>
          <input
            type="number"
            value={area.shelves}
            onChange={(e) =>
              handleChangeArea(index, "shelves", parseInt(e.target.value) || 0)
            }
            className="w-full border px-2 py-1 rounded"
          />

          <button
            type="button"
            onClick={() => removeStockArea(index)}
            className="text-red-500 text-sm mt-2"
          >
            Remove Area
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addStockArea}
        className="bg-gray-300 px-4 py-2 rounded"
      >
        Add Stock Area
      </button>

      <div className="flex gap-4 mt-4">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Delete Location
        </button>
      </div>
    </form>
  );
};

export default EditLocation;
