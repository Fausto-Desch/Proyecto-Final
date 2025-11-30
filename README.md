# ⚽ **Plataforma de Gestión y Reserva de Canchas --- Frontend**

### 📌 *Proyecto Final --- Tecnicatura Universitaria en Programación (TUP)*

Este repositorio contiene el **Frontend** de la plataforma web para la
gestión y reserva de canchas deportivas en Bahía Blanca y alrededores.
El proyecto moderniza y digitaliza procesos que tradicionalmente se
realizaban por **WhatsApp o Excel**, centralizando operaciones y
mejorando la experiencia tanto de jugadores como de administradores de
clubes.

------------------------------------------------------------------------

# 📖 **Descripción General**

La aplicación permite que jugadores vean disponibilidad, reserven turnos
y gestionen sus horarios, mientras que los administradores de clubes
pueden controlar canchas, precios, agenda diaria y reservas.

✔ Reservas online en tiempo real\
✔ Gestión completa de clubes y canchas\
✔ Organización automática del cronograma\
✔ Interfaz moderna y adaptable

------------------------------------------------------------------------

# 🔐 **Usuarios de Prueba**

### 👤 **Jugador / Usuario**

![Login](./screenshots/Captura-2025-11-30-184908.png)

-   **Email:** `user@test.com`
-   **Contraseña:** `user123`

### 🛠️ **Administrador**

-   **Email:** `admin@test.com`
-   **Contraseña:** `admin123`

------------------------------------------------------------------------

# 🧑‍🤝‍🧑 **Roles y Funcionalidades**

## ⚽ **Rol Jugador --- User**

Acceso desde: `/login` → `/home-user`

El usuario puede: - 🔍 Buscar canchas\
- 📅 Ver disponibilidad\
- 🕒 Reservar horarios\
- 🚪 Cerrar sesión
#![alt text](image-8.png)
#![alt text](image-9.png)
#![alt text](image-10.png)
#![alt text](image-11.png)

`![Home User](./screenshots/home-user.png)`

------------------------------------------------------------------------

## 🏟️ **Rol Administrador --- Admin**

Acceso desde: `/home-admin`

El Administrador puede: - Gestionar Clubes\
- Administrar Canchas\
- Manejar Agenda diaria\
- Confirmar o eliminar reservas\
- Crear turnos manualmente\
- Gestionar horarios en detalle

#![alt text](image-1.png)
#![alt text](image-2.png)
#![alt text](image-3.png)
#![alt text](image-4.png)
#![alt text](image-5.png)
#![alt text](image-6.png)
#![alt text](image-7.png)


`![Home Admin](./screenshots/home-admin.png)`\
`![Horarios Admin](./screenshots/horarios-admin.png)`

------------------------------------------------------------------------

# 🖥️ **Tecnologías Utilizadas**

-   React 18\
-   TypeScript\
-   Vite\
-   TailwindCSS\
-   Lucide React\
-   React Router DOM\
-   Context API

------------------------------------------------------------------------

# 📂 **Estructura**

    src/
     ├── components/
     ├── pages/
     ├── context/
     ├── routes/
     ├── services/
     ├── types/
     └── App.tsx

------------------------------------------------------------------------

# 🛠️ Instalación

``` bash
git clone <URL_DEL_REPOSITORIO>
npm install
npm run dev
```

------------------------------------------------------------------------

# 📸 **Espacios para Capturas**

-   Login\
-   Home Usuario\
-   Home Admin\
-   Gestión de Canchas\
-   Gestión de Horarios\
-   Reserva desde el usuario\
-   Responsive

------------------------------------------------------------------------

# 📌 Notas Finales

-   Integración completa con backend Node/Express\
-   Proyecto presentado como Trabajo Final de la TUP\
-   Diseño responsivo, pensado para uso real

