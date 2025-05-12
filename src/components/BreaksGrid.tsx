
import { AgGridReact } from "ag-grid-react";
import { ColDef, ModuleRegistry, ClientSideRowModelModule, PaginationModule, NumberEditorModule, ValidationModule } from "ag-grid-community";
import { useState } from 'react';


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


interface RowData {
    agreementId: string;
    accountId: string;
    brokerageRate: number;
    callOrPut: string;
    buyOrSell: string;
    tradeDate: string;
}


const BreaksGrid: React.FC = () => {

    const [columnDefs] = useState<ColDef[]>([
        { headerName: "Aggreement Id", field: "agreementId", minWidth: 150, flex: 1 },
        { headerName: "Account Id", field: "accountId", minWidth: 150, flex: 1 },
        { headerName: "Brokerage Rate", field: "brokerageRate", minWidth: 200, flex: 1},
        { headerName: "Call/Put", field: "callOrPut", minWidth: 150, flex: 1},
        { headerName: "Buy/Sell", field: "buyOrSell", minWidth: 180, flex: 1 },
    ]);

    const sampleRows: RowData[] = [
        {
            agreementId: '6301',
            accountId: '88456301',
            brokerageRate: 0.2,
            callOrPut: 'Call',
            buyOrSell: 'Buy',
            tradeDate: '2025-04-22'
        },
        {
            agreementId: '6303',
            accountId: '88456303',
            brokerageRate: 0.2,
            callOrPut: 'Call',
            buyOrSell: 'Buy',
            tradeDate: '2025-04-22'
        },
        {
            agreementId: '6305',
            accountId: '88456305',
            brokerageRate: 0.2,
            callOrPut: 'Call',
            buyOrSell: 'Buy',
            tradeDate: '2025-04-22'
        }
    ];



    return (
        <>
            <div className="ag-theme-alpine" style={{ width: '100%', height: '17vh' }}>
                <AgGridReact
                    columnDefs={columnDefs}
                    rowData={sampleRows}
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

export default BreaksGrid;