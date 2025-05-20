import React from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import CATGrid from "../components/CATGrid";

const CAT: React.FC = () => {
 return  (
  <div className="ag-theme-alpine">
    <CATGrid />
  </div>
  );
};
export default CAT;
