import React from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import BreaksGrid from "../components/BreaksGrid";

const Breaks: React.FC = () => {
 return  (
  <div className="ag-theme-alpine">
    <BreaksGrid />
  </div>
  );
};
export default Breaks;
