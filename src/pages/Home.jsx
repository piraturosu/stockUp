import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { initialData } from "../data/dummyData";

const Home = () => {
  const navigate = useNavigate();
  const [appData, setAppData] = useLocalStorage("appData", initialData);

  const selectedLocation = appData.locations.find(
    (loc) => loc.id === appData.defaultLocationId,
  );
  const selectedList = selectedLocation?.orderLists.find(
    (list) => list.id === appData.defaultListId,
  );

  const handleReset = () => {
    setAppData(initialData);
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Restaurant Inventory</h1>
          <p className="text-lg">Your default location and list</p>
        </div>

        {!selectedLocation || !selectedList ? (
          <div className="rounded-2xl p-6 shadow-lg border border-border text-center">
            <p className="text-gray-600">
              No default location or stock list set. Please go to your{" "}
              <strong>Dashboard</strong> and set one.
            </p>
            <button
              onClick={() => navigate("/dashboard")}
              className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-logo"
            >
              Go to Dashboard
            </button>
          </div>
        ) : (
          <div className="rounded-2xl p-8 shadow-lg border border-border">
            <div className="text-center space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Ready to Order</h3>
                <p>
                  Location:{" "}
                  <span className="font-semibold">{selectedLocation.name}</span>
                </p>
                <p>
                  Stock List:{" "}
                  <span className="font-semibold">{selectedList.name}</span>
                </p>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={() =>
                    navigate("/new-order", {
                      state: { listId: selectedList.id },
                    })
                  }
                  className="group relative w-40 h-40 rounded-full text-xl font-bold
                           shadow-xl hover:scale-105 transition-all duration-300 ease-out bg-primary hover:bg-primary/60
                           border-4 border-black"
                >
                  <div className="relative flex flex-col items-center justify-center space-y-2">
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    <span>New Order</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Previous Orders */}
        <div className="bg-card rounded-2xl p-6 shadow-lg border border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Previous Orders
            </h3>
          </div>

          <div className="space-y-3">
            {appData.previousOrders.length > 0 ? (
              appData.previousOrders.map((order) => (
                <button
                  key={order.id}
                  onClick={() => navigate(`/previous-orders/${order.id}`)}
                  className="w-full px-4 py-3 bg-background hover:bg-white rounded-xl
                           text-left transition-colors duration-200 border border-border"
                >
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="font-medium">{order.location}</div>
                      <div className="text-sm">{order.date}</div>
                    </div>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </button>
              ))
            ) : (
              <div className="text-center py-8">
                <svg
                  className="w-12 h-12 mx-auto mb-3 opacity-50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <p>No previous orders yet</p>
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-border">
            <button
              onClick={handleReset}
              className="w-full text-white px-4 py-3 bg-destructive hover:bg-background hover:text-destructive  rounded-xl font-medium transition-colors duration-200 border border-border"
            >
              🔄 Reset to Initial Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
