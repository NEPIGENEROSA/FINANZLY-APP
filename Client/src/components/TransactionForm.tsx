import { useState, useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';

export const TransactionForm = () => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  
  // Esta es la línea que probablemente te falta:
  const context = useContext(TransactionContext); 

  // ... resto del códigouseContext(TransactionContext);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!context) return; // Seguridad para TypeScript
    
    context.addTransaction(description, Number(amount));
    setDescription('');
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-sm border">
      <input
        type="text"
        placeholder="¿En qué gastaste?"
        className="w-full p-2 border rounded-md"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Cantidad (ej: -15 o 100)"
        className="w-full p-2 border rounded-md"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md font-bold">
        Añadir
      </button>
    </form>
  );
};