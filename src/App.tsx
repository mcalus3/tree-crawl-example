import React from "react";
import crawl from "async-tree-crawl";
import "./App.css";
import { StructuresTree } from "./StructuresTree";

export type Occupation = "available" | "unavailable";

export type Structure = {
  name: string;
  occupation: Occupation;
  children: Structure[];
};

function App() {
  const [rootStructure, setRootStructure] = React.useState<Structure>({
    name: "IntentHotel",
    occupation: "available",
    children: [],
  });

  const cleanRooms = () => {
    let startTime = performance.now();
    async function iterateeFunction(node: Structure) {
      if (performance.now() - startTime > 50) {
        await new Promise((resolve) =>
          requestAnimationFrame(() => {
            startTime = performance.now();
            resolve();
          })
        );
      }
      doOperationFor(1);
      console.log(`${node.name} cleaned!`);
    }
    crawl(rootStructure, iterateeFunction, {});
  };

  return (
    <div className="App">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          onClick={() => {
            const newStructure = generateRandomStructure(15);
            setRootStructure(newStructure);
            console.log(newStructure);
          }}
        >
          randomize!
        </button>
        <button onClick={cleanRooms}>cleanup structures!</button>
      </div>
      <StructuresTree structure={rootStructure} />
    </div>
  );
}

function generateRandomStructure(depth: number): Structure {
  const childrenCount = Math.floor(Math.random() * 4 + 0.1);
  return {
    name: Math.random().toString(36).substring(7),
    occupation: "available",
    children:
      depth > 0
        ? Array.from(Array(childrenCount).keys()).map((_) =>
            generateRandomStructure(depth - 1)
          )
        : [],
  };
}

export function doOperationFor(miliSeconds: number) {
  var e = new Date().getTime() + miliSeconds;
  while (new Date().getTime() <= e) {}
}

export default App;
