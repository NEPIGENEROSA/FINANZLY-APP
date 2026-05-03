import { createContext, useState, ReactNode } from 'react';

interface Budget {
  total: number;
  categories: { name: string; amount: number }[];
}

interface ContextType {
  transactions: any[];
  addTransaction: (desc: string, amount: number) => void;
  monthlyBudget: Budget;
  setMonthlyBudget: (budget: Budget) => void;
  balance: number;
  totalSavings: number;
}

export const TransactionContext = createContext<ContextType | undefined>(undefined);

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [monthlyBudget, setMonthlyBudget] = useState<Budget>({
    total: 0,
    categories: []
  });

  const addTransaction = (description: string, amount: number) => {
    setTransactions([{ id: crypto.randomUUID(), description, amount }, ...transactions]);
  };

  const balance = transactions.reduce((acc, t) => acc + t.amount, 0);
  
  // Ahorro calculado: Presupuesto total inicial - gastos registrados
  const expenses = transactions.filter(t => t.amount < 0).reduce((acc, t) => acc + Math.abs(t.amount), 0);
  const totalSavings = monthlyBudget.total - expenses;

  return (
    <TransactionContext.Provider value={{ 
      transactions, addTransaction, monthlyBudget, setMonthlyBudget, balance, totalSavings 
    }}>
      {children}
    </TransactionContext.Provider>
  );
};