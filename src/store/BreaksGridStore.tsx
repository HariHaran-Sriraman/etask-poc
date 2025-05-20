
import { create } from 'zustand';

interface RowData {
    agreementId: string;
    accountId: string;
    brokerageRate: number;
    callOrPut: string;
    buyOrSell: string;
    tradeDate: string;
}

const sampleData: RowData[]= [
    {
        agreementId: '6301',
        accountId: '88456',
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

type BreaksStore = {
  rowData: RowData[];
  updateBrokerageRate: (agreementId: string, newRate: number) => void;
  
};

export const useBreaksGridStore = create<BreaksStore>((set) => ({
  rowData: [ ...sampleData ],

  updateBrokerageRate: (agreementId, newRate) =>
    set((state) => ({
        rowData: state.rowData.map((row) =>
            row.agreementId === agreementId ? { ...row, brokerageRate: newRate } : row
        ),
    })),
}));


