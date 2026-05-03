# Diseño y Arquitectura del Sistema

## Estructura de Componentes
La aplicación se divide en componentes reutilizables y modulares:
- **Layouts**: Contenedores generales como `app-container`.
- **UI Components**: Tarjetas (`card-pro`), botones e inputs estilizados con Tailwind.
- **Formularios**: El `BudgetPlanner` actúa como el centro de control de datos.

## Gestión del Estado
Se utiliza **React Context API** (`TransactionContext`) para mantener el estado global del presupuesto, permitiendo que cualquier componente acceda a los cálculos sin "prop drilling".

## Backend / API
Se diseña una arquitectura por capas en Node.js/Express:
- **Routes**: Define los endpoints como `/api/v1/budget`.
- **Controllers**: Gestiona la lógica de la petición HTTP.
- **Services**: Contiene la lógica matemática para el cálculo de presupuestos.

## Flujo de Datos
1. El usuario introduce datos en el **Frontend**.
2. Los datos se envían mediante un **API Client** tipado al **Backend**.
3. El **Backend** procesa la lógica y devuelve un objeto JSON.
4. El **Frontend** actualiza el estado global y renderiza los resultados.