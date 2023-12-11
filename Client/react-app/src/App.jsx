import React from "react";
import Location from "./components/Location";
import { useEffect } from "react";
import { useState } from "react";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/location");
        const jsonData = await response.json();
        setData(jsonData.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  console.log(data);
  return (
    <div className="App">
      <h1>Locations</h1>
      <ul>
        {data.map((location, index) => (
          <Location key={index} name={location.name} />
        ))}
      </ul>
    </div>
  );
}

export default App;
