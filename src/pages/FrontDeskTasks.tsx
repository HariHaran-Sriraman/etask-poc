import React from "react";
import DataTable from "../components/DataTable"
import { useFrontDeskGridStore } from '../store/FrontDeskStore';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const FrontDeskTasks: React.FC = () => {
  const { rowData, removeRow } = useFrontDeskGridStore();
 return  (
  <div className="ag-theme-alpine">
    <DataTable rowData={rowData} removeRow = {removeRow}/>
  </div>
  );
};
export default FrontDeskTasks;
