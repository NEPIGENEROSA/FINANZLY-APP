# 🛡️ Finanzly AI - Gestión Inteligente de Gastos

### "Controla tu dinero antes de que él te controle a ti"

Finanzly AI es una aplicación web diseñada para ayudar a los usuarios a gestionar su presupuesto mensual basándose en sus hábitos reales (alimentación, salud, ocio). Utiliza lógica dinámica para ajustar el "Score de Cumplimiento" y ofrecer un análisis de desviación en tiempo real.

| Despliegue | URL |
|---|---|
| **Frontend** | [Vercel](https://tu-url-aqui.vercel.app) |

---

## 🚀 Características
* **Perfil de Hábitos Dinámico:** Configuración personalizada (salario, edad, dieta, fitness) que recalcula tus presupuestos automáticamente.
* **Análisis de Desviación:** Gráficos visuales que comparan tu presupuesto ideal vs. tus gastos reales.
* **Dashboard Interactivo:** Interfaz oscura (Dark Mode) con estética moderna y accesible.
* **Persistencia Local:** Guardado de datos para no perder tus configuraciones al refrescar.

## 🛠️ Tecnologías

### Frontend
* **React + Vite:** Estructura de la aplicación y rapidez de desarrollo.
* **Tailwind CSS:** Diseño visual moderno y responsive.
* **Lucide React:** Iconografía estilizada.
* **Recharts / Gráficos:** Visualización de datos financieros.

### Backend & Cloud
* **Firebase:** Autenticación de usuarios y base de datos en tiempo real.
* **Express (Próximamente):** Arquitectura de capas para gestión de API.

---

## 📂 Estructura del proyecto

```text
project/
├── src/
│   ├── components/     # Piezas visuales (Formularios, Gráficos)
│   ├── context/        # Lógica global del presupuesto
│   ├── hooks/          # Lógica de LocalStorage y cálculos
│   └── App.jsx         # Punto de entrada principal
├── public/             # Imágenes y recursos estáticos
└── tailwind.config.js  # Configuración de estilos
