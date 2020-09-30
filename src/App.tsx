import React from "react";
import "./App.css";
import { StructuresTree } from "./StructuresTree";

export type Occupation = "available" | "unavailable";

export type Structure = {
  name: string;
  occupation: Occupation;
  childrenStructures: Structure[];
};

function App() {
  const [rootStructure, setRootStructure] = React.useState<Structure>({
    name: "IntentHotel",
    occupation: "available",
    childrenStructures: [],
  });

  return (
    <div className="App">
      <button
        onClick={() => {
          const newStructure = generateRandomStructure(10);
          setRootStructure(newStructure);
          console.log(newStructure);
        }}
      >
        randomize!
      </button>
      <StructuresTree structure={rootStructure} />
    </div>
  );
}

export default App;

function generateRandomStructure(depth: number): Structure {
  const childrenCount = Math.floor(Math.random() * 3);
  return {
    name: Math.random().toString(36).substring(7),
    occupation: "available",
    childrenStructures:
      depth > 0
        ? Array.from(Array(childrenCount).keys()).map((_) =>
            generateRandomStructure(depth - 1)
          )
        : [],
  };
}
