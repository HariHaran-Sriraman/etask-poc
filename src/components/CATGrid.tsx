
import { AgGridReact } from "ag-grid-react";
import { ColDef, ModuleRegistry, ClientSideRowModelModule, PaginationModule,
     ValidationModule, CellValueChangedEvent, CellStyleModule, DateEditorModule, 
     RowSelectionModule, RowStyleModule, TextEditorModule
       } from "ag-grid-community";
import { useState } from 'react';
import { useCATGridStore } from '../store/CATGridStore';
import "../styles/styles.css"


import {
    SetFilterModule,
} from "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "../styles/styles.css"

// Register the required module
ModuleRegistry.registerModules([ClientSideRowModelModule, SetFilterModule, PaginationModule, 
    ValidationModule, CellStyleModule, DateEditorModule, RowSelectionModule, RowStyleModule, TextEditorModule ]);

const defaultColDef: ColDef = {
    filter: false,
    floatingFilter: false,
    resizable: false,
    sortable: false,
    editable: true
}

const CATGrid: React.FC = () => {
   const { rowData, updateBrokerageRate } = useCATGridStore();

    const getDaysDifference = (createdDate: string) => {
        const created = new Date(createdDate);
        const current = new Date();
        return Math.floor((current.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));
    };

    const [columnDefs] = useState<ColDef[]>([
        { headerName: "Error Category", 
            field: "errorCategory", 
            minWidth: 150,
            flex: 1,
            cellClassRules: {
                "green-background": (params) => getDaysDifference(params.data.createdDate) <= 3,
                "yellow-background": (params) => getDaysDifference(params.data.createdDate) > 3 && getDaysDifference(params.data.createdDate) <= 6,
                "red-background": (params) => getDaysDifference(params.data.createdDate) > 6
            }
         },
        {
            headerName: "ID",
            field: "id",
            minWidth: 120,
            flex: 1,
            cellClassRules: {
                "green-background": (params) => getDaysDifference(params.data.createdDate) <= 3,
                "yellow-background": (params) => getDaysDifference(params.data.createdDate) > 3 && getDaysDifference(params.data.createdDate) <= 6,
                "red-background": (params) => getDaysDifference(params.data.createdDate) > 6
            }
        },
        { headerName: "Firm ID", field: "firmId",minWidth: 120, flex: 1,},
        { headerName: "Account Name", field: "accountName", minWidth: 200, flex: 1 },
        { headerName: "Account Number", field: "AccountNumber", minWidth: 180, flex: 1 },
        { headerName: "Customer", field: "customer", minWidth: 150, flex: 1 },
        { headerName: "Customer Type", field: "customerType", minWidth: 130, flex: 1 },
        { headerName: "Error Code", field: "errorCode", minWidth: 120, flex: 1 },
        { headerName: "Error Description", field: "errorDescription", minWidth: 250, flex: 1 },
        { headerName: "Status", field: "status", minWidth: 120, flex: 1 },
        { headerName: "Assignee", field: "assignee", minWidth: 130, flex: 1 },
        { headerName: "Teams", field: "teams", minWidth: 140, flex: 1 },
        { headerName: "Created Date", field: "createdDate", minWidth: 130, flex: 1 }
    ]);

   
    


    return (
        <>
            <div className="ag-theme-alpine" style={{ width: '100%', height: '85vh' }}>
                <AgGridReact
                    columnDefs={columnDefs}
                    rowData={rowData}
                    defaultColDef={defaultColDef}
                    pagination={false}
                    paginationPageSize={25}
                    rowModelType="clientSide"
                    suppressMenuHide={false}
                    rowSelection="single"
                />
            </div>
        </>
    );
};

export default CATGrid;