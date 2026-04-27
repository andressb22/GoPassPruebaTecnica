# 🚀 GoPass Prueba Técnica

Este proyecto está dividido en dos partes:

* 🖥️ **Frontend (React + Vite)**
* ⚙️ **Backend (Node.js + Prisma + PostgreSQL)**

---

# 🖥️ Frontend

## 📦 Instalación

```bash
npm install
```

---

## ⚙️ Configuración

Debes configurar la URL de la API en el archivo:

```bash
src/const.ts
```

Ejemplo:

```ts
export const API_URL = "http://localhost:3000/";
```

---

## ▶️ Ejecutar el proyecto

```bash
npm run dev
```

La aplicación estará disponible en:

```bash
http://localhost:5173
```

---

# ⚙️ Backend

## 📦 Instalación

```bash
npm install
```

---

## ⚙️ Variables de entorno

Debes crear un archivo `.env` en la raíz del backend con:

```env
DATABASE_URL=
JWT_SECRET=
```

Ejemplo:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/db_name"
JWT_SECRET="supersecret"
```

---

## 🗄️ Ejecutar migraciones (crear tablas)

```bash
npx prisma migrate dev
```

---

## 🌱 Ejecutar seed (datos iniciales)

```bash
npx ts-node prisma/seed.ts
```

---

## ▶️ Ejecutar el backend

```bash
npm run dev
```

El servidor estará disponible en:

```bash
http://localhost:3000
```

---

# 🧠 Notas importantes

* Asegúrate de que la base de datos esté creada antes de ejecutar las migraciones.
* El frontend depende de la URL configurada en `const.ts`.
* Ejecuta primero el backend antes de levantar el frontend.

---

# 📌 Tecnologías

* React + Vite
* Node.js
* Prisma ORM
* PostgreSQL

---
