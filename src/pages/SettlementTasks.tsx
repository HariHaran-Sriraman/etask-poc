import React from "react";
import DataTable from "../components/DataTable"
import { useSettlementGridStore } from '../store/SettlementStore';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const SettlementTasks: React.FC = () => {
  const { rowData, removeRow } = useSettlementGridStore();
  return  (
   <div className="ag-theme-alpine">
     <DataTable rowData={rowData} removeRow = {removeRow}/>
   </div>
   );
}

export default SettlementTasks;