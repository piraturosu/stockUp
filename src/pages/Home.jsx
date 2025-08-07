import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyLocations } from "../data/dummyData";

const HomePage = () => {
  const navigate = useNavigate();
  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const [showOrderOptions, setShowOrderOptions] = useState(false);

  const handleSelectLocation = (id) => {
    setSelectedLocationId(id);
    setShowOrderOptions(false);
  };

  const selectedLocation = dummyLocations.find(
    (loc) => loc.id === selectedLocationId,
  );

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">Your Locations</h2>
      <div className="space-y-2">
        {dummyLocations.map((location) => (
          <button
            key={location.id}
            onClick={() => handleSelectLocation(location.id)}
            className="block w-full text-left px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
          >
            {location.name}
          </button>
        ))}
      </div>

      {selectedLocation && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">
            Selected: {selectedLocation.name}
          </h3>
          <div className="flex justify-between">
            <button
              onClick={() => setShowOrderOptions(!showOrderOptions)}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Spring Menu Order List
            </button>
            <button
              onClick={() => navigate(`/create-order/${selectedLocation.id}`)}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Create New Order List
            </button>
          </div>

          {showOrderOptions && (
            <div className="space-x-2">
              <button
                onClick={() => navigate("/new-order")}
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                New Order
              </button>
              <button
                onClick={() =>
                  navigate(`/edit-order-list/${selectedLocation.id}`)
                }
                className="px-4 py-2 bg-yellow-500 text-white rounded"
              >
                Edit Order List
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
