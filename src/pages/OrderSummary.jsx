import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { initialData } from "../data/dummyData";

const OrderSummary = () => {
  const { orderId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [appData, setAppData] = useLocalStorage("appData", initialData);

  let items = [];
  let orderTitle = "Order Summary";
  let locationName = state?.locationName || "Main Kitchen";

  if (orderId && orderId !== "temp") {
    const order = appData.previousOrders.find(
      (o) => o.id.toString() === orderId,
    );
    if (!order) {
      return <div className="p-4">Order not found</div>;
    }
    items = order.items;
    orderTitle = `${order.location} — ${order.date}`;
    locationName = order.location;
  } else {
    items = state?.items || [];
    orderTitle = `Order Preview for ${locationName}`;
  }

  const grouped = items.reduce((acc, item) => {
    if (!item.quantity || parseInt(item.quantity) === 0) return acc;
    if (!acc[item.supplier]) acc[item.supplier] = [];
    acc[item.supplier].push(item);
    return acc;
  }, {});

  const handleModify = () => {
    if (orderId && orderId !== "temp") {
      navigate(`/edit-quantities/${orderId}`);
    } else {
      navigate("/new-order", { state: { items, listId: state?.listId } });
    }
  };

  const handleFinish = () => {
    if (orderId === "temp") {
      let newOrderId = 1;
      if (appData.previousOrders.length > 0) {
        const maxId = Math.max(
          ...appData.previousOrders.map((o) => parseInt(o.id, 10)),
        );
        newOrderId = maxId + 1;
      }

      const newOrder = {
        id: newOrderId,
        location: locationName,
        date: new Date().toLocaleDateString(),
        items: items.map((item) => ({
          ...item,
          quantity: item.quantity || "",
        })),
      };

      setAppData({
        ...appData,
        previousOrders: [...appData.previousOrders, newOrder],
      });
    }
    navigate("/");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h2 className="text-xl font-bold mb-4 text-center">{orderTitle}</h2>

      {Object.entries(grouped).map(([supplier, items]) => (
        <div
          key={supplier}
          className="border border-[#e6eef2] bg-[#f7fbf9] rounded p-4"
        >
          <h3 className="font-semibold text-lg mb-2">{supplier}</h3>
          <ul className="space-y-1">
            {items.map((item, idx) => (
              <li key={idx} className="flex justify-between">
                <span>{item.name}</span>
                <span className="font-semibold">{item.quantity}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {orderId === "temp" && (
        <div className="max-w-2xl flex justify-center">
          <button
            onClick={handleModify}
            className="bg-yellow-500 text-white font-bold px-4 py-2 rounded"
          >
            Modify Order
          </button>

          <button
            onClick={handleFinish}
            className="bg-[#2dd4bf] text-white font-bold px-4 py-2 rounded ml-2"
          >
            Finish Order
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderSummary;
