import { TransactionProvider } from './context/TransactionContext';
import { Dashboard } from './pages/Dashboard'; // O donde tengas tu Dashboard
import './index.css';

function App() {
  return (
    <TransactionProvider>
      <div className="min-h-screen bg-slate-50">
        <Dashboard />
      </div>
    </TransactionProvider>
  );
}

export default App;