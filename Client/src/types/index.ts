export interface Transaction {
    id: string;
    description: string;
    amount: number;
    date?: string;
  }
  
  export type TransactionContextType = {
    transactions: Transaction[];
    addTransaction: (description: string, amount: number) => void;
    balance: number;
  };
