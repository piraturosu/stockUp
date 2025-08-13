export const initialData = {
  user: { name: "David Mousselini" },
  suppliers: ["Bidfood", "Brakes", "Fresh Direct"],
  locations: [
    {
      id: 1,
      name: "Main Kitchen",
      stockAreas: [
        { name: "Drystore", shelves: 3 },
        { name: "Walk-in Fridge", shelves: 2 },
      ],
      orderLists: [
        {
          id: 1,
          name: "Spring Menu",
          items: [
            { id: 1, name: "White Rice", supplier: "Bidfood", quantity: "" },
            { id: 2, name: "Brown Rice", supplier: "Brakes", quantity: "" },
            {
              id: 3,
              name: "Pasta (Penne)",
              supplier: "Fresh Direct",
              quantity: "",
            },
            {
              id: 4,
              name: "Pasta (Spaghetti)",
              supplier: "Bidfood",
              quantity: "",
            },
            { id: 5, name: "Quinoa", supplier: "Brakes", quantity: "" },
            {
              id: 6,
              name: "Canned Tomatoes",
              supplier: "Fresh Direct",
              quantity: "",
            },
            {
              id: 7,
              name: "Canned Chickpeas",
              supplier: "Bidfood",
              quantity: "",
            },
            { id: 8, name: "Canned Tuna", supplier: "Brakes", quantity: "" },
            {
              id: 9,
              name: "Canned Corn",
              supplier: "Fresh Direct",
              quantity: "",
            },
            { id: 10, name: "Canned Beans", supplier: "Bidfood", quantity: "" },
            { id: 11, name: "Olive Oil", supplier: "Brakes", quantity: "" },
            {
              id: 12,
              name: "Balsamic Vinegar",
              supplier: "Fresh Direct",
              quantity: "",
            },
            { id: 13, name: "Salt", supplier: "Bidfood", quantity: "" },
            { id: 14, name: "Black Pepper", supplier: "Brakes", quantity: "" },
            { id: 15, name: "Paprika", supplier: "Fresh Direct", quantity: "" },
            { id: 16, name: "Butter", supplier: "Bidfood", quantity: "" },
            {
              id: 17,
              name: "Cheddar Cheese",
              supplier: "Brakes",
              quantity: "",
            },
            {
              id: 18,
              name: "Parmesan Cheese",
              supplier: "Fresh Direct",
              quantity: "",
            },
            { id: 19, name: "Cream", supplier: "Bidfood", quantity: "" },
            { id: 20, name: "Yogurt", supplier: "Brakes", quantity: "" },
            {
              id: 21,
              name: "Tomatoes",
              supplier: "Fresh Direct",
              quantity: "",
            },
            { id: 22, name: "Lettuce", supplier: "Bidfood", quantity: "" },
            { id: 23, name: "Cucumbers", supplier: "Brakes", quantity: "" },
            {
              id: 24,
              name: "Bell Peppers",
              supplier: "Fresh Direct",
              quantity: "",
            },
            { id: 25, name: "Spinach", supplier: "Bidfood", quantity: "" },
          ],
        },
        { id: 2, name: "Winter Menu", items: [] },
      ],
    },
    {
      id: 2,
      name: "Upstairs Kitchen",
      stockAreas: [
        { name: "Freezer 1", shelves: 1 },
        { name: "Freezer 2", shelves: 1 },
        { name: "Fridge 1", shelves: 1 },
        { name: "Fridge 2", shelves: 1 },
      ],
      orderLists: [{ id: 3, name: "Spring Menu", items: [] }],
    },
  ],
  previousOrders: [
    {
      id: 1,
      location: "Main Kitchen",
      date: "7/28/2025",
      items: [
        { name: "Tomatoes", quantity: 10, supplier: "Bidfood" },
        { name: "Ketchup", quantity: 5, supplier: "Brakes" },
        { name: "Olive Oil", quantity: 3, supplier: "Bidfood" },
      ],
    },
    {
      id: 2,
      location: "Main Kitchen",
      date: "7/27/2025",
      items: [
        { name: "Pasta", quantity: 6, supplier: "Fresh Direct" },
        { name: "Parmesan", quantity: 4, supplier: "Bidfood" },
      ],
    },
    {
      id: 3,
      location: "Upstairs Kitchen",
      date: "7/27/2025",
      items: [
        { name: "Salmon", quantity: 2, supplier: "Brakes" },
        { name: "Spinach", quantity: 1, supplier: "Fresh Direct" },
      ],
    },
  ],
};
