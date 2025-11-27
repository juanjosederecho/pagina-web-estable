# Guía: Cómo Compartir tu Página Web Editable

## Estado Actual ✅
Tu página ya funciona localmente. Los cambios se guardan en tu navegador (LocalStorage).

## Para Compartir con Otros (2 opciones)

### Opción 1: Solo Hosting (Cada usuario ve su propia versión)
Si subes la página a Netlify/Vercel tal como está, funcionará. Pero cada usuario verá y editará su **propia copia** (no verán los cambios de los demás).

**Pasos:**
1. Sube el código a GitHub
2. Conecta GitHub con [Netlify](https://netlify.com) o [Vercel](https://vercel.com)
3. Despliega automáticamente

### Opción 2: Colaboración en Tiempo Real (Como Padlet/Jamboard) ⭐
Todos los usuarios verán y editarán la **misma página** en tiempo real.

**Pasos:**

#### 1. Crear Proyecto en Firebase (5 minutos)
1. Ve a [console.firebase.google.com](https://console.firebase.google.com/)
2. Haz clic en "Crear un proyecto"
3. Nombre: lo que quieras (ej: "mi-web-editable")
4. **Desactiva** Google Analytics (no lo necesitamos)
5. Crea el proyecto

#### 2. Configurar Firestore
1. En el menú lateral, ve a **"Firestore Database"**
2. Clic en **"Create database"**
3. Selecciona **"Start in test mode"** (para pruebas, IMPORTANTE: es temporal)
4. Elige la ubicación más cercana (ej: `us-east1`)
5. Crea la base de datos

#### 3. Obtener las Claves
1. En el menú, ve a **⚙️ Project Settings**
2. Baja hasta "Your apps"
3. Haz clic en el ícono **</>** (Web)
4. Registra la app (ponle un nombre, ej: "web-app")
5. Verás algo como esto:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto-id",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

#### 4. Configurar en tu Proyecto
1. Crea un archivo `.env.local` en la carpeta raíz del proyecto:

```
VITE_FIREBASE_API_KEY=AIzaSyC...
VITE_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu-proyecto-id
VITE_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

2. **Importante**: Agrega `.env.local` al archivo `.gitignore` para no subir las claves a GitHub públicamente.

3. Reinicia el servidor (`npm run dev`)

#### 5. Desplegar a Internet
- **Netlify**: Configura Environment Variables en el dashboard
- **Vercel**: Agrega las variables de entorno en Settings → Environment Variables

## ⚠️ Seguridad Importante
Las reglas actuales de Firestore están en "test mode" (cualquiera puede leer/escribir). Esto es solo para pruebas iniciales.

Para producción, debes configurar reglas más seguras. Ejemplo básico:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /pages/{document=**} {
      allow read: if true;  // Todos pueden ver
      allow write: if true; // Todos pueden editar (como Padlet)
    }
  }
}
```

Si quieres controlar quién puede editar, necesitarías agregar autenticación (Firebase Auth).

## Resumen de Costos 💰
- **Firebase**: Gratis hasta ~50,000 lecturas/día y 20,000 escrituras/día
- **Netlify/Vercel**: Gratis para proyectos personales

Para un proyecto pequeño/personal, TODO es gratis.
