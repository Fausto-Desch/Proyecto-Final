# ⚽ Plataforma de Gestión y Reserva de Canchas — Frontend

## 📌 Proyecto Final — Tecnicatura Universitaria en Programación

---

## 📖 Descripción

Este repositorio contiene el **Frontend** del Proyecto Final académico.  
La aplicación es una plataforma web moderna que digitaliza la gestión de **reservas deportivas** en Bahía Blanca y alrededores.

El sistema reemplaza procesos manuales (Excel/WhatsApp) permitiendo:

✅ Reservas online en tiempo real  
✅ Administración centralizada de clubes  
✅ Optimización del flujo operativo

---

## 🚀 Tecnologías Utilizadas

### **Core**
- React.js 18
- TypeScript
- Vite

### **UI & Estilos**
- Tailwind CSS 3
- Lucide React
- Clsx + Tailwind-merge

### **Routing & Estado**
- React Router DOM 6
- Context API / Custom Hooks *(en uso / a implementar)*

---

## 🔐 Roles y Funcionalidades

### 👤 **Usuario Jugador — `User`**
**Acceso:** `/user`

- Buscador inteligente por ubicación, fecha y deporte
- Disponibilidad en tiempo real
- Reserva de turnos *(en desarrollo)*
- Historial de reservas *(próximamente)*

### 🏟️ **Administrador de Club — `Admin`**
**Acceso:** `/admin` y `/clubes`

- ABM de clubes
- Gestión de canchas, precios y características
- Agenda completa, bloqueo de horarios, reservas manuales

---

## 📂 Estructura del Proyecto

src/
├── components/
│ ├── layout/
│ ├── ui/
│ ├── ProtectedRoute.tsx
│ └── AuthenticatedRoute.tsx
├── pages/
│ ├── Login.tsx
│ ├── Home.tsx
│ ├── UserPage.tsx
│ ├── AdminPage.tsx
│ └── Clubes.tsx
├── routes/
├── services/
├── types/
└── App.tsx

---
---

## 🛠️ Instalación y Ejecución

### 1️⃣ Clonar el repositorio
---
```bash
git clone <URL_DEL_REPOSITORIO>
cd Proyecto-Final
2️⃣ Instalar dependencias

Requiere Node.js 16+

npm install

3️⃣ Ejecutar en desarrollo
npm run dev


Aplicación disponible en:
👉 http://localhost:5173/
```
---


