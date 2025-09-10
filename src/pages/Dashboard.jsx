import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { initialData } from "../data/dummyData";
import { BuildingStorefrontIcon, TruckIcon } from "@heroicons/react/24/outline";

export default function Dashboard() {
  const [appData, setAppData] = useLocalStorage("appData", initialData);
  const [newSupplier, setNewSupplier] = useState("");
  const [selectedListIds, setSelectedListIds] = useState({});
  const navigate = useNavigate();

  const addSupplier = () => {
    const name = newSupplier.trim();
    if (!name) return;
    if (appData.suppliers.includes(name)) return;
    setAppData({ ...appData, suppliers: [...appData.suppliers, name] });
    setNewSupplier("");
  };

  const removeSupplier = (name) => {
    setAppData({
      ...appData,
      suppliers: appData.suppliers.filter((s) => s !== name),
    });
  };

  const deleteLocation = (id, name) => {
    const hasLists =
      appData.locations.find((l) => l.id === id)?.orderLists?.length > 0;
    const msg = hasLists
      ? `Delete location "${name}" and all of its order lists? This cannot be undone.`
      : `Delete location "${name}"? This cannot be undone.`;

    if (!window.confirm(msg)) return;

    const nextLocations = appData.locations.filter((l) => l.id !== id);
    setAppData({ ...appData, locations: nextLocations });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Welcome */}
      <div className="rounded-2xl border border-border p-6 shadow bg-white flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Welcome back</h1>
          <p className="text-sm text-gray-600">
            Quick access to your most important actions.
          </p>
        </div>
        <button
          onClick={() => navigate("/home")}
          className="px-4 py-2 rounded-md bg-primary text-white hover:bg-logo text-sm"
        >
          Go to Orders
        </button>
      </div>

      {/* Suppliers */}
      <section className="rounded-2xl border border-border p-6 shadow bg-white">
        <h2 className="text-lg font-semibold mb-4">Suppliers</h2>

        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <input
            value={newSupplier}
            onChange={(e) => setNewSupplier(e.target.value)}
            placeholder="Enter supplier name"
            className="flex-1 border px-3 py-2 rounded text-sm"
          />
          <button
            onClick={addSupplier}
            className="px-4 py-2 rounded-md bg-primary text-white hover:bg-logo text-sm"
          >
            Add
          </button>
        </div>

        {appData.suppliers.length === 0 ? (
          <p className="text-gray-500 text-sm">No suppliers yet.</p>
        ) : (
          <ul className="space-y-2">
            {appData.suppliers.map((s) => (
              <li
                key={s}
                className="flex items-center justify-between bg-gray-50 border border-border rounded-lg px-3 py-2"
              >
                <div className="flex items-center gap-2">
                  <TruckIcon className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">{s}</span>
                </div>
                <button
                  onClick={() => removeSupplier(s)}
                  className="px-3 py-1 text-xs rounded-md bg-red-100 text-red-600 hover:bg-red-200"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Locations */}
      <section className="rounded-2xl border border-border p-6 shadow bg-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Locations</h2>
          <Link
            to="/create-location"
            className="px-3 py-1 text-sm rounded-md bg-primary text-white hover:bg-logo"
          >
            + New
          </Link>
        </div>

        {appData.locations.length === 0 ? (
          <p className="text-gray-500 text-sm">No locations yet.</p>
        ) : (
          <div className="space-y-4">
            {appData.locations.map((loc) => {
              const sortedLists = [...(loc.orderLists || [])].sort(
                (a, b) => b.id - a.id,
              );

              return (
                <div
                  key={loc.id}
                  className="border border-border rounded-xl p-4 bg-gray-50"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BuildingStorefrontIcon className="w-5 h-5 text-gray-500" />
                      <h3 className="text-sm font-semibold">{loc.name}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/edit-location/${loc.id}`}
                        className="px-3 py-1 text-xs rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteLocation(loc.id, loc.name)}
                        className="px-3 py-1 text-xs rounded-md bg-red-100 text-red-600 hover:bg-red-200"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 mt-1">
                    Stock areas: {loc.stockAreas?.length ?? 0} • Stock lists:{" "}
                    {loc.orderLists?.length ?? 0}
                  </p>

                  <div className="flex flex-col gap-2 mt-3">
                    <Link
                      to={`/create-order/${loc.id}`}
                      className="px-3 py-2 text-xs rounded-md bg-primary text-white hover:bg-logo text-center"
                    >
                      Create Order List
                    </Link>

                    {loc.orderLists?.length > 0 && (
                      <>
                        <select
                          value={selectedListIds[loc.id] ?? ""}
                          onChange={(e) =>
                            setSelectedListIds({
                              ...selectedListIds,
                              [loc.id]: Number(e.target.value),
                            })
                          }
                          className="px-3 py-2 rounded-md border border-border text-sm"
                        >
                          <option value="" disabled>
                            Select menu
                          </option>
                          {sortedLists.map((list) => (
                            <option key={list.id} value={list.id}>
                              📋 {list.name}
                            </option>
                          ))}
                        </select>

                        <button
                          onClick={() => {
                            setAppData({
                              ...appData,
                              defaultLocationId: loc.id,
                              defaultListId: selectedListIds[loc.id],
                            });
                            navigate("/home");
                          }}
                          className="px-3 py-2 text-xs rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
                          disabled={!selectedListIds[loc.id]}
                        >
                          Set Default
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
