import { PropsWithChildren, createContext, useState } from "react";
import type { Item } from "./types";

export const AppContext = createContext<{
  items: Item[];
  addItem: (item: Item) => void;
  markAsDone: (item: Item) => void;
  removeItem: (item: Item) => void;
}>({
  addItem: () => {},
  markAsDone: () => {},
  removeItem: () => {},
  items: [],
});

export function AppProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState<Item[]>([]);

  const addItem = (item: Item) => {
    setItems((items) => [...items, item]);
  };

  const markAsDone = (item: Item) => {
    const updatedItems = items.map((i) => {
      if (item.id === i.id) {
        i.isDone = !item.isDone;
      }

      return i;
    });

    setItems(updatedItems);
  };

  const removeItem = (item: Item) => {
    setItems(items.filter((i) => i.id !== item.id));
  };

  return (
    <AppContext.Provider value={{ items, addItem, markAsDone, removeItem }}>
      {children}
    </AppContext.Provider>
  );
}
