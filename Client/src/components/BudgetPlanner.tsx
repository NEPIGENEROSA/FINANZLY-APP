import { useContext, useState } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export const BudgetPlanner = () => {
  const context = useContext(TransactionContext);
  
  // 1. ESTADOS: Vista Actual y Perfil PSICOGRÁFICO Completo
  const [activeView, setActiveView] = useState('dashboard');
  const [form, setForm] = useState({ 
    salary: 1400, 
    age: 23, 
    occupation: 'Estudio y Trabajo', 
    livingSituation: 'Sola', 
    diet: 'Cocino yo', 
    fitness: 'Sedentario', 
    shoppingHabits: 'Moderada', 
    housing: 'Alquiler'
  });

  if (!context) return null;

  // 2. LÓGICA DE CONTROL (El Cerebro AI): Ajusta los % según los hábitos
  const calculateBudget = () => {
    let foodBase = 0.15;
    if (form.diet === 'Pedidos domicilio') foodBase = 0.25; 
    if (form.diet === 'Mixto') foodBase = 0.19;
    
    let leisureBase = 0.12;
    if (form.shoppingHabits === 'Compulsiva') leisureBase = 0.20; 
    
    let fixedBase = 0.25;
    if (form.livingSituation === 'Tengo hijos') fixedBase = 0.38; 
    if (form.livingSituation === 'Con mis padres') fixedBase = 0.05;

    let gymBase = form.fitness === 'Deporte regular' ? 0.10 : 0.05;

    return [
      { id: 'alimentacion', name: 'Alimentación', value: form.salary * foodBase, color: '#6366f1', icon: '🍳', 
        tips: ['Compra básica: Arroz, legumbres y huevos', 'Batch cooking el domingo', 'Cultiva tu propio huerto urbano'] },
      { id: 'fijos', name: 'Gastos Fijos', value: form.salary * fixedBase, color: '#10b981', icon: '🏠',
        tips: ['Revisa tu tarifa de luz (valle)', 'Instala difusores de agua', 'Compara ofertas de internet low-cost'] },
      { id: 'ocio', name: 'Ocio y Compras', value: form.salary * leisureBase, color: '#f59e0b', icon: '🛍️',
        tips: ['Suscripciones: Comparte cuentas', 'Ropa: Compra en rebajas o segunda mano', 'Busca eventos gratuitos en tu ciudad'] },
      { id: 'salud', name: 'Salud y Deporte', value: form.salary * gymBase, color: '#ef4444', icon: '💪',
        tips: ['Gym: Busca bonos trimestrales o anuales', 'Entrena en casa/parque (gratis)', 'Invierte en un buen colchón'] },
      { id: 'inversion', name: 'Inversión AI', value: form.salary * 0.10, color: '#8b5cf6', icon: '🚀',
        tips: ['Indexados: Bajo coste y diversificados', 'Fondo de emergencia: 3 meses de gastos', 'Formación: Cursos que aumenten tu valor'] },
    ];
  };

  const data = calculateBudget();
  const totalGastos = data.reduce((acc, curr) => acc + curr.value, 0);
  const ahorroNeto = form.salary - totalGastos;

  // 3. RENDERIZADO DE LA VISTA DE DESGLOSE ("La otra página")
  const renderDetailView = () => {
    const category = data.find(c => c.id === activeView);
    if (!category) return null;

    return (
      <div className="bg-slate-900/60 border border-indigo-500/30 rounded-[40px] p-10 backdrop-blur-3xl animate-in fade-in zoom-in duration-300 relative overflow-hidden">
        <button onClick={() => setActiveView('dashboard')} className="absolute top-6 left-6 text-indigo-400 font-bold hover:text-white transition-colors flex items-center gap-2 text-xs uppercase tracking-widest">
          ← Volver al Guardián
        </button>
        
        <div className="text-center mb-10 mt-8">
          <span className="text-7xl mb-4 block animate-pulse">{category.icon}</span>
          <h2 className="text-5xl font-black text-white uppercase tracking-tighter">Guía de {category.name}</h2>
          <p className="text-indigo-400 font-mono mt-2 text-sm">Presupuesto sugerido por AI: <span className="text-xl font-bold text-white">{category.value.toFixed(0)}€</span></p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-black/40 p-8 rounded-3xl border border-white/5 space-y-5">
            <h4 className="text-indigo-400 font-black uppercase text-xs tracking-widest border-b border-slate-800 pb-3">💡 ¿En qué invertir?</h4>
            <ul className="space-y-4">
              {category.tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-300 text-sm italic leading-relaxed">
                  <span className="text-indigo-500 mt-1">✔</span> {tip}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-indigo-600/10 p-8 rounded-3xl border border-indigo-500/20 flex flex-col justify-center items-center text-center">
             <p className="text-slate-400 text-xs font-bold uppercase mb-2">Meta de Optimización en {category.name}</p>
             <p className="text-4xl font-black text-white decoration-wavy decoration-indigo-500 underline">15% EXTRA</p>
             <p className="text-[11px] text-indigo-300 mt-5 leading-relaxed bg-indigo-950/50 p-4 rounded-xl border border-indigo-800">Siguiendo estos consejos, Finanzly AI estima que podrías liberar unos <span className="font-bold text-white">{(category.value * 0.15).toFixed(0)}€</span> adicionales al mes.</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-slate-200 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* SIDEBAR IZQUIERDO: EL CUESTIONARIO COMPLETO (Recuperado) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-gradient-to-br from-indigo-600 to-blue-800 p-8 rounded-[35px] shadow-2xl border border-white/10">
            <p className="text-[10px] font-black text-white/60 tracking-widest mb-1">MI SALARIO MENSUAL</p>
            <input 
              type="number" 
              className="bg-transparent text-5xl font-black text-white outline-none w-full tracking-tighter"
              value={form.salary}
              onChange={(e) => setForm({...form, salary: Number(e.target.value)})}
            />
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-[30px] backdrop-blur-xl">
            <h3 className="text-lg font-bold mb-6 text-indigo-400 flex items-center gap-2 border-b border-slate-800 pb-3">🧠 Perfil de Hábitos AI</h3>
            <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
              
              {/* Preguntas de Estilo de Vida (Recuperadas) */}
              <div className="bg-slate-800/50 p-4 rounded-2xl border border-white/5">
                <label className="text-[10px] text-slate-500 font-bold uppercase mb-2 block">¿Cómo sueles comer?</label>
                <select className="w-full bg-slate-900 border border-slate-700 p-3 rounded-xl text-xs" value={form.diet} onChange={(e)=>setForm({...form, diet: e.target.value})}>
                  <option>Cocino yo misma</option>
                  <option>Pedidos a domicilio</option>
                  <option>Mixto</option>
                </select>
              </div>

              <div className="bg-slate-800/50 p-4 rounded-2xl border border-white/5">
                <label className="text-[10px] text-slate-500 font-bold uppercase mb-2 block">Situación Familiar</label>
                <select className="w-full bg-slate-900 border border-slate-700 p-3 rounded-xl text-xs" value={form.livingSituation} onChange={(e)=>setForm({...form, livingSituation: e.target.value})}>
                  <option>Vivo sola</option>
                  <option value="Tengo hijos">Tengo hijos a cargo</option>
                  <option value="Con mis padres">Con mis padres</option>
                </select>
              </div>

              <div className="bg-slate-800/50 p-4 rounded-2xl border border-white/5">
                <label className="text-[10px] text-slate-500 font-bold uppercase mb-2 block">Ocupación Actual</label>
                <select className="w-full bg-slate-900 border border-slate-700 p-3 rounded-xl text-xs" value={form.occupation} onChange={(e)=>setForm({...form, occupation: e.target.value})}>
                  <option>Solo estudio</option>
                  <option>Solo trabajo</option>
                  <option>Ambas cosas</option>
                </select>
              </div>

              <div className="bg-slate-800/50 p-4 rounded-2xl border border-white/5">
                <label className="text-[10px] text-slate-500 font-bold uppercase mb-2 block">¿Compras compulsivas?</label>
                <select className="w-full bg-slate-900 border border-slate-700 p-3 rounded-xl text-xs" value={form.shoppingHabits} onChange={(e)=>setForm({...form, shoppingHabits: e.target.value})}>
                  <option value="Moderada">Moderada / Controlada</option>
                  <option value="Compulsiva">A veces me paso (🛍️)</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] text-slate-500 font-bold uppercase ml-1">Actividad Física</label>
                <div className="flex gap-2 mt-1.5">
                  <button onClick={()=>setForm({...form, fitness: 'Sedentario'})} className={`flex-1 p-3 rounded-xl text-[10px] font-black tracking-widest ${form.fitness === 'Sedentario' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-800 text-slate-500'}`}>SEDENTARIO</button>
                  <button onClick={()=>setForm({...form, fitness: 'Deporte regular'})} className={`flex-1 p-3 rounded-xl text-[10px] font-black tracking-widest ${form.fitness === 'Deporte regular' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-800 text-slate-500'}`}>ACTIVA 💪</button>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* CONTENIDO PRINCIPAL: DASHBOARD O DESGLOSE (Recuperados ICONOS) */}
        <div className="lg:col-span-8 space-y-6">
          {activeView === 'dashboard' ? (
            <>
              <div className="bg-slate-900/40 border border-white/5 rounded-[40px] p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5 text-9xl font-black">AI</div>
                <h2 className="text-3xl font-black text-white mb-2 tracking-tight">Análisis de Desviación</h2>
                <p className="text-slate-500 text-sm mb-10 italic">"Garantizando que no te salgas de la línea."</p>
                
                <div className="flex flex-col md:flex-row items-center gap-12">
                  <div className="w-[320px] h-[320px] relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={data} innerRadius={90} outerRadius={125} paddingAngle={8} dataKey="value" stroke="none">
                          {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => setActiveView(entry.id)} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                      <p className={`text-5xl font-black ${ahorroNeto < 0 ? 'text-red-500' : 'text-white'}`}>{ahorroNeto.toFixed(0)}€</p>
                      <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest mt-1">Capacidad Ahorro</p>
                    </div>
                  </div>

                  {/* LEYENDA CLICABLE CON ICONOS (Recuperados) */}
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                    {data.map((cat, index) => (
                      <div key={index} onClick={() => setActiveView(cat.id)} className="flex items-center justify-between bg-slate-800/40 p-5 rounded-3xl border border-white/5 cursor-pointer hover:bg-indigo-500/20 hover:border-indigo-500/40 transition-all group hover:scale-[1.02]">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl group-hover:scale-125 transition-transform">{cat.icon}</span> {/* ICONOS RECUPERADOS */}
                          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-tight group-hover:text-white transition-colors">{cat.name}</span>
                        </div>
                        <span className="font-black text-xl text-white">{cat.value.toFixed(0)}€</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tarjetas Inferiores (Mantenemos el diseño) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className={`p-8 rounded-[35px] border-2 text-center transition-all ${ahorroNeto < 0 ? 'bg-red-500/10 border-red-500/30' : 'bg-emerald-500/10 border-emerald-500/20'}`}>
                  <p className="text-[10px] font-black uppercase mb-1 opacity-60">Situación</p>
                  <p className={`text-xl font-black ${ahorroNeto < 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                    {ahorroNeto < 0 ? 'REVISAR PLAN' : 'PROTEGIDA'}
                  </p>
                </div>
                <div className="bg-slate-900 border border-white/10 p-8 rounded-[35px] text-center flex flex-col justify-center">
                  <p className="text-[10px] font-black text-slate-500 uppercase mb-1 italic">Hobby Principal</p>
                  <p className="text-sm font-bold text-white uppercase leading-tight">
                    {form.shoppingHabits === 'Compulsiva' ? 'Controla las compras 🛍️' : 'Perfil Equilibrado'}
                  </p>
                </div>
                <div className="bg-indigo-600 p-8 rounded-[35px] flex flex-col justify-center items-center shadow-2xl shadow-indigo-500/30 border border-indigo-400">
                   <p className="text-[10px] font-black text-white/70 uppercase">Score Cumplimiento</p>
                   <p className="text-4xl font-black text-white">95%</p>
                </div>
              </div>
            </>
          ) : (
            renderDetailView()
          )}
        </div>
      </div>
    </div>
  );
};