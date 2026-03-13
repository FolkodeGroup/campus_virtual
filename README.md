# Campus Virtual - Monorepo

![CI Pipeline](https://github.com/FolkodeGroup/campus_virtual/actions/workflows/ci.yml/badge.svg)

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
- **Desarrollo con Docker**: `npm run docker:dev`
- **Construcción**: `npm run build`
- **Pruebas**: `npm test`
- **Linting**: `npm run lint`

## Desarrollo con Docker

Para levantar el entorno completo (Base de Datos + Backend + Frontend) con un solo comando:

1. Crea tu archivo `.env` en la raíz (puedes copiar el `.env.example`).
2. Ejecuta:
   ```bash
   npm run docker:dev
   ```

Esto levantará:
- **PostgreSQL**: Puerto 5432
- **Backend**: http://localhost:3000
- **Frontend**: http://localhost:5173

Los volúmenes están configurados para que los cambios en el código local se reflejen automáticamente en los contenedores (Hot Reload).

## Variables de Entorno

El proyecto utiliza un archivo `.env` en la raíz para centralizar la configuración. Consulta [.env.example](.env.example) para ver la lista completa.

### Variables Requeridas (Backend)
- `DATABASE_URL`: URL de conexión a PostgreSQL.
- `JWT_SECRET`: Llave secreta para tokens de autenticación.
- `PORT`: Puerto del servidor (default: 3000).
- `NODE_ENV`: Entorno de ejecución (`development`, `production`).

### Variables de Docker
- `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`: Credenciales de la base de datos.
- `DB_PORT`: Puerto expuesto de la DB.

## Gestión de Workspaces

Para ejecutar comandos en un workspace específico:

```bash
# Ejemplo para el frontend
npm run <script> -w frontend

# Ejemplo para el backend
npm run <script> -w backend
```

## Gestión visual del proyecto

El seguimiento visual y la organización de tareas se realiza mediante el [GitHub Project Campus Virtual](https://github.com/orgs/FolkodeGroup/projects/6) (ProjectV2).

### Columnas estándar
- **En Progreso**: Tareas en desarrollo.
- **En Revisión**: Tareas listas para revisión o QA.
- **Hecho**: Tareas completadas.

### Milestones
- **Fase 1 — 13 cursos**: Primer objetivo, incluye la creación y gestión de 13 cursos. [Milestone en GitHub](https://github.com/FolkodeGroup/campus_virtual/milestone/1)
- **Fase 2 — 30 cursos**: Expansión a 30 cursos. [Milestone en GitHub](https://github.com/FolkodeGroup/campus_virtual/milestone/2)

### Organización de issues
Las issues se vinculan automáticamente al Project y a los milestones según su fase. Puedes ver el estado y avance en el tablero visual.

---
*FolKode Group 2026*
