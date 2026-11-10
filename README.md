# Pokédex

Aplicación web desarrollada como proyecto final del bootcamp de Desarrollo Web de TripleTen. Permite explorar Pokémon usando la [PokéAPI](https://pokeapi.co/) y consultar información básica de cada uno en tarjetas.

## Funcionalidades

- Consulta y muestra el catálogo de Pokémon.
- Busca Pokémon por nombre.
- Navega por páginas de 20 resultados y avanza o retrocede en saltos de 100.
- Marca Pokémon como favoritos y filtra la vista para mostrar solo esos favoritos.
- Guarda los favoritos en `localStorage` para conservarlos al recargar la página en el mismo navegador.
- Incluye las páginas **Inicio** y **Sobre el autor**, con diseño adaptable a pantallas pequeñas.

## Requisitos

- Node.js `20.19` o posterior, o `22.12` o posterior.
- npm (incluido con Node.js).
- Conexión a Internet para consultar la PokéAPI.

## Instalación y ejecución

Los comandos se ejecutan desde la carpeta `client`, donde está la aplicación:

```bash
cd client
npm ci
npm run dev
```

Vite mostrará la dirección local en la terminal. Ábrela en el navegador para usar la aplicación.

## Comandos disponibles

Desde `client/`:

| Comando           | Acción                                                                                |
| ----------------- | ------------------------------------------------------------------------------------- |
| `npm run dev`     | Inicia el servidor de desarrollo.                                                     |
| `npm run lint`    | Ejecuta ESLint sobre el cliente.                                                      |
| `npm run build`   | Comprueba los tipos de TypeScript y genera la versión de producción en `client/dist`. |
| `npm run preview` | Sirve localmente la versión compilada; primero ejecuta `npm run build`.               |

## Variables de entorno

La aplicación no requiere variables de entorno. La dirección base de PokéAPI está definida en `client/src/utils/api.ts`.

## Estructura principal

```text
client/
├── src/
│   ├── components/   # App, Header, Main, About, Footer y Card
│   ├── blocks/       # Estilos por componente
│   ├── types/        # Tipos de TypeScript
│   ├── utils/        # Cliente para las solicitudes a PokéAPI
│   └── images/       # Imágenes e iconos de la aplicación
├── package.json      # Dependencias y comandos del cliente
└── vite.config.ts
```

## Tecnologías

React, TypeScript, React Router, Vite y CSS. Los datos de Pokémon provienen de [PokéAPI](https://pokeapi.co/); los favoritos se almacenan localmente en el navegador.

## Demo en línea

Versión publicada de frontend: https://project-poke-api-app-stage-frontend-git-stage-frontend-vmsv.vercel.app
