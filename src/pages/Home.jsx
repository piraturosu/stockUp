import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { initialData } from "../data/dummyData";

const Home = () => {
  const navigate = useNavigate();
  const [appData, setAppData] = useLocalStorage("appData", initialData);
  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const [expandedOrderListId, setExpandedOrderListId] = useState(null);

  const selectedLocation = appData.locations.find(
    (loc) => loc.id === selectedLocationId,
  );
  const handleReset = () => {
    setAppData(initialData);
    setSelectedLocationId(null);
    setExpandedOrderListId(null);
  };
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-xl font-bold">
        Hello {appData.user.name}, please choose one of your locations where you
        would like to order to
      </h1>

      <div className="space-y-2">
        {appData.locations.map((location) => (
          <button
            key={location.id}
            onClick={() => {
              setSelectedLocationId(location.id);
              setExpandedOrderListId(null);
            }}
            className="block w-full text-left px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
          >
            {location.name}
          </button>
        ))}
      </div>

      {selectedLocation && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Order Lists</h3>
          <div className="space-y-2">
            {selectedLocation.orderLists.map((list) => (
              <div key={list.id}>
                <button
                  onClick={() =>
                    setExpandedOrderListId(
                      expandedOrderListId === list.id ? null : list.id,
                    )
                  }
                  className="w-full px-4 py-2 bg-blue-500 text-white rounded"
                >
                  {list.name}
                </button>

                {expandedOrderListId === list.id && (
                  <div className="flex flex-col sm:flex-row gap-2 mt-2">
                    <button
                      onClick={() =>
                        navigate("/new-order", { state: { listId: list.id } })
                      }
                      className="px-4 py-2 bg-green-500 text-white rounded"
                    >
                      Start Order
                    </button>
                    <button
                      onClick={() => alert("Stocktake feature coming soon!")}
                      className="px-4 py-2 bg-purple-500 text-white rounded"
                    >
                      Start Stocktake
                    </button>
                    <button
                      onClick={() => navigate(`/edit-order/${list.id}`)}
                      className="px-4 py-2 bg-yellow-500 text-white rounded"
                    >
                      Edit Stock List
                    </button>
                  </div>
                )}
              </div>
            ))}

            <button
              onClick={() => navigate(`/create-order/${selectedLocation.id}`)}
              className="w-full px-4 py-2 bg-green-600 text-white rounded"
            >
              Create New Order List
            </button>
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
