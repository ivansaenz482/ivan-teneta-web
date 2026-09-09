# NovaSys Digital — Página Web Profesional

Sitio web profesional de **NovaSys Digital** (Ingeniería en Tecnología de la Información),
con tienda virtual, panel de administración en la nube, sincronización entre dispositivos
y publicación automática en **GitHub Pages**.

## ✨ Funcionalidades

- **Landing profesional**: héroe, servicios, tecnologías, galería, quiénes somos, misión y contacto.
- **Tienda virtual**: productos con categorías, filtros, precios, etiquetas e imágenes propias,
  con pedido directo por WhatsApp.
- **Panel de administración** (`#admin`): dashboard con estadísticas, gestión de productos,
  categorías, redes sociales y logo. Protegido con contraseña.
- **Sincronización en la nube**: el contenido de la tienda se guarda en **Firebase Firestore**
  y las imágenes en **Firebase Storage**, por lo que se actualizan para todos los visitantes.
- **Estadísticas en la nube**: visitas, vistas de productos y clics a WhatsApp se acumulan por
  separado para que las visitas nunca borren los cambios del administrador.
- **Efectos premium**: animaciones GSAP, paralaje, BlobCursor, Sparkles, Spotlight y textos brillantes.
- **Código QR**: sección imprimible que enlaza a la página.

## 🛠️ Stack

- [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org/)
- [Vite 8](https://vitejs.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Firebase](https://firebase.google.com/) (Firestore + Storage)
- [Framer Motion](https://motion.dev/) + [GSAP](https://gsap.com/)
- [lucide-react](https://lucide.dev/) (iconos)

## 🚀 Desarrollo

```bash
npm install     # instala dependencias
npm run dev     # servidor local
npm run build   # build de producción
npm run lint    # linter (oxlint)
```

## 📦 Publicación

El repositorio incluye un workflow de GitHub Actions (`.github/workflows/deploy.yml`) que publica
automáticamente la carpeta `dist` en **GitHub Pages** al hacer push a la rama `main`.

La página queda disponible en:

```
https://ivansaenz482.github.io/ivan-teneta-web/
```

## 🔐 Configuración de Firebase

Requisitos previos en la consola de [Firebase](https://console.firebase.google.com/):

1. **Crea un proyecto** (p. ej. `ivan-teneta-web`).
2. **Habilita Firestore Database** (modo de producción).
3. **Habilita Storage** (para las imágenes de los productos).
4. Copia la configuración web (apiKey, authDomain, projectId, etc.) en
   `src/lib/firebaseConfig.ts`.
5. Pega las reglas de `firestore.rules` en **Firestore → Rules** y las de
   `storage.rules` en **Storage → Rules**.

### Panel de administración

- Entra a `https://<dominio>/#admin`.
- La contraseña por defecto es `admin123` (cámbiala en la pestaña **Seguridad**).
- Desde ahí puedes subir imágenes, fijar precios, crear categorías y editar textos y redes.

> **Importante por seguridad**: cambiar la contraseña por defecto. Las reglas de este proyecto
> permiten escritura pública para el buen funcionamiento del sitio estático; si quieres mayor
> protección, restríngelas con Firebase Authentication.

## 🧱 Estructura

```
src/
  components/      # secciones de la página y panel admin
  lib/
    config.tsx     # estado global + sincronización (contexto)
    cloud.ts       # Firestore + Firebase Storage (lectura/escritura/imágenes)
    firebaseConfig.ts
    productImages.ts
  data.ts          # datos por defecto (perfil, productos, categorías)
```

## 📄 Licencia

Proyecto privado de NovaSys Digital.
