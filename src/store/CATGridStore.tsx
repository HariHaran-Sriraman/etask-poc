
import { create } from 'zustand';

interface RowData {
    errorCategory: string;
    id: string;
    firmId: number;
    accountName: string;
    AccountNumber: string;
    customer: string;
    customerType: string;
    errorCode: string;
    errorDescription: string;
    status: string;
    assignee: string;
    teams: string;
    createdDate: string;
}

const sampleData: RowData[] = [
  {
    errorCategory: "Validation",
    id: "ERR001",
    firmId: 2001,
    accountName: "Alpha Corp",
    AccountNumber: "ACC2001",
    customer: "John Doe",
    customerType: "Individual",
    errorCode: "VAL001",
    errorDescription: "Invalid account number format",
    status: "Open",
    assignee: "Team A",
    teams: "QA Team",
    createdDate: "2025-05-19",
  },
  {
    errorCategory: "Validation",
    id: "ERR002",
    firmId: 2002,
    accountName: "Beta Ltd",
    AccountNumber: "ACC2002",
    customer: "Jane Smith",
    customerType: "Business",
    errorCode: "VAL002",
    errorDescription: "Missing required fields in submission",
    status: "Open",
    assignee: "Team A",
    teams: "QA Team",
    createdDate: "2025-05-18",
  },
  {
    errorCategory: "Processing",
    id: "ERR003",
    firmId: 2003,
    accountName: "Gamma Solutions",
    AccountNumber: "ACC2003",
    customer: "Chris Johnson",
    customerType: "Enterprise",
    errorCode: "PROC001",
    errorDescription: "Transaction failure due to timeout",
    status: "In Progress",
    assignee: "Team B",
    teams: "Tech Support",
    createdDate: "2025-05-17",
  },
  {
    errorCategory: "Processing",
    id: "ERR004",
    firmId: 2004,
    accountName: "Delta Inc.",
    AccountNumber: "ACC2004",
    customer: "Emily Carter",
    customerType: "Individual",
    errorCode: "PROC002",
    errorDescription: "Duplicate transaction detected",
    status: "Rejected",
    assignee: "Team B",
    teams: "Finance",
    createdDate: "2025-05-16",
  },
  {
    errorCategory: "Authorization",
    id: "ERR005",
    firmId: 2005,
    accountName: "Epsilon Holdings",
    AccountNumber: "ACC2005",
    customer: "Michael Brown",
    customerType: "Business",
    errorCode: "AUTH001",
    errorDescription: "Unauthorized access attempt detected",
    status: "Resolved",
    assignee: "Team C",
    teams: "Security",
    createdDate: "2025-05-15",
  },
  {
    errorCategory: "Authorization",
    id: "ERR006",
    firmId: 2006,
    accountName: "Zeta Partners",
    AccountNumber: "ACC2006",
    customer: "Sophia Wilson",
    customerType: "Enterprise",
    errorCode: "AUTH002",
    errorDescription: "Token expired during authentication",
    status: "Pending",
    assignee: "Team C",
    teams: "Security",
    createdDate: "2025-05-14",
  },
  {
    errorCategory: "Validation",
    id: "ERR007",
    firmId: 2007,
    accountName: "Theta Global",
    AccountNumber: "ACC2007",
    customer: "David Miller",
    customerType: "Individual",
    errorCode: "VAL001",
    errorDescription: "Invalid account number format",
    status: "Resolved",
    assignee: "Team A",
    teams: "QA Team",
    createdDate: "2025-05-13",
  },
  {
    errorCategory: "Validation",
    id: "ERR008",
    firmId: 2008,
    accountName: "Iota Systems",
    AccountNumber: "ACC2008",
    customer: "Olivia Garcia",
    customerType: "Business",
    errorCode: "VAL002",
    errorDescription: "Missing required fields in submission",
    status: "Open",
    assignee: "Team A",
    teams: "QA Team",
    createdDate: "2025-05-12",
  },
  {
    errorCategory: "Processing",
    id: "ERR009",
    firmId: 2009,
    accountName: "Kappa Technologies",
    AccountNumber: "ACC2009",
    customer: "Ethan Anderson",
    customerType: "Enterprise",
    errorCode: "PROC001",
    errorDescription: "Transaction failure due to timeout",
    status: "Open",
    assignee: "Team B",
    teams: "Tech Support",
    createdDate: "2025-05-11",
  },
  {
    errorCategory: "Authorization",
    id: "ERR010",
    firmId: 2010,
    accountName: "Lambda Group",
    AccountNumber: "ACC2010",
    customer: "Ava Martinez",
    customerType: "Individual",
    errorCode: "AUTH001",
    errorDescription: "Unauthorized access attempt detected",
    status: "Pending",
    assignee: "Team C",
    teams: "Security",
    createdDate: "2025-05-10",
  }
];

type CATStore = {
  rowData: RowData[];
  updateBrokerageRate: (agreementId: string, newRate: number) => void;
  
};

export const useCATGridStore = create<CATStore>((set) => ({
  rowData: [ ...sampleData ],

  updateBrokerageRate: (agreementId, newRate) =>
    set((state) => ({
        rowData: state.rowData.map((row) =>
            row.agreementId === agreementId ? { ...row, brokerageRate: newRate } : row
        ),
    })),
}));


