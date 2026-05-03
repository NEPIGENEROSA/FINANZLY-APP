interface Props {
    description: string;
    amount: number;
  }
  
  export const TransactionCard = ({ description, amount }: Props) => {
    const isExpense = amount < 0;
  
    return (
      <div className="flex justify-between p-4 mb-2 bg-white border rounded-lg shadow-sm">
        <span className="font-medium text-gray-700">{description}</span>
        <span className={`font-bold ${isExpense ? 'text-red-500' : 'text-green-500'}`}>
          {isExpense ? '' : '+'}{amount}€
        </span>
      </div>
    );
  };