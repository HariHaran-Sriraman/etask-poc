
import { AgGridReact } from "ag-grid-react";
import { ColDef, ModuleRegistry, ClientSideRowModelModule, PaginationModule, NumberEditorModule, ValidationModule, CellValueChangedEvent  } from "ag-grid-community";
import { useState } from 'react';
import { useBreaksGridStore } from '../store/BreaksGridStore';


import {
    SetFilterModule,
} from "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "../styles/styles.css"

// Register the required module
ModuleRegistry.registerModules([ClientSideRowModelModule, SetFilterModule, PaginationModule, NumberEditorModule, ValidationModule]);

const defaultColDef: ColDef = {
    filter: false,
    floatingFilter: false,
    resizable: false,
    sortable: false,
    editable: true
}

const BreaksGrid: React.FC = () => {

    const [columnDefs] = useState<ColDef[]>([
        { headerName: "Aggreement Id", field: "agreementId", minWidth: 150, flex: 1 },
        { headerName: "Account Id", field: "accountId", minWidth: 150, flex: 1 },
        { headerName: "Brokerage Rate", field: "brokerageRate", minWidth: 200, flex: 1},
        { headerName: "Call/Put", field: "callOrPut", minWidth: 150, flex: 1},
        { headerName: "Buy/Sell", field: "buyOrSell", minWidth: 180, flex: 1 },
    ]);

   const { rowData, updateBrokerageRate } = useBreaksGridStore();

   const handleCellValueChanged = (params: CellValueChangedEvent) => {
    if (params.column.getColId() === "brokerageRate") {
        updateBrokerageRate(params.data.agreementId, params.newValue); // Update the store
    }
};


    return (
        <>
            <div className="ag-theme-alpine" style={{ width: '100%', height: '17vh' }}>
                <AgGridReact
                    columnDefs={columnDefs}
                    rowData={rowData}
                    defaultColDef={defaultColDef}
                    pagination={false}
                    paginationPageSize={25}
                    rowModelType="clientSide"
                    suppressMenuHide={false}
                    rowSelection="single"
                    onCellValueChanged={handleCellValueChanged}
                />
            </div>
        </>
    );
};

export default BreaksGrid;