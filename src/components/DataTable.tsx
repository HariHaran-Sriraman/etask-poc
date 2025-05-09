
import { AgGridReact } from "ag-grid-react";
import type { CustomCellRendererProps } from "ag-grid-react";
import { ColDef, ModuleRegistry, ClientSideRowModelModule, PaginationModule, ICellRendererParams, CellClickedEvent } from "ag-grid-community";
import { useState } from 'react';
import { Box, IconButton } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete'
import SelectedRowPanel from "./SelectedRowPanel";

import {
    SetFilterModule,
} from "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "../styles/styles.css"

// Register the required module
ModuleRegistry.registerModules([ClientSideRowModelModule, SetFilterModule, PaginationModule]);

const defaultColDef: ColDef = {
    filter: true,
    floatingFilter: true,
    resizable: true,
    sortable: true
}

type taskStatus = 'Open' | 'In Progress' | 'Closed' | 'Pending' | 'Resolved';

interface RowData {
    caseId: string;
    subject: string;
    assignee: string;
    taskStatus: taskStatus;
    team: string;
    createdDate: string;
    messages: string[];
}

type Props = {
    rowData: RowData[];
    removeRow: (data: string) => void;
};

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

const DataTable: React.FC<Props> = ({ rowData, removeRow }) => {

    const [columnDefs] = useState<ColDef[]>([
        {
            headerName: '',
            field: 'delete',
            width: 40,
            cellRenderer: (params: ICellRendererParams<RowData, any>) => {
                const row = params.data as RowData
                return (
                    <IconButton
                        onMouseDown={(e) => e.stopPropagation()}
                        onClick={(event) => {
                            event.stopPropagation();
                            removeRow(row?.caseId);
                        }}
                        size="small"
                        color="info"
                    >
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                )
            },
            sortable: false,
            filter: false,
            pinned: 'left', // optional: keep it always visible
        },
        { headerName: "Case Id", field: "caseId", minWidth: 150, flex: 1 },
        { headerName: "Subject", field: "subject", sortable: true, floatingFilter: true, minWidth: 200, flex: 1 },
        { headerName: "Assignee", field: "assignee", minWidth: 150, flex: 1 },
        {
            headerName: "Task Status", field: "taskStatus", minWidth: 200, flex: 1,
            cellRenderer: ragRenderer,
        },
        { headerName: "Team", field: "team", minWidth: 150, flex: 1 },
        { headerName: "Created Date", field: "createdDate", minWidth: 180, flex: 1 },
    ]);
    // const [rowData] = useState<RowData[]>(sampleData);

    const [selectedRow, setSelectedRow] = useState<RowData | null>(null);
    const [gridFlex] = useState<number>(7);
    const [open, setOpen] = useState(false);
    const [modalType, setModalType] = useState<'send' | 'reply' | null>(null);

    const handleOpen = (type: 'send' | 'reply' | null) => {
        setModalType(type);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setModalType(null);
    };

    const handleCellClick = (params: CellClickedEvent) => {
        if (params.colDef.field === 'delete') {
            // skip modal logic
            return
        }
        setSelectedRow(params.data as RowData);
    };

    const closePanel = () => {
        setSelectedRow(null);
    };

    return (
        <Box display="flex" height="100vh" padding="10px" gap={2}>
            <Box flex={gridFlex}>
                <div className="ag-theme-alpine" style={{ width: '100%', height: '85vh' }}>
                    <AgGridReact
                        columnDefs={columnDefs}
                        rowData={rowData}
                        defaultColDef={defaultColDef}
                        pagination={true}
                        paginationPageSize={25}
                        rowModelType="clientSide"
                        suppressMenuHide={true}
                        rowSelection="single"
                        onCellClicked={handleCellClick}
                    />
                </div>
            </Box>
            {selectedRow && (
                <SelectedRowPanel
                    selectedRow={selectedRow}
                    open={open}
                    modalType={modalType}
                    handleOpen={handleOpen}
                    handleClose={handleClose}
                    closePanel={closePanel}
                    gridFlex={gridFlex}
                />
            )}

        </Box>
    );
};

export default DataTable;