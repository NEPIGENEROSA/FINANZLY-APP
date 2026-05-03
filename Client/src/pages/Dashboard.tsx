import { BudgetPlanner } from '../components/BudgetPlanner';

export const Dashboard = () => {
  return (
    <div className="py-8">
      {/* 
         Solo llamamos a BudgetPlanner. 
         Como ya le pusimos el 'app-container' dentro, 
         él solo se encargará de poner el formulario a la izquierda 
         y los cuadros a la derecha. 
      */}
      <BudgetPlanner />
    </div>
  );
};