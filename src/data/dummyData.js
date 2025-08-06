export const dummyLocations = [
  {
    id: "loc1",
    name: "Main Kitchen",
    stockAreas: [
      { name: "Drystore", shelves: 3 },
      { name: "Walk-in Fridge", shelves: 2 },
    ],
  },
  {
    id: "loc2",
    name: "Upstairs Kitchen",
    stockAreas: [{ name: "Freezer", shelves: 1 }],
  },
];

export const dummySuppliers = ["Bidfood", "Brakes", "Local Market"];

export const dummyOrders = [
  {
    id: "ord1",
    locationId: "loc1",
    name: "Monday Order",
    items: [
      { name: "Ketchup", supplier: "Bidfood", quantity: 2 },
      { name: "Butter", supplier: "Brakes", quantity: 1 },
    ],
  },
];
