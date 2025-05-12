
import { create } from 'zustand';
import { computeStatusCounts } from './function'

type taskStatus = 'Open' | 'In Progress' | 'Closed' | 'Pending' | 'Resolved';

interface RowData {
    caseId: string;
    subject: string;
    assignee: string;
    taskStatus: taskStatus;
    team: string;
    createdDate: string;
    messages: string[];
};

const sampleData: RowData[] = [];

type SettlementStore = {
  rowData: RowData[];
  statusCounts: Record<taskStatus, number>
  setRowData: (data: RowData[]) => void;
  removeRow: (caseId: string) => void;
  addRow: (row: RowData) => void;
};

export const useSettlementGridStore = create<SettlementStore>((set, get) => ({
  rowData: [ ...sampleData ],
  statusCounts: computeStatusCounts([]),
  setRowData: (data) => {
    set({ rowData: data, statusCounts: computeStatusCounts(data) })
  },
  removeRow: (caseId) =>{
    const updatedData = get().rowData.filter((item) => item.caseId !== caseId)
    set({
      rowData: updatedData,
      statusCounts: computeStatusCounts(updatedData)
    })
},
  addRow: (row) =>{
    const updatedData = [...get().rowData, row];
    set({
      rowData: updatedData,
      statusCounts: computeStatusCounts(updatedData)
    })
}
}));


// 🔹 BroadcastChannel Setup
const channel = new BroadcastChannel("settlement_channel");

useSettlementGridStore.subscribe((state) => {
  const safeState = {
    rowData: state.rowData, 
    statusCounts: JSON.stringify(state.statusCounts) // Ensure it's serializable
};
channel.postMessage(safeState);
});

channel.onmessage = (event) => {
  const receivedData = event.data;
  const currentState = useSettlementGridStore.getState(); 

  if (JSON.stringify(currentState.rowData) !== JSON.stringify(receivedData.rowData)) {
      useSettlementGridStore.setState({
          rowData: receivedData.rowData,
          statusCounts: JSON.parse(receivedData.statusCounts) // Convert back to object
      });
  }
};