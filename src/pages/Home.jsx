import { dummyLocations, dummyOrders } from "../data/dummyData";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Home() {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState(null);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Your Locations</h2>
      <div className="flex flex-col gap-2">
        {dummyLocations.map((loc) => (
          <div key={loc.id} className="border p-2 rounded bg-gray-100">
            <div className="flex justify-between items-center">
              <span>{loc.name}</span>
              <button
                onClick={() => setSelectedLocation(loc.id)}
                className="text-blue-500"
              >
                {selectedLocation === loc.id ? "Hide Options" : "Show Options"}
              </button>
            </div>
            {selectedLocation === loc.id && (
              <div className="mt-2 flex gap-4">
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded"
                  onClick={() => console.log("Selected", loc.name)}
                >
                  Select Location
                </button>
                <button
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                  onClick={() => navigate(`/edit-location/${loc.id}`)}
                >
                  Edit Location
                </button>
              </div>
            )}
          </div>
        ))}
        <button
          onClick={() => navigate("/create-location")}
          className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
        >
          Create New Location
        </button>
      </div>

      {selectedLocation && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Your Order Lists</h2>
          <div className="flex flex-col gap-2">
            {dummyOrders
              .filter((o) => o.locationId === selectedLocation)
              .map((o) => (
                <button
                  key={o.id}
                  onClick={() => navigate(`/edit-order/${o.id}`)}
                  className="bg-gray-200 px-4 py-2 rounded"
                >
                  {o.name}
                </button>
              ))}
            <button
              onClick={() => navigate(`/create-order/${selectedLocation}`)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Create New Order List
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
