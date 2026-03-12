# Campus Virtual - Monorepo

Este es el repositorio central para el proyecto del Campus Virtual, gestionado como un monorepo utilizando **npm workspaces**.

## Estructura del Proyecto

- `frontend/`: Aplicación cliente.
- `backend/`: Aplicación servidora / API.
- `scripts/`: Scripts de utilidad para gestión del proyecto.
- `docs/`: Documentación del proyecto.

## Requisitos Previos

- **Node.js**: v20.x (se incluye `.nvmrc`).
- **npm**: v7+ (soporte nativo para workspaces).

## Configuración Inicial

1. Asegúrate de estar usando la versión correcta de Node:
   ```bash
   nvm use
   ```

2. Instalar todas las dependencias (raíz y workspaces):
   ```bash
   npm install
   ```

## Scripts Disponibles (desde la raíz)

Los siguientes comandos ejecutan el script correspondiente en todos los workspaces que lo tengan definido:

- **Desarrollo**: `npm run dev`
- **Construcción**: `npm run build`
- **Pruebas**: `npm test`
- **Linting**: `npm run lint`

## Gestión de Workspaces

Para ejecutar comandos en un workspace específico:

```bash
# Ejemplo para el frontend
npm run <script> -w frontend

# Ejemplo para el backend
npm run <script> -w backend
```

---
*FolKode Group 2026*
