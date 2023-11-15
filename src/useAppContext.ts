import { useContext } from "react";
import { AppContext } from "./AppProvider";

export function useAppContext() {
  const context = useContext(AppContext);

  return context;
}
