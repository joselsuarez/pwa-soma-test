import { ListItem } from "./ListItem";

import { useAppContext } from "../../useAppContext";

export function List() {
  const { items } = useAppContext();

  return (
    <div className="join join-vertical w-full border-solid border-base-300">
      {items?.map((item) => (
        <ListItem key={item.id} item={item} />
      ))}
    </div>
  );
}
