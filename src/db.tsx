import { openDB } from 'idb';

let db: any;

export async function createDB() {
  // Using https://github.com/jakearchibald/idb
  try {
    db = await openDB("cookbook", 1, {
      upgrade(db, oldVersion, _newVersion, _transaction) {
        // Switch over the oldVersion, without `break`s, to allow the database to be incrementally upgraded. No `break` so all of the updates get run!
        switch (oldVersion) {
          case 0:
          // Placeholder to execute when database is created (oldVersion is 0)
          case 1:
            // Create a store of objects
            const store = db.createObjectStore("recipes", {
              // The `id` property of the object will be the key.
              autoIncrement: true,
              keyPath: "id",
            });
            store.createIndex("name", "name", { unique: false });
            store.createIndex("id", "id", { unique: true });
            // Create an store index called `type` based on the `type` property of objects in the store
            store.createIndex("type", "type");
            showResult("Database and Data store created");
        }
      },
    });
  } catch (e: any) {
    showResult("Error while creating DB: " + e.message);
  }
}

export async function addData() {
  try {
    const cookies = {
      name: "Chocolate chips cookies",
      type: "dessert",
      cook_time_minutes: 25
    };
    const tx = await db.transaction("recipes", "readwrite");
    const store = tx.objectStore("recipes");
    store.add(cookies);
    await tx.done;
    showResult("Cookies added to the database");
  } catch (e: any) {
    showResult("Error while saving data to DB: " + e.message);
  }
}

export async function getDataDBIndex() { 

  getAllStudents();

}

function getAllStudents(){
  const request = db.transaction('recipes', 'readonly')
                 .objectStore('recipes')
                 .getAll();

  request.onsuccess = ()=> {
      const students = request.result;

      console.log('Got all the students');
      console.table(students)

      return students;
  }

  request.onerror = (err: any)=> {
      console.error(`Error to get all students: ${err}`)
  }
}

export async function addDataSingle(texto: string) {

  console.log('entro a addDataSingle');
  

  try {
    const cookies = {
      name: texto,
      type: "recipes",
      cook_time_minutes: 25
    };
    

    var transaction = db.transaction(["recipes"]);
  var objectStore = transaction.objectStore("recipes");
  var request = objectStore.get("jose");
  request.onerror = function (event: any) {
    // Handle errors!
    alert("erro Name for SSN 444-44-4444 is " + event);
  };
  request.onsuccess = function (event: any) {
    // Do something with the request.result!
    console.log(event);   
    alert("Name for SSN 444-44-4444 is " + request.result.name);
  };

    const tx = await db.transaction("recipes", "readwrite");
    const store = tx.objectStore("recipes");
    store.add(cookies);
    await tx.done;
    showResult("Cookies added to the database");
  } catch (e: any) {
    showResult("Error while saving data to DB: " + e.message);
  }

}

function showResult(text: any) {
  // document.querySelector("output").innerHTML = text;
  console.log(text);
}

export async function getData() {
  const tx = await db.transaction('recipes', 'readonly')
  const store = tx.objectStore('recipes');
// Because in our case the `id` is the key, we would
// have to know in advance the value of the id to
// retrieve the record
  const value = await store.get(1);
  console.log(value);
}

export async function persistData() {
  if (navigator.storage && navigator.storage.persist) {
    const result = await navigator.storage.persist();
    console.log(`Data persisted: ${result}`);
  }

  
}

export function updateIndicator() {
  console.log(window.navigator.onLine);
}