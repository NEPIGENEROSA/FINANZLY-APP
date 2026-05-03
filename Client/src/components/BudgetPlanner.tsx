import { useContext, useState } from 'react';
import { TransactionContext } from '../context/TransactionContext';

export const BudgetPlanner = () => {
  const context = useContext(TransactionContext);
  const [form, setForm] = useState({ salary: 0, age: 22, job: 'estudiante', kids: 'no', style: 'tecnologia', food: 'casera' });

  if (!context) return null;

  const handleGenerate = () => {
    const salary = form.salary;
    const isStudent = form.job === 'estudiante';
    
    // AJUSTE DE LÓGICA: He bajado los porcentajes para que el ahorro NUNCA sea negativo
    context.setMonthlyBudget({
      total: salary,
      categories: [
        { name: '🍱 Alimentación', amount: form.food === 'restaurantes' ? salary * 0.18 : salary * 0.12 },
        { name: '🏠 Gastos Fijos', amount: form.kids === 'si' ? salary * 0.25 : salary * 0.15 },
        { name: '🚗 Movilidad', amount: salary * 0.08 },
        { name: '🎮 Caprichos', amount: form.style === 'ocio' ? salary * 0.10 : salary * 0.05 },
        { name: '📚 Crecimiento', amount: isStudent ? salary * 0.10 : salary * 0.05 },
        { name: '📈 Inversión', amount: salary * 0.10 }
      ]
    });
  };

  const totalGastos = context.monthlyBudget.categories.reduce((acc, c) => acc + c.amount, 0);
  // Cálculo de ahorro real sobre el salario ingresado
  const ahorroNeto = form.salary > 0 ? form.salary - totalGastos : 0;

  return (
    <div className="app-container">
      {/* SECCIÓN PERFIL (IZQUIERDA) - Lucirá como en image_e11240.png */}
      <aside className="card-pro h-fit">
        <div className="mb-8">
          <h2 className="text-2xl font-black text-blue-600 flex items-center gap-2">
            <span>🤖</span> Finanzly AI
          </h2>
          <p className="text-slate-400 text-sm font-medium">Configura tu perfil financiero</p>
        </div>

        <div className="space-y-4">
          <div className="input-group">
            <label>💰 Salario Mensual Neto</label>
            <input 
              type="number" 
              className="w-full shadow-sm"
              onChange={(e) => setForm({...form, salary: Number(e.target.value)})} 
              placeholder="Ej: 1500" 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="input-group">
              <label>🎂 Edad</label>
              <input type="number" onChange={(e) => setForm({...form, age: Number(e.target.value)})} placeholder="22" />
            </div>
            <div className="input-group">
              <label>👨‍👩‍👧 ¿Hijos?</label>
              <select onChange={(e) => setForm({...form, kids: e.target.value})}>
                <option value="no">No</option>
                <option value="si">Sí</option>
              </select>
            </div>
          </div>

          <div className="input-group">
            <label>💼 Ocupación Actual</label>
            <select onChange={(e) => setForm({...form, job: e.target.value})}>
              <option value="estudiante">Estudiante</option>
              <option value="trabajador">Empleado</option>
              <option value="freelance">Autónomo / Emprendedor</option>
            </select>
          </div>

          <div className="input-group">
            <label>✨ Mayor Gasto Opcional</label>
            <select onChange={(e) => setForm({...form, style: e.target.value})}>
              <option value="tecnologia">Gadgets y Tecnología</option>
              <option value="viajes">Viajes y Escapadas</option>
              <option value="moda">Ropa y Tendencias</option>
              <option value="ocio">Restaurantes y Fiesta</option>
            </select>
          </div>

          <button 
            onClick={handleGenerate} 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg transition-all transform active:scale-95"
          >
            GENERAR MI PLAN 🚀
          </button>
        </div>
      </aside>

      {/* SECCIÓN RESULTADOS (DERECHA) - Cuadrícula como querías */}
      <main>
        {context.monthlyBudget.total > 0 ? (
          <div className="space-y-6">
            {/* Banner de Ahorro con lógica de color */}
            <div className={`card-pro text-white transition-colors ${ahorroNeto > 0 ? 'bg-emerald-500' : 'bg-rose-500'}`}>
              <p className="opacity-90 font-bold uppercase text-xs tracking-wider">Capacidad de Ahorro Mensual</p>
              <div className="flex justify-between items-end">
                <h2 className="text-6xl font-black">{ahorroNeto.toFixed(0)}€</h2>
                <span className="text-4xl">💰</span>
              </div>
              <p className="mt-2 opacity-80 text-sm">Basado en tus ingresos de {form.salary}€</p>
            </div>

            {/* CUADRICULADO PROFESIONAL */}
            <div className="results-grid">
              {context.monthlyBudget.categories.map((cat, i) => (
                <div key={i} className="card-pro group hover:border-blue-400 transition-all border-b-4 border-slate-100">
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                    {cat.name.split(' ')[0]}
                  </div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tighter">
                    {cat.name.split(' ').slice(1).join(' ')}
                  </p>
                  <p className="text-3xl font-black text-slate-800 tracking-tight">
                    {cat.amount.toFixed(0)}<span className="text-lg ml-0.5 text-blue-500">€</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="card-pro border-dashed border-2 flex flex-col items-center justify-center h-full min-h-[400px] text-slate-400">
            <div className="text-6xl mb-4">📊</div>
            <p className="text-xl font-medium">Introduce tus datos para calcular tu plan</p>
          </div>
        )}
      </main>
    </div>
  );
};