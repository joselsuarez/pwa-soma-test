import { CreateItem } from "./components/CreateItem/CreateItem";
import { List } from "./components/List/List";

import { AppProvider } from "./AppProvider";

function App() {
  return (
    <AppProvider>
      <div className="container mx-auto p-4">
        <div className="flex justify-center flex-col">
          <CreateItem />
        </div>

        <div className="flex justify-center">
          <List />
        </div>
      </div>
    </AppProvider>
  );
}

export default App;
