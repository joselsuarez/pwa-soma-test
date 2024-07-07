import { CreateItem } from "./components/CreateItem/CreateItem";
import { List } from "./components/List/List";

import { AppProvider } from "./AppProvider";
import { useEffect } from "react";

function App() {

  let installPrompt: any;

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((registration) => console.log('scope is: ', registration.scope));
    }
  }, []);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js', { scope: '/docs' })
        .then((registration) => console.log('scope is: ', registration.scope));
    }
  }, []);

  useEffect(() => {


    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault();    
      installPrompt = event;
    });

    initDB();  
     
  }, [])

  async function initDB() {
    // await createDB();
    // addData()
  }

  async function installApp() {
    if (!installPrompt) {
      return;
    }
    const result = await installPrompt.prompt();
    console.log(`Install prompt was: ${result.outcome}`);
    installPrompt = null;
  }

  return (
    <AppProvider>
      <div className="container mx-auto p-4">
        <div className="flex justify-center flex-col">
          <CreateItem />
        </div>

        <div><button className="p-4" id="install" onClick={installApp}>Install</button></div>

        <div className="flex justify-center">
          <List />
        </div>
      </div>
    </AppProvider>
  );
}

export default App;
