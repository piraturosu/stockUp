import React, { useState } from 'react'


const CreateLocation = () => {
  const [locationName, setLocationName] = useState("");
  const [stockAreas, setStockAreas] = useState([{ name: "", shelfCount: 1 }]);

  const handleChangeArea = (index, field, value) => {
    const updatedAreas = [...stockAreas];
    updatedAreas[index][field] = value;
    setStockAreas(updatedAreas);
  };

  const addStockArea = () => {
    setStockAreas([...stockAreas, { name: "", shelfCount: 1 }]);
  };

  const removeStockArea = (index) => {
    setStockAreas(stockAreas.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      locationName,
      stockAreas,
    };
    console.log("Form Data:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold">Create New Location</h2>

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
            value={area.shelfCount}
            onChange={(e) =>
              handleChangeArea(
                index,
                "shelfCount",
                parseInt(e.target.value) || 0,
              )
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

      <div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save Location
        </button>
      </div>
    </form>
  );
};

export default CreateLocation;
