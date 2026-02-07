# 🍔 SmashBar Website | Restaurant POS System

<!-- 4. **Limpieza Final:** -->
![Project Preview](/public/images/screenshot.png)

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js&logoColor=white&style=flat-square)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white&style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white&style=flat-square)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3-06B6D4?logo=tailwindcss&logoColor=white&style=flat-square)
![Zustand](https://img.shields.io/badge/Zustand-4-000000?logo=zustand&logoColor=white&style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

🚀 **[Live Demo →](https://smash-bar-website.vercel.app/)** | 📚 [Documentation](./docs) | 🐛 [Report Bug](https://github.com/To2003/smashBar-website/issues)

> 🇺🇸 **English** | [🇪🇸 Español](#-spanish)

---

## 📋 About the Project

**SmashBar Website** is an advanced **Point of Sale (POS)** and restaurant ordering system built with **Next.js 14**, **React 19**, and **Zustand**. This project demonstrates **enterprise-level architecture**, **complex state management**, and **real-world business logic** with dual-mode interface for customers and waitstaff.

Developed as a portfolio masterpiece to demonstrate expertise in:
- ✅ Enterprise-level state management with Zustand
- ✅ Dual-mode interfaces (customer ordering & staff management)
- ✅ Real-time order tracking and notifications
- ✅ Google Sheets API integration for dynamic menu management
- ✅ Responsive multi-device architecture (desktop, tablet, mobile)
- ✅ Complex business logic (cart management, order processing)
- ✅ Data adapter patterns and transformations
- ✅ Type-safe development with TypeScript

---

## 🎯 Why I Built This (Motivation)

This project was developed as an **enterprise software showcase** to demonstrate **professional-grade development skills** and is designed to showcase technical maturity to potential employers. It showcases:

### 💼 Technical Expertise
- Mastery of **modern state management** (Zustand vs Context)
- **Real-time systems** with polling and data synchronization
- **API integration** with external services (Google Sheets)
- **Complex business logic** implementation
- **Dual-interface architecture** for multiple user roles
- **Type safety** throughout the entire application
- **Scalable component patterns** for enterprise applications

### 🎓 Learning Outcomes
- Building production-ready POS systems
- Advanced state management patterns
- API integration and data transformation
- Real-world business requirement implementation
- Multi-role access control and permissions
- Performance optimization in complex applications

### 🚀 Career Ready
This project demonstrates that I'm ready to:
- Work on enterprise-level applications
- Manage complex state and business logic
- Integrate third-party APIs and services
- Design systems for multiple user types
- Build scalable, maintainable applications
- Work on B2B software solutions

---

## ✨ Key Features

### 👥 Customer Mode (Client Interface)
- 📋 **Dynamic Menu** - Real-time menu from Google Sheets API
- 🔍 **Category Filtering** - Browse by Burgers, Drinks, Desserts, etc.
- 🎨 **Item Customization** - Add/remove ingredients, extra options
- 🛒 **Shopping Cart** - Add items with quantity management
- 💾 **Order Summary** - Review items before checkout
- 📱 **Touch-Optimized** - Mobile-first interface design

### 👨‍💼 Waiter Mode (Staff Interface)
- 📊 **Table Management** - View all table statuses in real-time
- 🔔 **Service Notifications** - Waiter call system with alerts
- 💰 **Bill Management** - Generate and track bills
- ✅ **Order Tracking** - Monitor kitchen orders
- 🎯 **Quick Actions** - Fast table assignment and updates
- 📈 **Order History** - Track completed orders

### 🔧 Admin Features
- ⚙️ **Google Sheets Integration** - Menu management via spreadsheet
- 📈 **Real-time Sync** - Menu changes sync automatically
- 🔐 **Secure Access** - Role-based access control
- 📱 **Multi-Device** - Works on desktop, tablet, smartphone
- 💾 **Data Persistence** - Zustand store with localStorage

---

## 🚀 Tech Stack

### Frontend Framework & Language
- **Next.js 14** - React framework with App Router and SSR
- **React 19** - Latest React with improved performance
- **TypeScript 5** - Type-safe JavaScript for reliability

### State Management
- **Zustand 4** - Lightweight, performant state management
- **Immer** - Immutable state updates
- **LocalStorage Integration** - Persistent state management

### Styling & UI
- **Tailwind CSS 3** - Utility-first CSS framework
- **Shadcn/ui Components** - Accessible component library
- **Lucide React** - Modern icon library
- **Next.js Themes** - Dark/Light mode support

### Backend Integration
- **Google Sheets API** - Menu data source
- **Custom Hooks** - useMenu for API polling
- **Adapter Pattern** - Data transformation (sheetToMenuItem)

### Development Tools
- **ESLint** - Code quality and consistency
- **TypeScript Strict Mode** - Maximum type safety
- **PostCSS & Autoprefixer** - CSS processing
- **pnpm** - Fast package manager

### Deployment
- **Vercel** - Serverless hosting for Next.js
- **Edge Functions** - Low-latency API routes

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18.17 or higher
- **npm**, **yarn**, or **pnpm** package manager
- **Google Sheets API credentials** (for menu integration)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/To2003/smashBar-website.git
   cd smashBar-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   
   # Add your Google Sheets API credentials:
   NEXT_PUBLIC_GOOGLE_SHEETS_ID=your_sheet_id
   GOOGLE_API_KEY=your_api_key
   NEXT_PUBLIC_WAITER_PASSWORD=secure_password
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Build for production**
   ```bash
   npm run build
   npm start
   ```

---

## 📂 Project Structure

```
smashBar-website/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Client mode entry point
│   ├── globals.css              # Global styles
│   └── waiter/
│       └── page.tsx             # Waiter mode entry point
│
├── components/                   # React components
│   ├── client/                   # Customer-facing components
│   │   ├── client-mode.tsx      # Main customer interface
│   │   ├── product-card.tsx     # Menu item card
│   │   ├── customization-drawer.tsx # Item customization
│   │   ├── order-drawer.tsx     # Shopping cart
│   │   ├── floating-action-bar.tsx # Cart icon/button
│   │   └── notification-banner.tsx
│   │
│   ├── waiter/                   # Staff-facing components
│   │   ├── waiter-mode.tsx      # Main waiter interface
│   │   ├── table-card.tsx       # Table status card
│   │   └── table-detail-sheet.tsx # Order details
│   │
│   ├── theme-provider.tsx       # Dark/Light mode provider
│   │
│   └── ui/                      # Shadcn/ui components (40+ primitives)
│       ├── button.tsx
│       ├── card.tsx
│       ├── drawer.tsx
│       ├── dialog.tsx
│       └── ... (reusable components)
│
├── hooks/                        # Custom React hooks
│   ├── useMenu.ts               # Fetch menu from Google Sheets
│   ├── use-mobile.ts            # Mobile detection
│   └── use-toast.ts             # Toast notifications
│
├── lib/                          # Core utilities and state
│   ├── store.ts                 # Zustand store (global state)
│   ├── data.ts                  # Type definitions and mock data
│   ├── api.ts                   # Google Sheets API calls
│   ├── utils.ts                 # Helper functions
│   │
│   └── adapters/
│       └── sheetToMenuItem.ts   # Google Sheets → MenuItem transformer
│
├── public/                       # Static assets
│   └── images/                  # Product images
│
├── styles/                       # Global stylesheets
│   └── globals.css              # CSS variables
│
├── package.json                  # Dependencies
├── tsconfig.json                # TypeScript configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── next.config.mjs              # Next.js configuration
└── README.md                     # This file
```

---

## 💡 Architecture Highlights

### State Management (Zustand)
```typescript
// Global store for app-wide state
interface AppStore {
  mode: "client" | "waiter";
  tableNumber: number;
  order: CartItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
}

// Usage in components
const { order, addToCart } = useAppStore();
```

### Data Flow Architecture
```
Google Sheets
      ↓
useMenu hook (API polling)
      ↓
sheetToMenuItem adapter (transform)
      ↓
Zustand store (state management)
      ↓
Components (render UI)
```

### Dual-Mode Interface
```typescript
// Dynamic rendering based on mode
if (mode === "client") {
  return <ClientMode />;
} else {
  return <WaiterMode />;
}
```

---

## 🎯 Key Code Examples

### Zustand Store Setup
```typescript
import create from 'zustand';

export const useAppStore = create((set) => ({
  order: [],
  addToCart: (item: MenuItem) => set((state) => ({
    order: [...state.order, item]
  })),
  removeFromCart: (itemId: string) => set((state) => ({
    order: state.order.filter(item => item.id !== itemId)
  })),
}));
```

### Google Sheets Integration
```typescript
// Hook for fetching menu
export const useMenu = () => {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  
  useEffect(() => {
    fetchMenuFromSheets().then(setMenu);
  }, []);
  
  return menu;
};
```

### API Adapter Pattern
```typescript
// Transform raw Google Sheets data
export function sheetRowToMenuItem(row: SheetRow): MenuItem {
  return {
    id: generateStableId(row.nombre),
    name: row.nombre,
    price: row.precio,
    category: row.categoria,
    // ... other mappings
  };
}
```

---

## 🔄 Development Workflow

### Available Scripts
```bash
# Development with hot reload
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

### Code Quality
- TypeScript strict mode enabled
- ESLint for consistent code style
- Prettier formatting configured
- Component-driven development

---

## 📊 Order Processing Flow

```
Customer selects items
      ↓
Items added to Zustand store
      ↓
Cart updated in real-time
      ↓
Customer reviews order
      ↓
Order submitted
      ↓
Waiter notified
      ↓
Kitchen receives order
      ↓
Waiter tracks order status
      ↓
Customer pays
      ↓
Table marked ready
```

---

## 🔐 Security Considerations

### Current Implementation
- Password-protected waiter mode
- Environment variables for sensitive config
- Type-safe API interactions

### Production Recommendations
```typescript
// Implement JWT authentication
import jwt from 'jsonwebtoken';

export const authenticateWaiter = (password: string) => {
  if (password === process.env.WAITER_PASSWORD) {
    const token = jwt.sign(
      { role: 'waiter' },
      process.env.JWT_SECRET
    );
    return token;
  }
  throw new Error('Invalid credentials');
};
```

---

## 📊 Performance Metrics

### Lighthouse Targets
- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 90+
- **SEO**: 95

### Optimizations Applied
- ✅ Server-Side Rendering (SSR)
- ✅ Code splitting by route
- ✅ Zustand for minimal re-renders
- ✅ Image optimization
- ✅ CSS purging with Tailwind
- ✅ Lazy loading for components

---

## 🚀 Deployment

This project is optimized for **Vercel** serverless platform.

### Deploy to Vercel
1. Push code to GitHub
2. Connect repository to Vercel
3. Auto-deploy on every push

[Deploy Now →](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)

---

## 📝 Future Enhancements

- [ ] Database integration (Firebase, PostgreSQL)
- [ ] Payment processing (Stripe, MercadoPago)
- [ ] Kitchen display system (KDS)
- [ ] Delivery integration and tracking
- [ ] Inventory management system
- [ ] Staff scheduling and management
- [ ] Analytics and reporting dashboard
- [ ] SMS notifications for orders
- [ ] QR code table ordering
- [ ] Multi-location support
- [ ] Customer loyalty program
- [ ] Marketing automation tools

---

## 🤝 Contributing

This is a portfolio project, but suggestions and contributions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](./LICENSE) file for details.

---

## 👨‍💻 About the Developer

**Tomás Aguilar** | Full-Stack Developer  
📧 Email: [tomasaguilar.code@gmail.com](mailto:tomasaguilar.code@gmail.com)  
🔗 LinkedIn: [Profile](https://www.linkedin.com/in/tomás-aguilar-8b3603262)  
🐙 GitHub: [@To2003](https://github.com/To2003)  
🌐 Portfolio: [portfolio-website-to2003s-projects.vercel.app](https://portfolio-website-to2003s-projects.vercel.app/)

---

## 🎖️ Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Tailwind CSS](https://tailwindcss.com)
- [Shadcn/ui](https://ui.shadcn.com)
- [Google Sheets API](https://developers.google.com/sheets/api)
- [Vercel](https://vercel.com)

---

<br />

<div align="center">

**[⬆ Back to top](#-smashbar-website--restaurant-pos-system)**

</div>

---

<a id="spanish"></a>

# 🍔 Sitio Web SmashBar | Sistema POS de Restaurante

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js&logoColor=white&style=flat-square)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white&style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white&style=flat-square)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3-06B6D4?logo=tailwindcss&logoColor=white&style=flat-square)
![Zustand](https://img.shields.io/badge/Zustand-4-000000?logo=zustand&logoColor=white&style=flat-square)
![License](https://img.shields.io/badge/Licencia-MIT-green?style=flat-square)

🚀 **[Demo en Vivo →](https://smash-bar-website.vercel.app/)** | 📚 [Documentación](./docs) | 🐛 [Reportar Error](https://github.com/To2003/smashBar-website/issues)

> [🇺🇸 English](#-smashbar-website--restaurant-pos-system) | 🇪🇸 **Español**

---

## 📋 Sobre el Proyecto

**Sitio Web SmashBar** es un sistema avanzado de **Punto de Venta (POS)** y ordenamiento de restaurante construido con **Next.js 14**, **React 19** y **Zustand**. Este proyecto demuestra **arquitectura de nivel empresarial**, **gestión de estado complejo** y **lógica de negocio real** con interfaz dual para clientes y personal de espera.

Desarrollado como obra maestra del portafolio para demostrar experiencia en:
- ✅ Gestión de estado empresarial con Zustand
- ✅ Interfaces de doble modo (ordenamiento de clientes y gestión de personal)
- ✅ Rastreo de órdenes y notificaciones en tiempo real
- ✅ Integración de API Google Sheets para gestión dinámica del menú
- ✅ Arquitectura multi-dispositivo responsiva (desktop, tablet, móvil)
- ✅ Lógica de negocio compleja (gestión de carrito, procesamiento de órdenes)
- ✅ Patrones de adaptador de datos y transformaciones
- ✅ Desarrollo type-safe con TypeScript

---

## 🎯 Motivación (Mi Objetivo)

Este proyecto fue desarrollado como **vitrina de software empresarial** para demostrar **habilidades de desarrollo de nivel profesional** y está diseñado para mostrar madurez técnica a potenciales empleadores. Demuestra:

### 💼 Competencia Técnica
- Dominio de **gestión de estado moderno** (Zustand vs Context)
- **Sistemas en tiempo real** con polling y sincronización de datos
- **Integración de API** con servicios externos (Google Sheets)
- Implementación de **lógica de negocio compleja**
- **Arquitectura de interfaz dual** para múltiples roles de usuario
- **Seguridad de tipos** en toda la aplicación
- **Patrones de componentes escalables** para aplicaciones empresariales

### 🎓 Logros de Aprendizaje
- Construcción de sistemas POS listos para producción
- Patrones avanzados de gestión de estado
- Integración de API y transformación de datos
- Implementación de requisitos de negocio reales
- Control de acceso multi-rol y permisos
- Optimización de rendimiento en aplicaciones complejas

### 🚀 Listo para Trabajar
Este proyecto demuestra que estoy capacitado para:
- Trabajar en aplicaciones de nivel empresarial
- Gestionar estado y lógica de negocio complejos
- Integrar APIs y servicios de terceros
- Diseñar sistemas para múltiples tipos de usuarios
- Construir aplicaciones escalables y mantenibles
- Trabajar en soluciones de software B2B

---

## ✨ Funcionalidades Clave

### 👥 Modo Cliente (Interfaz de Cliente)
- 📋 **Menú Dinámico** - Menú en tiempo real desde Google Sheets API
- 🔍 **Filtrado por Categoría** - Explora por Hamburguesas, Bebidas, Postres, etc.
- 🎨 **Personalización de Artículos** - Agrega/elimina ingredientes, opciones extra
- 🛒 **Carrito de Compras** - Agrega artículos con gestión de cantidades
- 💾 **Resumen de Orden** - Revisa artículos antes del checkout
- 📱 **Optimizado para Táctil** - Diseño mobile-first

### 👨‍💼 Modo Camarero (Interfaz de Personal)
- 📊 **Gestión de Mesas** - Ve estado de todas las mesas en tiempo real
- 🔔 **Notificaciones de Servicio** - Sistema de llamada de camarero con alertas
- 💰 **Gestión de Cuentas** - Genera y rastrea cuentas
- ✅ **Rastreo de Órdenes** - Monitorea órdenes de cocina
- 🎯 **Acciones Rápidas** - Asignación rápida de mesas
- 📈 **Historial de Órdenes** - Rastrea órdenes completadas

### 🔧 Características de Admin
- ⚙️ **Integración Google Sheets** - Gestión de menú mediante hoja de cálculo
- 📈 **Sincronización en Tiempo Real** - Los cambios del menú se sincronizan automáticamente
- 🔐 **Acceso Seguro** - Control de acceso basado en roles
- 📱 **Multi-Dispositivo** - Funciona en desktop, tablet, smartphone
- 💾 **Persistencia de Datos** - Almacén Zustand con localStorage

---

## 🚀 Stack Tecnológico

### Framework y Lenguaje
- **Next.js 14** - Framework React con App Router y SSR
- **React 19** - Última versión de React con mejor rendimiento
- **TypeScript 5** - JavaScript type-safe para confiabilidad

### Gestión de Estado
- **Zustand 4** - Gestión de estado ligera y performante
- **Immer** - Actualizaciones de estado inmutable
- **Integración localStorage** - Persistencia de estado

### Estilos y UI
- **Tailwind CSS 3** - Framework CSS utility-first
- **Componentes Shadcn/ui** - Librería accesible de componentes
- **Lucide React** - Librería moderna de iconos
- **Next.js Themes** - Soporte de modo oscuro/claro

### Integración Backend
- **Google Sheets API** - Fuente de datos del menú
- **Custom Hooks** - useMenu para polling de API
- **Patrón Adapter** - Transformación de datos (sheetToMenuItem)

### Herramientas de Desarrollo
- **ESLint** - Calidad y consistencia de código
- **TypeScript Strict Mode** - Seguridad máxima de tipos
- **PostCSS & Autoprefixer** - Procesamiento de CSS
- **pnpm** - Gestor de paquetes rápido

### Despliegue
- **Vercel** - Hosting serverless para Next.js
- **Edge Functions** - Rutas API de baja latencia

---

## 🚀 Instalación y Uso

### Requisitos Previos
- **Node.js** 18.17 o superior
- **npm**, **yarn**, o **pnpm** como gestor de paquetes
- **Credenciales API Google Sheets** (para integración de menú)

### Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/To2003/smashBar-website.git
   cd smashBar-website
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   # o
   pnpm install
   ```

3. **Configurar variables de ambiente**
   ```bash
   cp .env.example .env.local
   
   # Agrega tus credenciales de API Google Sheets:
   NEXT_PUBLIC_GOOGLE_SHEETS_ID=tu_id_de_hoja
   GOOGLE_API_KEY=tu_clave_api
   NEXT_PUBLIC_WAITER_PASSWORD=contraseña_segura
   ```

4. **Ejecutar servidor de desarrollo**
   ```bash
   npm run dev
   # o
   pnpm dev
   ```
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

5. **Construir para producción**
   ```bash
   npm run build
   npm start
   ```

---

## 📂 Estructura del Proyecto

```
smashBar-website/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Layout raíz
│   ├── page.tsx                 # Punto de entrada modo cliente
│   ├── globals.css              # Estilos globales
│   └── waiter/
│       └── page.tsx             # Punto de entrada modo camarero
│
├── components/                   # Componentes React
│   ├── client/                   # Componentes de cliente
│   │   ├── client-mode.tsx      # Interfaz principal del cliente
│   │   ├── product-card.tsx     # Tarjeta de artículo de menú
│   │   ├── customization-drawer.tsx # Personalización de artículos
│   │   ├── order-drawer.tsx     # Carrito de compras
│   │   ├── floating-action-bar.tsx # Icono/botón de carrito
│   │   └── notification-banner.tsx
│   │
│   ├── waiter/                   # Componentes de personal
│   │   ├── waiter-mode.tsx      # Interfaz principal del camarero
│   │   ├── table-card.tsx       # Tarjeta de estado de mesa
│   │   └── table-detail-sheet.tsx # Detalles de orden
│   │
│   ├── theme-provider.tsx       # Proveedor de modo oscuro/claro
│   │
│   └── ui/                      # Componentes Shadcn/ui (40+ primitivos)
│       ├── button.tsx
│       ├── card.tsx
│       ├── drawer.tsx
│       ├── dialog.tsx
│       └── ... (componentes reutilizables)
│
├── hooks/                        # Custom React hooks
│   ├── useMenu.ts               # Obtener menú de Google Sheets
│   ├── use-mobile.ts            # Detección móvil
│   └── use-toast.ts             # Notificaciones toast
│
├── lib/                          # Utilidades y estado principales
│   ├── store.ts                 # Almacén Zustand (estado global)
│   ├── data.ts                  # Definiciones de tipos y datos mock
│   ├── api.ts                   # Llamadas API a Google Sheets
│   ├── utils.ts                 # Funciones auxiliares
│   │
│   └── adapters/
│       └── sheetToMenuItem.ts   # Transformador Google Sheets → MenuItem
│
├── public/                       # Activos estáticos
│   └── images/                  # Imágenes de productos
│
├── styles/                       # Hojas de estilo globales
│   └── globals.css              # Variables CSS
│
├── package.json                  # Dependencias
├── tsconfig.json                # Configuración TypeScript
├── tailwind.config.ts           # Configuración Tailwind CSS
├── next.config.mjs              # Configuración Next.js
└── README.md                     # Este archivo
```

---

## 💡 Aspectos Destacados de la Arquitectura

### Gestión de Estado (Zustand)
```typescript
// Almacén global para estado de app
interface AppStore {
  mode: "client" | "waiter";
  tableNumber: number;
  order: CartItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
}

// Uso en componentes
const { order, addToCart } = useAppStore();
```

### Arquitectura de Flujo de Datos
```
Google Sheets
      ↓
Hook useMenu (polling de API)
      ↓
Adaptador sheetToMenuItem (transformar)
      ↓
Almacén Zustand (gestión de estado)
      ↓
Componentes (renderizar UI)
```

### Interfaz de Doble Modo
```typescript
// Renderizado dinámico basado en modo
if (mode === "client") {
  return <ClientMode />;
} else {
  return <WaiterMode />;
}
```

---

## 🎯 Ejemplos de Código Clave

### Configuración de Almacén Zustand
```typescript
import create from 'zustand';

export const useAppStore = create((set) => ({
  order: [],
  addToCart: (item: MenuItem) => set((state) => ({
    order: [...state.order, item]
  })),
  removeFromCart: (itemId: string) => set((state) => ({
    order: state.order.filter(item => item.id !== itemId)
  })),
}));
```

### Integración con Google Sheets
```typescript
// Hook para obtener menú
export const useMenu = () => {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  
  useEffect(() => {
    fetchMenuFromSheets().then(setMenu);
  }, []);
  
  return menu;
};
```

### Patrón de Adaptador de API
```typescript
// Transformar datos brutos de Google Sheets
export function sheetRowToMenuItem(row: SheetRow): MenuItem {
  return {
    id: generateStableId(row.nombre),
    name: row.nombre,
    price: row.precio,
    category: row.categoria,
    // ... otros mappings
  };
}
```

---

## 🔄 Flujo de Desarrollo

### Scripts Disponibles
```bash
# Desarrollo con hot reload
npm run dev

# Build de producción
npm run build

# Iniciar servidor de producción
npm start

# Lint de código
npm run lint
```

### Calidad de Código
- TypeScript en modo estricto habilitado
- ESLint para consistencia de estilo
- Formateo Prettier configurado
- Desarrollo orientado a componentes

---

## 📊 Flujo de Procesamiento de Órdenes

```
Cliente selecciona artículos
      ↓
Artículos agregados al almacén Zustand
      ↓
Carrito se actualiza en tiempo real
      ↓
Cliente revisa orden
      ↓
Orden enviada
      ↓
Camarero notificado
      ↓
Cocina recibe orden
      ↓
Camarero rastrea estado
      ↓
Cliente paga
      ↓
Mesa marcada lista
```

---

## 🔐 Consideraciones de Seguridad

### Implementación Actual
- Modo camarero protegido por contraseña
- Variables de ambiente para configuración sensible
- Interacciones API type-safe

### Recomendaciones para Producción
```typescript
// Implementar autenticación JWT
import jwt from 'jsonwebtoken';

export const authenticateWaiter = (password: string) => {
  if (password === process.env.WAITER_PASSWORD) {
    const token = jwt.sign(
      { role: 'waiter' },
      process.env.JWT_SECRET
    );
    return token;
  }
  throw new Error('Credenciales inválidas');
};
```

---

## 📊 Métricas de Rendimiento

### Objetivos Lighthouse
- **Rendimiento**: 90+
- **Accesibilidad**: 95+
- **Mejores Prácticas**: 90+
- **SEO**: 95

### Optimizaciones Aplicadas
- ✅ Renderización del lado del servidor (SSR)
- ✅ Code splitting por ruta
- ✅ Zustand para re-renders mínimos
- ✅ Optimización de imágenes
- ✅ Purga de CSS con Tailwind
- ✅ Lazy loading de componentes

---

## 🚀 Despliegue

Este proyecto está optimizado para la plataforma serverless **Vercel**.

### Desplegar en Vercel
1. Push del código a GitHub
2. Conectar repositorio a Vercel
3. Auto-deploy en cada push

[Desplegar Ahora →](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)

---

## 📝 Mejoras Futuras

- [ ] Integración de base de datos (Firebase, PostgreSQL)
- [ ] Procesamiento de pagos (Stripe, MercadoPago)
- [ ] Sistema de visualización de cocina (KDS)
- [ ] Integración de entrega y rastreo
- [ ] Sistema de gestión de inventario
- [ ] Programación y gestión de personal
- [ ] Dashboard de reportes y analytics
- [ ] Notificaciones por SMS para órdenes
- [ ] Ordenamiento por código QR en mesa
- [ ] Soporte multi-ubicación
- [ ] Programa de fidelización de clientes
- [ ] Herramientas de automatización de marketing

---

## 🤝 Contribuciones

Este es un proyecto de portafolio, ¡pero sugerencias y contribuciones son bienvenidas!

1. Fork del repositorio
2. Crear rama de feature (`git checkout -b feature/amazing-feature`)
3. Commit de cambios (`git commit -m 'Add amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abrir un Pull Request

---

## 📄 Licencia

Este proyecto está bajo la licencia **MIT** - ver el archivo [LICENSE](./LICENSE) para detalles.

---

## 👨‍💻 Sobre el Desarrollador

**Tomás Aguilar** | Desarrollador Full-Stack  
📧 Email: [tomasaguilar.code@gmail.com](mailto:tomasaguilar.code@gmail.com)  
🔗 LinkedIn: [Perfil](https://www.linkedin.com/in/tomás-aguilar-8b3603262)  
🐙 GitHub: [@To2003](https://github.com/To2003)  
🌐 Portafolio: [portfolio-website-to2003s-projects.vercel.app](https://portfolio-website-to2003s-projects.vercel.app/)

---

## 🎖️ Agradecimientos

- [Documentación de Next.js](https://nextjs.org/docs)
- [Documentación de React](https://react.dev)
- [Documentación de Zustand](https://github.com/pmndrs/zustand)
- [Tailwind CSS](https://tailwindcss.com)
- [Shadcn/ui](https://ui.shadcn.com)
- [Google Sheets API](https://developers.google.com/sheets/api)
- [Vercel](https://vercel.com)

---

<br />

<div align="center">

**[⬆ Volver al inicio](#-sitio-web-smashbar--sistema-pos-de-restaurante)**

</div>

---

<div align="center">

### Desarrollado con ❤️ por [Tomás Aguilar](https://github.com/To2003)

🌐 [Portafolio](https://portfolio-website-to2003s-projects.vercel.app/) • 📧 [Email](mailto:tomasaguilar.code@gmail.com) • 🔗 [LinkedIn](https://www.linkedin.com/in/tomás-aguilar-8b3603262) • 🐙 [GitHub](https://github.com/To2003)

</div>
