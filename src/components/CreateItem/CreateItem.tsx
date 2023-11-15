import { useCallback, useState } from "react";

import { useAppContext } from "../../useAppContext";

export function CreateItem() {
  const [text, setText] = useState("");

  const { addItem } = useAppContext();

  const handleSubmit = useCallback(() => {
    setText("");

    addItem({
      body: text || "Sin descripción",
      id: crypto.randomUUID(),
      isDone: false,
    });
  }, [addItem, text]);

  return (
    <div className="flex mb-4">
      <input
        type="text"
        placeholder="Nueva tarea"
        className="input input-bordered w-full max-w-xs flex-1 mr-2"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button className="btn" onClick={handleSubmit}>
        Agregar
      </button>
    </div>
  );
}
