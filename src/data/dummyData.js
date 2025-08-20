import { springMenuItems } from "./springMenuData";

export const initialData = {
  user: { name: "David Mousselini" },
  suppliers: ["Bidfood", "Brakes", "Fresh Direct"],
  locations: [
    {
      id: 1,
      name: "Main Kitchen",
      stockAreas: [
        { name: "Drystore", shelves: 3 }, // areaIndex: 0
        { name: "Walk-in Fridge", shelves: 4 }, // areaIndex: 1
        { name: "Walk-in Freezer", shelves: 3 }, // areaIndex: 2
      ],
      orderLists: [
        { id: 1, name: "Winter Menu", items: [] },
        {
          id: 2,
          name: "Spring Menu",
          items: springMenuItems,
        },
      ],
    },
    {
      id: 2,
      name: "Bar kitchen",
      stockAreas: [
        { name: "Drystore", shelves: 3 }, // areaIndex: 0
        { name: "Upright Fridge", shelves: 1 }, // areaIndex: 1
        { name: "Upright Freezer", shelves: 1 }, // areaIndex: 2
      ],
      orderLists: [
        { id: 1, name: "Winter Menu", items: [] },
        {
          id: 2,
          name: "Spring Menu",
          items: springMenuItems,
        },
      ],
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
