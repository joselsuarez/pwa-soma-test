import { CreateItem } from "./components/CreateItem/CreateItem";
import { List } from "./components/List/List";

import { AppProvider } from "./AppProvider";
import { useEffect, useState } from "react";
// import { addData, getData, addDataSingle} from "./db";
import { createDB, getDataDBIndex } from "./db";
// import { apiGet, apiPost } from "./api";
import { apiGetSupa, apiPostSupa } from "./api";

function App() {

  let installPrompt: any;
  const [texto, setTexto] = useState('');

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
    await createDB();
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

  async function postDataSupa() {

      const response = await fetch('https://cfcqyfipnhlbrfbeptqx.supabase.co/rest/v1/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmY3F5ZmlwbmhsYnJmYmVwdHF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk5NDY5MzIsImV4cCI6MjAzNTUyMjkzMn0.ulqAGI6irj8n9ONM28BbNpvVlic0iPSt5m3rcbyogO0',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmY3F5ZmlwbmhsYnJmYmVwdHF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk5NDY5MzIsImV4cCI6MjAzNTUyMjkzMn0.ulqAGI6irj8n9ONM28BbNpvVlic0iPSt5m3rcbyogO0',
          'Prefer':'return=minimal'
        },
        body: JSON.stringify({ name: 'otro producto' })
      })
  
      const data = await response.text();
        console.log('Data received:', data);
        // alert(data.message);
     
  }      

  function handleText(text:string) {
    console.log(text);    
    navigator.clipboard.writeText(text);
    setTexto(text);
  }

  return (
    <AppProvider>
      <div className="container mx-auto p-4">
        <div className="flex justify-center flex-col">
          <CreateItem />
          <input type="text" id="texto" onChange={ e => handleText(e.target.value)} />
        </div>

        <div>
          <button className="p-4" id="install" onClick={installApp}>Install</button>
          {/* <button className="p-4" id="updateIndicator" onClick={updateIndicator}>updateIndicator</button> */}
        {/* <button className="p-4" id="getData" onClick={getData}>getData</button> */}
        {/* <button className="p-4" id="persistData" onClick={persistData}>persistData</button> */}
        <button className="p-4" id="apiGetSupa" onClick={apiGetSupa}>apiGetSupa</button>
        <button className="p-4" id="apiPostSupa" onClick={(e) => apiPostSupa(texto, e)}>apiPostSupa</button>
        {/* <button className="p-4" id="addDataSingle" onClick={(e) => addDataSingle(texto)}>addDataSingle</button> */}
        <button className="p-4" id="getDataDBIndex" onClick={getDataDBIndex}>getDataDBIndex</button>        
        <button hidden className="p-4" id="postDataSupa" onClick={postDataSupa}>postDataSupa</button>
        {/*  <button className="p-4" id="apiGet" onClick={apiGet}>apiGet</button>
        <button className="p-4" id="apiPost" onClick={apiPost}>apiPost</button> */}

        </div>

        <div className="flex justify-center">
          <List />
        </div>
      </div>
    </AppProvider>
  );
}

export default App;
