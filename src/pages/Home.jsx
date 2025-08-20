import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { initialData } from "../data/dummyData";

const Home = () => {
  const navigate = useNavigate();
  const [appData, setAppData] = useLocalStorage("appData", initialData);

  const [selectedLocationId, setSelectedLocationId] = useState(
    appData.locations[0]?.id || null,
  );
  const [selectedListId, setSelectedListId] = useState(null);

  const selectedLocation = appData.locations.find(
    (loc) => loc.id === selectedLocationId,
  );
  const selectedList = selectedLocation?.orderLists.find(
    (list) => list.id === selectedListId,
  );

  useEffect(() => {
    if (selectedLocation) {
      const latest = [...selectedLocation.orderLists].sort(
        (a, b) => b.id - a.id,
      )[0];
      setSelectedListId(latest?.id || null);
    }
  }, [selectedLocation]);

  const handleReset = () => {
    setAppData(initialData);
    setSelectedLocationId(initialData.locations[0]?.id || null);
    setSelectedListId(null);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-xl font-bold text-center">
        Choose a location to order
      </h1>

      <div>
        <select
          value={selectedLocationId ?? ""}
          onChange={(e) => setSelectedLocationId(Number(e.target.value))}
          className="w-full px-4 py-3  rounded-full shadow-md shadow-black/30
               bg-white appearance-none focus:outline-none focus:ring-2
               focus:ring-blue-500 text-gray-800"
        >
          {appData.locations.map((location) => (
            <option
              key={location.id}
              value={location.id}
              className="text-center"
            >
              {location.name}
            </option>
          ))}
        </select>
      </div>

      {selectedLocation && (
        <div>
          <select
            value={selectedListId ?? ""}
            onChange={(e) => setSelectedListId(Number(e.target.value))}
            className="w-full px-4 py-3  rounded-full shadow-md shadow-black/30
               bg-white appearance-none focus:outline-none focus:ring-2
               focus:ring-blue-500 text-gray-800"
          >
            {selectedLocation.orderLists.map((list) => (
              <option key={list.id} value={list.id} className="text-center">
                {list.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedList && (
        <div className="text-center space-y-6 mt-6">
          {/* <h3 className="text-lg font-semibold">
            Current List: {selectedList.name}
          </h3> */}

          <div className="flex flex-row justify-evenly gap-4">
            <button
              onClick={() =>
                navigate("/new-order", { state: { listId: selectedList.id } })
              }
              className="w-32 h-32 px-8 py-3 bg-green-500 text-white rounded-full text-lg
             shadow-lg shadow-black/50 hover:scale-105
             transition-transform duration-200"
            >
              New Order
            </button>
            {/* <button
              onClick={() => alert("Stocktake feature coming soon!")}
              className="w-32 h-32 px-8 py-3 bg-purple-500 text-white rounded-full text-lg
             shadow-lg shadow-black/50 hover:scale-105
             transition-transform duration-200"
            >
              Stocktake
            </button> */}
          </div>
        </div>
      )}

      <div>
        <h3 className="text-lg font-semibold mt-8">Previous Orders</h3>
        <div className="flex flex-col gap-2 mt-2">
          {appData.previousOrders.map((order) => (
            <button
              key={order.id}
              onClick={() => navigate(`/previous-orders/${order.id}`)}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              {order.location} {order.date}
            </button>
          ))}
        </div>
        <button
          onClick={handleReset}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
        >
          Reset to Initial Data
        </button>
      </div>
    </div>
  );
};

export default Home;
