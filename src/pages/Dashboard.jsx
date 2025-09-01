import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { initialData } from "../data/dummyData";

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
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Welcome */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome</h1>
          <p className="text-gray-600">
            Manage your suppliers, locations, and stock lists.
          </p>
        </div>
        <button
          onClick={() => navigate("/home")}
          className="px-4 py-2 rounded bg-primary text-white hover:bg-logo"
        >
          Go to Orders
        </button>
      </div>

      {/* Suppliers */}
      <section className="rounded-2xl border border-border p-6">
        <h2 className="text-2xl font-semibold mb-4">Suppliers</h2>

        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <input
            value={newSupplier}
            onChange={(e) => setNewSupplier(e.target.value)}
            placeholder="Add a supplier"
            className="flex-1 border px-3 py-2 rounded"
          />
          <button
            onClick={addSupplier}
            className="px-4 py-2 rounded bg-primary text-white hover:bg-logo"
          >
            Add
          </button>
        </div>

        {appData.suppliers.length === 0 ? (
          <p className="text-gray-600">No suppliers yet.</p>
        ) : (
          <ul className="divide-y">
            {appData.suppliers.map((s) => (
              <li key={s} className="py-2 flex items-center justify-between">
                <span>{s}</span>
                <button
                  onClick={() => removeSupplier(s)}
                  className="text-destructive hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Locations */}
      <section className="rounded-2xl border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Locations</h2>
          <Link
            to="/create-location"
            className="px-3 py-2 rounded border border-border hover:border-logo"
          >
            + New Location
          </Link>
        </div>

        {appData.locations.length === 0 ? (
          <p className="text-gray-600">No locations yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {appData.locations.map((loc) => {
              const sortedLists = [...(loc.orderLists || [])].sort(
                (a, b) => b.id - a.id,
              );

              const selectedListId =
                selectedListIds[loc.id] || sortedLists[0]?.id || null;

              return (
                <div
                  key={loc.id}
                  className="border border-border rounded-xl p-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{loc.name}</h3>
                    <div className="flex items-center gap-3">
                      <Link
                        to={`/edit-location/${loc.id}`}
                        className="text-sm text-primary hover:underline"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteLocation(loc.id, loc.name)}
                        className="text-sm text-destructive hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mt-1">
                    Stock areas: {loc.stockAreas?.length ?? 0} • Stock lists:{" "}
                    {loc.orderLists?.length ?? 0}
                  </p>

                  <div className="flex flex-col gap-2 mt-3">
                    <Link
                      to={`/create-order/${loc.id}`}
                      className="px-3 py-1 rounded bg-secondary hover:bg-white border border-border text-sm text-center"
                    >
                      + Create Order List 
                    </Link>

                    {loc.orderLists?.length > 0 && (
                      <>
                        <select
                          value={selectedListId || ""}
                          onChange={(e) =>
                            setSelectedListIds({
                              ...selectedListIds,
                              [loc.id]: Number(e.target.value),
                            })
                          }
                          className="px-3 py-2 rounded border border-border"
                        >
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
                              defaultListId: selectedListId,
                            });
                            navigate("/home");
                          }}
                          className="px-3 py-2 rounded bg-primary text-white hover:bg-logo"
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
