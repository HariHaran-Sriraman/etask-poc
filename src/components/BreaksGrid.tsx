
import { AgGridReact } from "ag-grid-react";
import type { CustomCellRendererProps } from "ag-grid-react";
import { ColDef, ModuleRegistry, ClientSideRowModelModule, PaginationModule, GridOptions,  NumberEditorModule, ValidationModule } from "ag-grid-community";
import { useState } from 'react';
import { IconButton } from '@mui/material';

import EmailIcon from '@mui/icons-material/Email';

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
    editable: true,
    suppressClickEdit: false
}

type taskStatus = 'Open' | 'In Progress' | 'Closed' | 'Pending' | 'Resolved';

interface RowData {
    caseId: string;
    assignee: string;
    taskStatus: taskStatus;
    team: string;
    createdDate: string;
    messages: string[];
}

const ragRenderer = (params: CustomCellRendererProps) => {
    if (params.value === "In Progress") {
        return <span className="status-in-progress">{params.value}</span>;
    } else if (params.value === "Open") {
        return <span className="status-open">{params.value}</span>;
    } else if (params.value === "Closed") {
        return <span className="status-closed">{params.value}</span>;
    } else if (params.value === "Pending") {
        return <span className="status-pending">{params.value}</span>;
    } else {
        return <span className="rag-element-default">{params.value}</span>;
    }
};

const BreaksGrid: React.FC = () => {

    const [columnDefs] = useState<ColDef[]>([
        {
            headerName: '',
            field: 'delete',
            width: 40,
            cellRenderer: () => {
                return (
                    <IconButton
                        onMouseDown={(e) => e.stopPropagation()}
                        size="small"
                        color="info"
                    >
                        <EmailIcon fontSize="small" />
                    </IconButton>
                )
            },
            sortable: false,
            filter: false,
            pinned: 'left', // optional: keep it always visible
        },
        { headerName: "Case Id", field: "caseId", minWidth: 150, flex: 1 },
        { headerName: "Team", field: "assignee", minWidth: 150, flex: 1 },
        {
            headerName: "Task Status", field: "taskStatus", minWidth: 200, flex: 1,
            cellRenderer: ragRenderer,
        },
        { headerName: "Team2", field: "team", minWidth: 150, flex: 1,  editable: true, onCellEditingStarted: (params) => {
            params.api.refreshCells({ rowNodes: [params.node] });
        }
        },
        { headerName: "Created Date", field: "createdDate", minWidth: 180, flex: 1 },
    ]);

    const sampleRows: RowData[] = [
        {
            caseId: '001',
            assignee: 'Front Desk Team',
            taskStatus: 'Open',
            team: 'Support',
            createdDate: '2025-04-22',
            messages: ['User requested password reset', 'Sent password reset link']
        },
        {
            caseId: '001',
            assignee: 'Settlement Team',
            taskStatus: 'In Progress',
            team: 'Finance',
            createdDate: '2025-04-21',
            messages: ['Customer was overcharged', 'Investigating issue']
        },
        {
            caseId: '001',
            assignee: 'Front Desk Team',
            taskStatus: 'Resolved',
            team: 'Product',
            createdDate: '2025-04-20',
            messages: ['Requested dark mode feature', 'Added to product roadmap']
        }
    ];

    const gridOptions: GridOptions = {
        onCellEditingStopped: (params) => {
            params.node.setDataValue("editable", false);
        }
    };


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
                    gridOptions={gridOptions}
                />
            </div>
        </>
    );
};

export default BreaksGrid;