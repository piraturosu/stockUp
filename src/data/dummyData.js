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

export const dummySuppliers = ["Bidfood", "Brakes", "Fresh Direct"];

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

export const springMenuOrderList = [
  { id: 1, name: "White Rice", supplier: "Bidfood", quantity: "" },
  { id: 2, name: "Brown Rice", supplier: "Brakes", quantity: "" },
  { id: 3, name: "Pasta (Penne)", supplier: "Fresh Direct", quantity: "" },
  { id: 4, name: "Pasta (Spaghetti)", supplier: "Bidfood", quantity: "" },
  { id: 5, name: "Quinoa", supplier: "Brakes", quantity: "" },
  { id: 6, name: "Canned Tomatoes", supplier: "Fresh Direct", quantity: "" },
  { id: 7, name: "Canned Chickpeas", supplier: "Bidfood", quantity: "" },
  { id: 8, name: "Canned Tuna", supplier: "Brakes", quantity: "" },
  { id: 9, name: "Canned Corn", supplier: "Fresh Direct", quantity: "" },
  { id: 10, name: "Canned Beans", supplier: "Bidfood", quantity: "" },
  { id: 11, name: "Olive Oil", supplier: "Brakes", quantity: "" },
  { id: 12, name: "Balsamic Vinegar", supplier: "Fresh Direct", quantity: "" },
  { id: 13, name: "Salt", supplier: "Bidfood", quantity: "" },
  { id: 14, name: "Black Pepper", supplier: "Brakes", quantity: "" },
  { id: 15, name: "Paprika", supplier: "Fresh Direct", quantity: "" },
  { id: 16, name: "Butter", supplier: "Bidfood", quantity: "" },
  { id: 17, name: "Cheddar Cheese", supplier: "Brakes", quantity: "" },
  { id: 18, name: "Parmesan Cheese", supplier: "Fresh Direct", quantity: "" },
  { id: 19, name: "Cream", supplier: "Bidfood", quantity: "" },
  { id: 20, name: "Yogurt", supplier: "Brakes", quantity: "" },
  { id: 21, name: "Tomatoes", supplier: "Fresh Direct", quantity: "" },
  { id: 22, name: "Lettuce", supplier: "Bidfood", quantity: "" },
  { id: 23, name: "Cucumbers", supplier: "Brakes", quantity: "" },
  { id: 24, name: "Bell Peppers", supplier: "Fresh Direct", quantity: "" },
  { id: 25, name: "Spinach", supplier: "Bidfood", quantity: "" },
];

export const initialData = {
  user: { name: "David Mousselini" },
  suppliers: ["Bidfood", "Brakes", "Fresh Direct"],
  locations: [
    {
      id: "loc1",
      name: "Main Kitchen",
      orderLists: [
        { id: "list1", name: "Spring Menu", items: [] },
        { id: "list2", name: "Winter Menu", items: [] },
      ],
    },
    {
      id: "loc2",
      name: "Upstairs Kitchen",
      orderLists: [{ id: "list3", name: "Spring Menu", items: [] }],
    },
  ],
  previousOrders: [
    {
      id: "1",
      location: "Main Kitchen",
      date: "25.07.2025",
      items: [
        { name: "Tomatoes", quantity: 10, supplier: "Bidfood" },
        { name: "Ketchup", quantity: 5, supplier: "Brakes" },
        { name: "Olive Oil", quantity: 3, supplier: "Bidfood" },
      ],
    },
    {
      id: "2",
      location: "Main Kitchen",
      date: "27.07.2025",
      items: [
        { name: "Pasta", quantity: 6, supplier: "Fresh Direct" },
        { name: "Parmesan", quantity: 4, supplier: "Bidfood" },
      ],
    },
    {
      id: "3",
      location: "Upstairs Kitchen",
      date: "27.07.2025",
      items: [
        { name: "Salmon", quantity: 2, supplier: "Brakes" },
        { name: "Spinach", quantity: 1, supplier: "Fresh Direct" },
      ],
    },
  ],
};
