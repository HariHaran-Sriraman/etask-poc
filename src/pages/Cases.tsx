import React from "react";
import DataTable from "../components/DataTable"
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const Cases: React.FC = () => 
  (
  <div className="ag-theme-alpine">
    <DataTable />
  </div>
  );

export default Cases;