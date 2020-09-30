import React from "react";
import { Structure } from "./App";
import "./App.css";

type Props = {
  structure: Structure;
};

export const StructuresTree: React.FC<Props> = ({ structure }: Props) => {
  return (
    <div className="StructuresTree">
      {structure.name}
      <div style={{ display: "flex" }}>
        {structure.childrenStructures.map((cs) => (
          <StructuresTree structure={cs} key={cs.name} />
        ))}
      </div>
    </div>
  );
};
