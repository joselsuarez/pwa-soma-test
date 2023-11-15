import { useAppContext } from "../../useAppContext";
import type { Item } from "../../types";

type ListItemProps = {
  item: Item;
};

export function ListItem({ item }: ListItemProps) {
  const { markAsDone, removeItem } = useAppContext();

  return (
    <div className="card card-compact w-full bg-base-200 join-item">
      <div className="card-body">
        <div className="card-actions justify-end">
          <button
            className="btn btn-square btn-sm"
            onClick={() => removeItem(item)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <p>{item.body}</p>
        <div className="card-actions justify-end">
          <button
            className="btn btn-neutral btn-sm"
            onClick={() => markAsDone(item)}
          >
            {item.isDone ? "Terminado" : "Marcar como terminado"}
          </button>
        </div>
      </div>
    </div>
  );
}
