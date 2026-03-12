# Campus Virtual Escolar — Issues Atómicas

> **Sistema de puntajes:** Cada issue tiene un puntaje según complejidad, tiempo estimado y dificultad algorítmica.
> Todos los issues siguen el formato estándar con `PUNTAJE: <valor>` para que el sistema de GitHub Actions lo registre automáticamente.
>
> **Mapeo de usuarios:** `folkodegroup` suma puntajes para `dgimenezdeveloper`.

---

## ETIQUETAS SUGERIDAS PARA EL PROYECTO

- `SETUP` — Inicialización, configuración, infraestructura
- `BACKEND` — Lógica del servidor, API, base de datos
- `FRONTEND` — UI, componentes, vistas
- `DOCS` — Documentación, README, guías
- `AUTH` — Autenticación, autorización, roles
- `TESTING` — Tests unitarios, integración, E2E
- `DEVOPS` — CI/CD, Docker, despliegue
- `FEATURE` — Nueva funcionalidad
- `BUG` — Corrección de errores

---

## FASE 0 — SETUP E INFRAESTRUCTURA

---

### ISSUE-001: Inicialización del monorepo con workspaces (package.json raíz)

**DESCRIPCIÓN:**  
Crear la estructura base del monorepo con un único `package.json` y `package-lock.json` en la raíz que gestione tanto el frontend como el backend mediante npm workspaces. Incluir scripts raíz para instalar, buildear y correr ambos proyectos desde la raíz.

**RESULTADOS ESPERADOS:**  
- [ ] `package.json` raíz con `workspaces: ["frontend", "backend"]` configurado.
- [ ] Scripts raíz: `dev`, `build`, `test`, `lint` que ejecuten los workspaces.
- [ ] `README.md` de raíz con instrucciones básicas de arranque.
- [ ] `.gitignore` configurado correctamente para Node.js + monorepo.
- [ ] `.nvmrc` con versión de Node.js (20.x).

**PUNTAJE:**  
80

---

### ISSUE-002: Setup del frontend con Vite + React + TypeScript + ESLint + Prettier

**DESCRIPCIÓN:**  
Inicializar el proyecto frontend en la carpeta `frontend/` usando Vite, React 18, TypeScript, ESLint y Prettier. Configurar paths aliases de TypeScript (`@/`) y variables de entorno de Vite.

**RESULTADOS ESPERADOS:**  
- [ ] Proyecto Vite + React + TypeScript inicializado en `frontend/`.
- [ ] ESLint configurado con reglas para React + TypeScript.
- [ ] Prettier configurado con reglas estándar.
- [ ] Path alias `@/` apuntando a `frontend/src/` configurado.
- [ ] `.env.example` con variables necesarias documentadas.
- [ ] El proyecto corre correctamente con `npm run dev` desde la raíz.

**PUNTAJE:**  
60

---

### ISSUE-003: Setup del backend con Node.js + Express + TypeScript

**DESCRIPCIÓN:**  
Inicializar el proyecto backend en la carpeta `backend/` usando Node.js, Express y TypeScript. Configurar estructura modular de carpetas, nodemon para desarrollo y compilación TypeScript.

**RESULTADOS ESPERADOS:**  
- [ ] Proyecto Node.js + Express + TypeScript inicializado en `backend/`.
- [ ] Estructura de carpetas: `src/controllers/`, `src/routes/`, `src/services/`, `src/models/`, `src/middlewares/`, `src/utils/`.
- [ ] `tsconfig.json` configurado correctamente.
- [ ] `nodemon` configurado para desarrollo con hot-reload.
- [ ] Endpoint de healthcheck `GET /api/health` funcional.
- [ ] `.env.example` con variables necesarias documentadas.

**PUNTAJE:**  
60

---

### ISSUE-004: Configuración de PostgreSQL + Prisma ORM

**DESCRIPCIÓN:**  
Integrar Prisma ORM en el backend para gestionar la base de datos PostgreSQL. Definir el schema inicial vacío con configuración de conexión. Incluir script de migración y conexión en el cliente Prisma.

**RESULTADOS ESPERADOS:**  
- [ ] Prisma instalado y configurado en `backend/`.
- [ ] `prisma/schema.prisma` con configuración de PostgreSQL.
- [ ] Cliente Prisma generado y exportado como singleton.
- [ ] Script `npm run db:migrate` funcional.
- [ ] Script `npm run db:studio` para abrir Prisma Studio.
- [ ] Variables de entorno de conexión documentadas en `.env.example`.

**PUNTAJE:**  
50

---

### ISSUE-005: Setup de docker-compose para desarrollo local

**DESCRIPCIÓN:**  
Crear el archivo `docker-compose.dev.yml` para levantar el entorno de desarrollo con PostgreSQL, el backend y el frontend, con hot-reload y volúmenes montados para desarrollo ágil.

**RESULTADOS ESPERADOS:**  
- [ ] `docker-compose.dev.yml` con servicios: `db` (PostgreSQL), `backend`, `frontend`.
- [ ] Volúmenes montados para hot-reload en backend y frontend.
- [ ] Variables de entorno gestionadas desde `.env`.
- [ ] Script `npm run docker:dev` en el `package.json` raíz.
- [ ] Documentación de uso en README.md.

**PUNTAJE:**  
70

---

### ISSUE-006: Configuración de variables de entorno y gestión de secretos

**DESCRIPCIÓN:**  
Establecer la gestión de variables de entorno para todos los entornos (desarrollo, producción). Crear `.env.example` consolidado, documentar cada variable y agregar validación de entorno al arranque del backend.

**RESULTADOS ESPERADOS:**  
- [ ] `.env.example` completo con todas las variables del proyecto documentadas.
- [ ] Validación de variables de entorno requeridas al arrancar el backend (con mensaje de error claro si falta alguna).
- [ ] `.gitignore` actualizado para excluir todos los `.env` reales.
- [ ] Documentación de variables en README.md.

**PUNTAJE:**  
30

---

### ISSUE-007: Configuración de GitHub Actions — CI Pipeline (build + test)

**DESCRIPCIÓN:**  
Crear el workflow de GitHub Actions para integración continua: ejecutar lint, build y tests automáticamente en cada push y PR a las ramas `main` y `develop`.

**RESULTADOS ESPERADOS:**  
- [ ] Workflow `ci.yml` creado en `.github/workflows/`.
- [ ] Jobs: `lint`, `build-frontend`, `build-backend`, `test`.
- [ ] El pipeline corre en cada push/PR a `main` y `develop`.
- [ ] Evidencia de que el pipeline pasa correctamente (badge en README).

**PUNTAJE:**  
80

---

### ISSUE-008: Configuración de GitHub Actions — CD Pipeline (Docker + VPS)

**DESCRIPCIÓN:**  
Crear el workflow de GitHub Actions para despliegue continuo: build y push de imágenes Docker a DockerHub, y despliegue automático en VPS al hacer push a `main`.

**RESULTADOS ESPERADOS:**  
- [ ] Workflow `cd.yml` con jobs: `docker-build-push`, `deploy`.
- [ ] Imágenes Docker para frontend y backend publicadas en DockerHub.
- [ ] Despliegue automático vía SSH al VPS en push a `main`.
- [ ] `Dockerfile` para frontend y backend creados.
- [ ] `docker-compose.prod.yml` configurado para producción.

**PUNTAJE:**  
120

---

### ISSUE-009: Setup de workflows de puntajes (gestión + semanal)

**DESCRIPCIÓN:**  
Adaptar y configurar los workflows de puntajes del proyecto de referencia (Allmart) para este nuevo repositorio: `puntajes_gestion.yml` para registrar actividades de gestión y `actualizar_puntajes_semanal.yml` para sincronización semanal de SCORES.md.

**RESULTADOS ESPERADOS:**  
- [ ] `puntajes_gestion.yml` adaptado y funcional en `.github/workflows/`.
- [ ] `actualizar_puntajes_semanal.yml` adaptado y funcional.
- [ ] `registrar_puntaje.yml` adaptado para este repositorio.
- [ ] `SCORES.md` inicial creado.
- [ ] `PUNTAJES.md` con las reglas del sistema de puntajes creado.
- [ ] Scripts necesarios (`sumar_puntajes.cjs`, `generar_management_log.cjs`, `check_missing_puntajes.cjs`) portados o adaptados.

**PUNTAJE:**  
100

---

### ISSUE-010: Creación del GitHub Project y milestones

**DESCRIPCIÓN:**  
Crear el GitHub Project (ProjectV2) para gestión visual del proyecto, con columnas: Backlog, En Progreso, En Revisión, Hecho. Crear los milestones para Fase 1 y Fase 2.

**RESULTADOS ESPERADOS:**  
- [ ] GitHub Project creado con columnas estándar.
- [ ] Milestone "Fase 1 — 13 cursos" creado con fecha estimada.
- [ ] Milestone "Fase 2 — 30 cursos" creado con fecha estimada.
- [ ] Issues organizadas en el proyecto.
- [ ] Documentación del Project en README.md.

**PUNTAJE:**  
40

---

## FASE 1 — DOCUMENTACIÓN

---

### ISSUE-011: README.md principal del proyecto

**DESCRIPCIÓN:**  
Redactar el README.md principal del repositorio con descripción del proyecto, stack tecnológico, instrucciones de instalación, scripts disponibles, estructura de carpetas y enlaces útiles.

**RESULTADOS ESPERADOS:**  
- [ ] README.md con: descripción, badges de CI/CD, stack, estructura de carpetas.
- [ ] Instrucciones de instalación y ejecución local (con y sin Docker).
- [ ] Sección de scripts disponibles (`dev`, `build`, `test`, `lint`).
- [ ] Sección de variables de entorno (referencia a `.env.example`).
- [ ] Enlace al GitHub Project y guía de contribución.

**PUNTAJE:**  
50

---

### ISSUE-012: Documentación del modelo de datos (ERD)

**DESCRIPCIÓN:**  
Documentar el modelo de datos completo del sistema con un diagrama ERD (Entity-Relationship Diagram), describiendo todas las entidades, atributos y relaciones del sistema.

**RESULTADOS ESPERADOS:**  
- [ ] Diagrama ERD creado (puede ser en Mermaid dentro del `.md`).
- [ ] Descripción de cada entidad: User, Course, Subject, TeacherSubjectCourse, Class, Material, Enrollment.
- [ ] Relaciones documentadas (1:N, N:M).
- [ ] Archivo `docs/ERD.md` creado.

**PUNTAJE:**  
60

---

### ISSUE-013: Documentación del sistema de roles y permisos

**DESCRIPCIÓN:**  
Documentar el sistema de roles (Admin, Docente, Alumno) y los permisos diferenciados por endpoint y vista. Incluir tabla de permisos por recurso.

**RESULTADOS ESPERADOS:**  
- [ ] Tabla de roles y permisos por recurso/endpoint.
- [ ] Descripción de cada rol y sus capacidades.
- [ ] Casos de uso por rol documentados.
- [ ] Archivo `docs/ROLES.md` creado.

**PUNTAJE:**  
40

---

### ISSUE-014: Documentación de la API REST (endpoints)

**DESCRIPCIÓN:**  
Documentar todos los endpoints de la API REST del backend con método HTTP, ruta, descripción, parámetros, body esperado, respuestas y ejemplos. Puede usarse formato OpenAPI/Swagger o markdown.

**RESULTADOS ESPERADOS:**  
- [ ] Todos los endpoints documentados con método, ruta, descripción.
- [ ] Body y parámetros documentados con tipos.
- [ ] Respuestas de éxito y error documentadas.
- [ ] Archivo `docs/API.md` o configuración Swagger funcional.

**PUNTAJE:**  
70

---

### ISSUE-015: Guía de contribución (CONTRIBUTING.md)

**DESCRIPCIÓN:**  
Redactar la guía de contribución del proyecto explicando cómo clonar, instalar, crear ramas, formato de commits, cómo abrir PRs y el sistema de puntajes.

**RESULTADOS ESPERADOS:**  
- [ ] `CONTRIBUTING.md` con instrucciones claras de contribución.
- [ ] Convención de nombres de ramas (`feature/`, `fix/`, `docs/`, `chore/`).
- [ ] Convención de commits (Conventional Commits).
- [ ] Explicación del sistema de puntajes y cómo asignarlos.
- [ ] Proceso de PR y revisión documentado.

**PUNTAJE:**  
40

---

### ISSUE-016: Documentación del presupuesto y planificación económica

**DESCRIPCIÓN:**  
Crear documento de presupuesto estimado para el desarrollo del campus virtual, incluyendo distribución de tareas, estimación de horas/puntajes y proyección de ganancias por colaborador según el sistema de puntajes.

**RESULTADOS ESPERADOS:**  
- [ ] Documento de presupuesto con: precio total del proyecto, desglose de tareas.
- [ ] Estimación de puntaje total del proyecto.
- [ ] Tabla de distribución proyectada por colaborador.
- [ ] Cronograma estimado de Fase 1 y Fase 2.
- [ ] Archivo `docs/PRESUPUESTO.md` creado.

**PUNTAJE:**  
60

---

## FASE 1 — BACKEND: MODELOS Y BASE DE DATOS

---

### ISSUE-017: Modelo de Usuario (User) con roles en Prisma

**DESCRIPCIÓN:**  
Definir el modelo `User` en el schema de Prisma con todos los campos necesarios: id, nombre, apellido, email, password hasheada, rol (ADMIN, DOCENTE, ALUMNO), estado activo/inactivo, timestamps y relaciones.

**RESULTADOS ESPERADOS:**  
- [ ] Modelo `User` creado en `prisma/schema.prisma`.
- [ ] Enum `Role` con valores: `ADMIN`, `DOCENTE`, `ALUMNO`.
- [ ] Campos: `id`, `nombre`, `apellido`, `email`, `password`, `rol`, `activo`, `createdAt`, `updatedAt`.
- [ ] Migración generada y aplicada correctamente.
- [ ] Índice único en `email`.

**PUNTAJE:**  
40

---

### ISSUE-018: Modelo de Alumno (Student) con campos escolares

**DESCRIPCIÓN:**  
Definir el modelo `Student` en Prisma que extiende la información escolar del alumno: DNI, año de ingreso, turno, año escolar actual, y relación con `User`. Este modelo almacena los datos académicos del alumno.

**RESULTADOS ESPERADOS:**  
- [ ] Modelo `Student` creado en `prisma/schema.prisma`.
- [ ] Campos: `id`, `userId`, `dni`, `anoIngreso`, `anoEscolar`, `turno`, `activo`.
- [ ] Relación 1:1 con `User`.
- [ ] Migración generada y aplicada.

**PUNTAJE:**  
35

---

### ISSUE-019: Modelo de Turno y Curso (Shift y Course)

**DESCRIPCIÓN:**  
Definir los modelos `Shift` (turno: Mañana, Tarde, Noche) y `Course` (grado: 1°A, 1°B, etc.) en Prisma. Un curso pertenece a un turno y tiene un grado/división.

**RESULTADOS ESPERADOS:**  
- [ ] Enum `ShiftType` con: `MANANA`, `TARDE`, `NOCHE`.
- [ ] Modelo `Course` con: `id`, `nombre`, `grado`, `division`, `turno`, `anoEscolar`, `activo`.
- [ ] Relaciones con `Student` (N:M via `Enrollment`) y `Subject`.
- [ ] Migración generada y aplicada.

**PUNTAJE:**  
35

---

### ISSUE-020: Modelo de Materia (Subject)

**DESCRIPCIÓN:**  
Definir el modelo `Subject` (materia) en Prisma: nombre, descripción, color/icono para UI, y relaciones con cursos y docentes.

**RESULTADOS ESPERADOS:**  
- [ ] Modelo `Subject` con: `id`, `nombre`, `descripcion`, `color`, `icono`, `activo`.
- [ ] Relación N:M con `Course` via tabla `CourseSubject`.
- [ ] Migración generada y aplicada.

**PUNTAJE:**  
30

---

### ISSUE-021: Modelo de asignación Docente-Materia-Curso (TeacherAssignment)

**DESCRIPCIÓN:**  
Definir el modelo de asignación que relaciona un docente (User con rol DOCENTE) con una materia y un curso específico. Un docente puede tener múltiples materias en múltiples cursos.

**RESULTADOS ESPERADOS:**  
- [ ] Modelo `TeacherAssignment` con: `id`, `teacherId`, `subjectId`, `courseId`, `anoEscolar`.
- [ ] Restricción de unicidad: un docente no puede tener la misma materia+curso dos veces en el mismo año.
- [ ] Relaciones correctas con `User`, `Subject`, `Course`.
- [ ] Migración generada y aplicada.

**PUNTAJE:**  
40

---

### ISSUE-022: Modelo de inscripción de Alumno a Curso (Enrollment)

**DESCRIPCIÓN:**  
Definir el modelo `Enrollment` que relaciona alumnos con cursos para el año escolar. Permite gestionar qué alumno está en qué curso en qué año.

**RESULTADOS ESPERADOS:**  
- [ ] Modelo `Enrollment` con: `id`, `studentId`, `courseId`, `anoEscolar`, `fechaInscripcion`, `activo`.
- [ ] Restricción de unicidad: un alumno no puede estar en el mismo curso dos veces en el mismo año.
- [ ] Migración generada y aplicada.

**PUNTAJE:**  
30

---

### ISSUE-023: Modelo de Clase (Class/Lesson)

**DESCRIPCIÓN:**  
Definir el modelo `Class` (clase semanal) en Prisma. Cada clase pertenece a una asignación docente-materia-curso y tiene número de semana, título, descripción y estado habilitado/deshabilitado.

**RESULTADOS ESPERADOS:**  
- [ ] Modelo `Class` con: `id`, `assignmentId`, `titulo`, `descripcion`, `semana`, `habilitada`, `fechaHabilitacion`, `createdAt`, `updatedAt`.
- [ ] Relación con `TeacherAssignment`.
- [ ] Relación 1:N con `Material`.
- [ ] Migración generada y aplicada.

**PUNTAJE:**  
35

---

### ISSUE-024: Modelo de Material de clase (Material)

**DESCRIPCIÓN:**  
Definir el modelo `Material` en Prisma para los materiales adjuntos a cada clase. Soportar múltiples tipos: PDF, imagen, video link, archivo, nota de texto.

**RESULTADOS ESPERADOS:**  
- [ ] Enum `MaterialType` con: `PDF`, `IMAGEN`, `VIDEO_LINK`, `ARCHIVO`, `NOTA`.
- [ ] Modelo `Material` con: `id`, `classId`, `tipo`, `titulo`, `descripcion`, `url`, `nombreArchivo`, `tamanioBytes`, `uploaderId`, `createdAt`.
- [ ] Relación con `Class` y con `User` (uploader).
- [ ] Migración generada y aplicada.

**PUNTAJE:**  
40

---

### ISSUE-025: Seed inicial de datos de prueba

**DESCRIPCIÓN:**  
Crear el script de seed (`prisma/seed.ts`) que genere datos iniciales de prueba: 1 admin, 3 docentes, 10 alumnos, 3 cursos de Fase 1 con sus materias, clases y materiales de ejemplo.

**RESULTADOS ESPERADOS:**  
- [ ] Script `prisma/seed.ts` que inserta datos de prueba.
- [ ] Admin con email `admin@campus.com` y contraseña segura configurable por env.
- [ ] Al menos 3 docentes, 10 alumnos, 3 cursos, 3 materias, 2 clases por materia con materiales.
- [ ] Script `npm run db:seed` funcional.
- [ ] Idempotente: puede ejecutarse múltiples veces sin duplicar datos.

**PUNTAJE:**  
50

---

## FASE 1 — BACKEND: AUTENTICACIÓN Y AUTORIZACIÓN

---

### ISSUE-026: Implementar autenticación JWT (login + refresh + logout)

**DESCRIPCIÓN:**  
Implementar el sistema de autenticación con JWT: endpoint de login que devuelve access token y refresh token, endpoint de refresh para renovar el access token, y endpoint de logout que invalida el refresh token.

**RESULTADOS ESPERADOS:**  
- [ ] `POST /api/auth/login` que valida credenciales y devuelve `accessToken` + `refreshToken`.
- [ ] `POST /api/auth/refresh` que renueva el `accessToken` con el `refreshToken`.
- [ ] `POST /api/auth/logout` que invalida el `refreshToken`.
- [ ] Access token con expiración corta (15min), refresh token con expiración larga (7 días).
- [ ] Contraseñas hasheadas con bcrypt.

**PUNTAJE:**  
80

---

### ISSUE-027: Middleware de autenticación y autorización por rol

**DESCRIPCIÓN:**  
Implementar el middleware `authenticate` que valida el JWT en el header `Authorization` y adjunta el usuario al request. Implementar el middleware `authorize(...roles)` que verifica que el usuario tenga el rol requerido.

**RESULTADOS ESPERADOS:**  
- [ ] Middleware `authenticate` que valida el JWT y adjunta `req.user`.
- [ ] Middleware `authorize(...roles)` que verifica rol y lanza 403 si no tiene permiso.
- [ ] Tests unitarios del middleware.
- [ ] Manejo de errores claro: 401 sin token, 403 sin permiso, 400 token inválido.

**PUNTAJE:**  
60

---

### ISSUE-028: Endpoint de perfil de usuario autenticado

**DESCRIPCIÓN:**  
Implementar el endpoint `GET /api/auth/me` que devuelve los datos del usuario autenticado (sin la contraseña), incluyendo su rol y datos específicos (si es alumno, su curso; si es docente, sus asignaciones).

**RESULTADOS ESPERADOS:**  
- [ ] `GET /api/auth/me` protegido con middleware `authenticate`.
- [ ] Devuelve datos del usuario sin `password`.
- [ ] Si es ALUMNO, incluye curso actual y turno.
- [ ] Si es DOCENTE, incluye materias y cursos asignados.
- [ ] Test del endpoint.

**PUNTAJE:**  
30

---

### ISSUE-029: Endpoint de cambio de contraseña

**DESCRIPCIÓN:**  
Implementar el endpoint `PUT /api/auth/change-password` para que el usuario autenticado pueda cambiar su propia contraseña. Validar contraseña actual, nueva contraseña y confirmación.

**RESULTADOS ESPERADOS:**  
- [ ] `PUT /api/auth/change-password` protegido con `authenticate`.
- [ ] Validación de contraseña actual correcta.
- [ ] Nueva contraseña con reglas mínimas de seguridad (mínimo 8 caracteres, mayúscula, número).
- [ ] Respuesta 200 en éxito, 400 en errores de validación.

**PUNTAJE:**  
25

---

## FASE 1 — BACKEND: GESTIÓN DE USUARIOS

---

### ISSUE-030: CRUD de Administradores

**DESCRIPCIÓN:**  
Implementar los endpoints REST para gestión de administradores: listar, crear, ver detalle, actualizar y desactivar (soft delete). Solo accesible por usuarios con rol ADMIN.

**RESULTADOS ESPERADOS:**  
- [ ] `GET /api/admin/admins` — listar admins con paginación.
- [ ] `POST /api/admin/admins` — crear admin.
- [ ] `GET /api/admin/admins/:id` — ver detalle.
- [ ] `PUT /api/admin/admins/:id` — actualizar.
- [ ] `DELETE /api/admin/admins/:id` — desactivar (soft delete).
- [ ] Todos los endpoints protegidos con `authorize('ADMIN')`.

**PUNTAJE:**  
50

---

### ISSUE-031: CRUD de Docentes

**DESCRIPCIÓN:**  
Implementar los endpoints REST para gestión de docentes: listar, crear, ver detalle con sus asignaciones actuales, actualizar y desactivar. Solo accesible por ADMIN.

**RESULTADOS ESPERADOS:**  
- [ ] `GET /api/admin/teachers` — listar docentes con paginación y búsqueda.
- [ ] `POST /api/admin/teachers` — crear docente.
- [ ] `GET /api/admin/teachers/:id` — ver detalle con asignaciones.
- [ ] `PUT /api/admin/teachers/:id` — actualizar datos.
- [ ] `DELETE /api/admin/teachers/:id` — desactivar (soft delete).
- [ ] Todos los endpoints protegidos con `authorize('ADMIN')`.

**PUNTAJE:**  
55

---

### ISSUE-032: CRUD de Alumnos

**DESCRIPCIÓN:**  
Implementar los endpoints REST para gestión de alumnos: listar con filtros (por curso, turno, año), crear, ver detalle con inscripción actual, actualizar y desactivar.

**RESULTADOS ESPERADOS:**  
- [ ] `GET /api/admin/students` — listar alumnos con paginación, filtros por curso/turno/año.
- [ ] `POST /api/admin/students` — crear alumno con datos escolares.
- [ ] `GET /api/admin/students/:id` — ver detalle con inscripción actual.
- [ ] `PUT /api/admin/students/:id` — actualizar datos.
- [ ] `DELETE /api/admin/students/:id` — desactivar (soft delete).

**PUNTAJE:**  
60

---

### ISSUE-033: Importación masiva de alumnos desde CSV/Excel

**DESCRIPCIÓN:**  
Implementar el endpoint `POST /api/admin/students/import` para importar alumnos masivamente desde un archivo CSV o Excel. Validar datos, reportar errores por fila e insertar los válidos.

**RESULTADOS ESPERADOS:**  
- [ ] Endpoint que acepta archivo CSV/Excel con multipart/form-data.
- [ ] Validación de campos requeridos por fila (nombre, apellido, DNI, email, curso, turno).
- [ ] Inserción transaccional de los alumnos válidos.
- [ ] Reporte de resultado: total procesados, insertados, errores con detalle por fila.
- [ ] Plantilla de CSV/Excel descargable desde `GET /api/admin/students/import/template`.
- [ ] Solo accesible por ADMIN.

**PUNTAJE:**  
100

---

### ISSUE-034: Actualización automática del año escolar de alumnos

**DESCRIPCIÓN:**  
Implementar el mecanismo (endpoint + job programado) para actualizar automáticamente el año escolar de todos los alumnos activos al inicio del nuevo año lectivo, avanzando al siguiente grado.

**RESULTADOS ESPERADOS:**  
- [ ] Endpoint `POST /api/admin/students/promote-year` que promueve a todos los alumnos activos al siguiente año.
- [ ] Lógica de promoción: si el alumno está en 5°, pasa a 6°; si está en 6° (último), se marca como egresado.
- [ ] Log de la operación con resumen de alumnos promovidos / egresados / errores.
- [ ] Job cron opcional configurable (primer día del año lectivo).
- [ ] Solo accesible por ADMIN.

**PUNTAJE:**  
80

---

## FASE 1 — BACKEND: ESTRUCTURA ACADÉMICA

---

### ISSUE-035: CRUD de Cursos

**DESCRIPCIÓN:**  
Implementar los endpoints REST para gestión de cursos: listar, crear, ver detalle con alumnos inscritos y materias, actualizar y desactivar.

**RESULTADOS ESPERADOS:**  
- [ ] `GET /api/admin/courses` — listar cursos con filtros por turno y año escolar.
- [ ] `POST /api/admin/courses` — crear curso.
- [ ] `GET /api/admin/courses/:id` — ver detalle con alumnos y materias.
- [ ] `PUT /api/admin/courses/:id` — actualizar.
- [ ] `DELETE /api/admin/courses/:id` — desactivar.
- [ ] Solo accesible por ADMIN.

**PUNTAJE:**  
45

---

### ISSUE-036: CRUD de Materias

**DESCRIPCIÓN:**  
Implementar los endpoints REST para gestión de materias: listar, crear, ver detalle con cursos asignados, actualizar y desactivar.

**RESULTADOS ESPERADOS:**  
- [ ] `GET /api/admin/subjects` — listar materias.
- [ ] `POST /api/admin/subjects` — crear materia.
- [ ] `GET /api/admin/subjects/:id` — ver detalle.
- [ ] `PUT /api/admin/subjects/:id` — actualizar.
- [ ] `DELETE /api/admin/subjects/:id` — desactivar.
- [ ] Solo accesible por ADMIN.

**PUNTAJE:**  
40

---

### ISSUE-037: Asignación y desasignación de Docente a Materia+Curso

**DESCRIPCIÓN:**  
Implementar los endpoints para asignar y desasignar docentes a combinaciones de materia+curso para un año escolar específico.

**RESULTADOS ESPERADOS:**  
- [ ] `POST /api/admin/assignments` — asignar docente a materia+curso.
- [ ] `DELETE /api/admin/assignments/:id` — desasignar.
- [ ] `GET /api/admin/assignments` — listar asignaciones con filtros.
- [ ] Validación: no duplicar la misma asignación en el mismo año.
- [ ] Solo accesible por ADMIN.

**PUNTAJE:**  
40

---

### ISSUE-038: Inscripción y desinscripción de Alumnos a Cursos

**DESCRIPCIÓN:**  
Implementar los endpoints para inscribir y desinscribir alumnos a cursos para un año escolar específico.

**RESULTADOS ESPERADOS:**  
- [ ] `POST /api/admin/enrollments` — inscribir alumno a curso.
- [ ] `DELETE /api/admin/enrollments/:id` — desinscribir.
- [ ] `GET /api/admin/enrollments` — listar inscripciones con filtros.
- [ ] Validación: un alumno no puede estar en dos cursos del mismo turno en el mismo año.
- [ ] Solo accesible por ADMIN.

**PUNTAJE:**  
35

---

## FASE 1 — BACKEND: CLASES Y MATERIALES

---

### ISSUE-039: CRUD de Clases por asignación docente

**DESCRIPCIÓN:**  
Implementar los endpoints para que los docentes puedan crear, ver, editar y eliminar sus clases. Las clases pertenecen a una asignación docente-materia-curso.

**RESULTADOS ESPERADOS:**  
- [ ] `GET /api/teacher/classes` — listar clases del docente autenticado.
- [ ] `POST /api/teacher/classes` — crear clase.
- [ ] `GET /api/teacher/classes/:id` — ver detalle de clase con materiales.
- [ ] `PUT /api/teacher/classes/:id` — actualizar clase.
- [ ] `DELETE /api/teacher/classes/:id` — eliminar clase (solo si no tiene alumnos que la vieron).
- [ ] Accesible por DOCENTE y ADMIN.

**PUNTAJE:**  
55

---

### ISSUE-040: Habilitación y deshabilitación manual de clases

**DESCRIPCIÓN:**  
Implementar el endpoint para que el docente (o admin) pueda habilitar o deshabilitar manualmente una clase, controlando si los alumnos pueden verla o no.

**RESULTADOS ESPERADOS:**  
- [ ] `PATCH /api/teacher/classes/:id/toggle` — habilitar/deshabilitar clase.
- [ ] Al habilitar, registrar `fechaHabilitacion` automáticamente.
- [ ] Los alumnos solo pueden ver clases con `habilitada: true`.
- [ ] Accesible por DOCENTE (solo sus propias clases) y ADMIN.

**PUNTAJE:**  
30

---

### ISSUE-041: Upload de archivos para materiales de clase

**DESCRIPCIÓN:**  
Implementar el endpoint para subir archivos como materiales de clase. Soportar PDF, imágenes y documentos. Almacenar en sistema de archivos local (con carpeta configurable) o en almacenamiento externo.

**RESULTADOS ESPERADOS:**  
- [ ] `POST /api/materials/upload` — subir archivo con multipart/form-data.
- [ ] Validación de tipo de archivo (whitelist: pdf, jpg, png, gif, doc, docx, ppt, pptx).
- [ ] Validación de tamaño máximo configurable por env (default: 10MB).
- [ ] Almacenamiento en carpeta `uploads/` con nombre único (UUID).
- [ ] Accesible por DOCENTE y ADMIN.

**PUNTAJE:**  
70

---

### ISSUE-042: CRUD de Materiales de clase (archivos, links, notas)

**DESCRIPCIÓN:**  
Implementar los endpoints para gestionar materiales adjuntos a una clase: agregar materiales de tipo archivo, link de video o nota de texto; listar, ver y eliminar materiales.

**RESULTADOS ESPERADOS:**  
- [ ] `POST /api/teacher/classes/:id/materials` — agregar material (archivo subido, link o nota).
- [ ] `GET /api/teacher/classes/:id/materials` — listar materiales de la clase.
- [ ] `DELETE /api/teacher/materials/:materialId` — eliminar material.
- [ ] Validación de tipo y datos requeridos según tipo de material.
- [ ] Accesible por DOCENTE (sus clases) y ADMIN.

**PUNTAJE:**  
50

---

### ISSUE-043: Endpoint de descarga y visualización de materiales para alumnos

**DESCRIPCIÓN:**  
Implementar el endpoint para que los alumnos puedan descargar o acceder a los materiales de sus clases habilitadas. Verificar que el alumno esté inscrito en el curso correspondiente.

**RESULTADOS ESPERADOS:**  
- [ ] `GET /api/student/materials/:materialId/download` — descargar archivo.
- [ ] Verificación: el alumno debe estar inscrito en el curso de la clase.
- [ ] La clase debe estar habilitada para que el alumno pueda acceder.
- [ ] Para links externos, devolver la URL. Para archivos, servir el stream del archivo.
- [ ] Accesible por ALUMNO (sus materias) y DOCENTE/ADMIN.

**PUNTAJE:**  
45

---

### ISSUE-044: Endpoints de vista de alumno (mis materias, clases, materiales)

**DESCRIPCIÓN:**  
Implementar los endpoints que el alumno usa para navegar por su contenido: listar sus materias del curso actual, ver las clases habilitadas de una materia y ver los materiales de una clase.

**RESULTADOS ESPERADOS:**  
- [ ] `GET /api/student/subjects` — listar materias del alumno (curso actual).
- [ ] `GET /api/student/subjects/:subjectId/classes` — listar clases habilitadas de una materia.
- [ ] `GET /api/student/classes/:classId/materials` — listar materiales de una clase.
- [ ] Solo devuelve clases con `habilitada: true`.
- [ ] Accesible por ALUMNO.

**PUNTAJE:**  
50

---

## FASE 1 — FRONTEND: ESTRUCTURA BASE

---

### ISSUE-045: Setup de React Router y estructura de rutas

**DESCRIPCIÓN:**  
Configurar React Router v6 en el frontend con rutas protegidas por rol, rutas públicas (login) y layout base. Definir la estructura completa de rutas del sistema.

**RESULTADOS ESPERADOS:**  
- [ ] React Router v6 configurado con `createBrowserRouter`.
- [ ] Rutas públicas: `/login`.
- [ ] Rutas protegidas por autenticación: `/dashboard`, `/admin/*`, `/docente/*`, `/alumno/*`.
- [ ] Guard `PrivateRoute` que redirige a `/login` si no autenticado.
- [ ] Guard `RoleRoute` que redirige si no tiene el rol necesario.
- [ ] Fallback 404 configurado.

**PUNTAJE:**  
40

---

### ISSUE-046: Layout base con Sidebar y Header

**DESCRIPCIÓN:**  
Implementar el layout principal de la aplicación con sidebar de navegación colapsable, header con datos del usuario y breadcrumbs dinámicos. Inspirado en la referencia visual del campus UNAB.

**RESULTADOS ESPERADOS:**  
- [ ] Componente `Layout` con sidebar y header.
- [ ] Sidebar con ítems de navegación dinámicos según el rol del usuario.
- [ ] Header con nombre del usuario, rol, avatar y botón de logout.
- [ ] Breadcrumbs dinámicos según la ruta actual.
- [ ] Sidebar colapsable en mobile (hamburger menu).
- [ ] El layout envuelve todas las rutas protegidas.

**PUNTAJE:**  
70

---

### ISSUE-047: Sistema de estilos globales y tema de la aplicación

**DESCRIPCIÓN:**  
Establecer el sistema de estilos globales del proyecto: variables CSS (colores, tipografías, espaciados), Reset CSS, tema corporativo de la escuela y utilidades base.

**RESULTADOS ESPERADOS:**  
- [ ] Archivo `src/styles/globals.css` con reset y variables CSS.
- [ ] Variables CSS para: colores primarios, secundarios, neutros, tipografías, espaciados, radios de borde.
- [ ] Sistema de clases utilitarias básicas o integración con una librería de UI (ej: Tailwind CSS o CSS Modules).
- [ ] Tema responsive configurado (breakpoints).
- [ ] Fuentes web cargadas correctamente.

**PUNTAJE:**  
40

---

### ISSUE-048: Biblioteca de componentes base reutilizables

**DESCRIPCIÓN:**  
Crear los componentes base que se utilizarán en toda la aplicación: Button, Input, Card, Modal, Badge, Spinner, Alert, Table, Pagination, Avatar.

**RESULTADOS ESPERADOS:**  
- [ ] Componentes creados en `src/components/ui/`: `Button`, `Input`, `Card`, `Modal`, `Badge`, `Spinner`, `Alert`, `Table`, `Pagination`, `Avatar`.
- [ ] Cada componente tiene sus props tipadas con TypeScript.
- [ ] Variantes de Button: `primary`, `secondary`, `danger`, `ghost`.
- [ ] Variantes de Badge por tipo/color.
- [ ] Componentes accesibles (atributos ARIA básicos).

**PUNTAJE:**  
70

---

### ISSUE-049: Contexto de autenticación (AuthContext + hooks)

**DESCRIPCIÓN:**  
Implementar el contexto de autenticación global con React Context: almacenar usuario autenticado, tokens JWT, funciones de login/logout y estado de carga inicial.

**RESULTADOS ESPERADOS:**  
- [ ] `AuthContext` con: `user`, `isAuthenticated`, `isLoading`, `login()`, `logout()`.
- [ ] Tokens JWT almacenados de forma segura (httpOnly cookie o memory + refresh rotation).
- [ ] Al recargar la página, verificar si hay sesión activa vía `GET /api/auth/me`.
- [ ] Hook `useAuth()` para consumir el contexto.
- [ ] Manejo de expiración de token con refresh automático.

**PUNTAJE:**  
60

---

### ISSUE-050: Cliente HTTP con Axios + interceptors

**DESCRIPCIÓN:**  
Configurar el cliente HTTP (Axios) con interceptors para agregar el JWT en cada request, manejar el refresh automático de tokens y redirigir al login en caso de sesión expirada.

**RESULTADOS ESPERADOS:**  
- [ ] Instancia de Axios configurada en `src/lib/api.ts` con `baseURL` desde env.
- [ ] Interceptor de request: agrega `Authorization: Bearer <token>` automáticamente.
- [ ] Interceptor de response: si 401, intenta refresh; si falla redirect a `/login`.
- [ ] Funciones base tipadas: `get<T>()`, `post<T>()`, `put<T>()`, `delete<T>()`.

**PUNTAJE:**  
40

---

## FASE 1 — FRONTEND: AUTENTICACIÓN

---

### ISSUE-051: Página de Login

**DESCRIPCIÓN:**  
Implementar la página de login del campus virtual con formulario de email y contraseña, validación, manejo de errores y redirección según el rol del usuario autenticado.

**RESULTADOS ESPERADOS:**  
- [ ] Página `/login` con formulario: email + contraseña + botón login.
- [ ] Validación de campos con feedback visual.
- [ ] Llamada a `POST /api/auth/login` y manejo del token.
- [ ] Redirección post-login según rol: admin → `/admin/dashboard`, docente → `/docente/dashboard`, alumno → `/alumno/dashboard`.
- [ ] Manejo de error 401 con mensaje claro al usuario.
- [ ] Logo y branding de la institución.

**PUNTAJE:**  
50

---

## FASE 1 — FRONTEND: PANEL ADMINISTRADOR

---

### ISSUE-052: Dashboard del Administrador

**DESCRIPCIÓN:**  
Implementar la página principal del panel de administrador con estadísticas generales: total de alumnos, docentes, cursos, materias activas y actividad reciente.

**RESULTADOS ESPERADOS:**  
- [ ] Dashboard con cards de estadísticas: alumnos, docentes, cursos, materias activas.
- [ ] Llamadas a endpoints de stats del backend.
- [ ] Sección de accesos rápidos a las secciones de gestión.
- [ ] Estado de carga (skeletons) mientras cargan los datos.
- [ ] Responsive para mobile y desktop.

**PUNTAJE:**  
50

---

### ISSUE-053: Vista de gestión de Docentes (listado + alta + edición)

**DESCRIPCIÓN:**  
Implementar la vista de gestión de docentes del panel admin: tabla con paginación y búsqueda, modal de alta de docente, modal de edición y acción de desactivar.

**RESULTADOS ESPERADOS:**  
- [ ] Tabla de docentes con columnas: nombre, email, materias asignadas, estado, acciones.
- [ ] Buscador por nombre y email.
- [ ] Paginación.
- [ ] Modal/formulario de alta con validación.
- [ ] Modal de edición.
- [ ] Confirmación antes de desactivar.
- [ ] Feedback de éxito/error con toasts o alerts.

**PUNTAJE:**  
60

---

### ISSUE-054: Vista de gestión de Alumnos (listado + alta + edición)

**DESCRIPCIÓN:**  
Implementar la vista de gestión de alumnos del panel admin: tabla con filtros por curso/turno, modal de alta, modal de edición y acción de desactivar.

**RESULTADOS ESPERADOS:**  
- [ ] Tabla de alumnos con columnas: nombre, DNI, email, curso, turno, año escolar, estado, acciones.
- [ ] Filtros: por curso, turno, año escolar. Buscador por nombre/DNI.
- [ ] Paginación.
- [ ] Modal/formulario de alta con validación.
- [ ] Modal de edición.
- [ ] Confirmación antes de desactivar.

**PUNTAJE:**  
60

---

### ISSUE-055: Vista de importación masiva de alumnos

**DESCRIPCIÓN:**  
Implementar la vista de importación masiva de alumnos: upload de archivo CSV/Excel, preview de datos, confirmación y reporte de resultados con errores por fila.

**RESULTADOS ESPERADOS:**  
- [ ] Componente de drag & drop para subir archivo CSV/Excel.
- [ ] Preview de los primeros N registros antes de confirmar.
- [ ] Botón de descarga de plantilla CSV.
- [ ] Llamada al endpoint de importación con feedback de progreso.
- [ ] Reporte post-importación: total procesados, insertados, errores con detalle.

**PUNTAJE:**  
70

---

### ISSUE-056: Vista de gestión de Cursos

**DESCRIPCIÓN:**  
Implementar la vista de gestión de cursos: tabla con paginación y filtros, modal de alta con grado/división/turno, edición y detalle con alumnos inscritos.

**RESULTADOS ESPERADOS:**  
- [ ] Tabla de cursos con filtros por turno y año.
- [ ] Modal de alta con campos: nombre, grado, división, turno, año escolar.
- [ ] Vista de detalle: alumnos inscritos y materias del curso.
- [ ] Acciones: editar, desactivar.
- [ ] Paginación y búsqueda.

**PUNTAJE:**  
50

---

### ISSUE-057: Vista de gestión de Materias

**DESCRIPCIÓN:**  
Implementar la vista de gestión de materias: tabla, modal de alta con nombre/descripción/color, edición y visualización de cursos que tienen esa materia.

**RESULTADOS ESPERADOS:**  
- [ ] Tabla de materias con búsqueda.
- [ ] Modal de alta con: nombre, descripción, color (color picker), ícono.
- [ ] Vista de detalle: cursos que tienen esta materia.
- [ ] Acciones: editar, desactivar.

**PUNTAJE:**  
45

---

### ISSUE-058: Vista de asignación Docente-Materia-Curso

**DESCRIPCIÓN:**  
Implementar la vista para asignar docentes a combinaciones de materia+curso. Interfaz visual para seleccionar docente, materia y curso, y gestionar las asignaciones existentes.

**RESULTADOS ESPERADOS:**  
- [ ] Formulario de asignación: selects de docente, materia y curso.
- [ ] Tabla de asignaciones existentes con filtros.
- [ ] Acción de eliminar asignación con confirmación.
- [ ] Validación de duplicados con mensaje de error claro.

**PUNTAJE:**  
45

---

## FASE 1 — FRONTEND: PANEL DOCENTE

---

### ISSUE-059: Dashboard del Docente

**DESCRIPCIÓN:**  
Implementar la página principal del panel del docente con resumen de sus materias-cursos asignados, clases pendientes de habilitar y accesos rápidos.

**RESULTADOS ESPERADOS:**  
- [ ] Cards con las materias+cursos asignados al docente.
- [ ] Indicador de clases habilitadas / total por materia.
- [ ] Accesos rápidos: crear clase, ver mis materias.
- [ ] Estado de carga con skeletons.

**PUNTAJE:**  
45

---

### ISSUE-060: Vista de mis Materias y Cursos (docente)

**DESCRIPCIÓN:**  
Implementar la vista donde el docente ve todas sus materias asignadas por curso, con acceso a las clases de cada materia-curso.

**RESULTADOS ESPERADOS:**  
- [ ] Listado de asignaciones agrupadas por materia o por curso.
- [ ] Cada item muestra: materia, curso, turno, cantidad de clases.
- [ ] Al hacer click, navega a la lista de clases de esa asignación.
- [ ] Filtros por turno y búsqueda por materia/curso.

**PUNTAJE:**  
35

---

### ISSUE-061: Vista de gestión de Clases (docente)

**DESCRIPCIÓN:**  
Implementar la vista donde el docente lista, crea, edita y habilita/deshabilita sus clases para una materia-curso específica.

**RESULTADOS ESPERADOS:**  
- [ ] Listado de clases de la materia-curso seleccionada, ordenadas por semana.
- [ ] Cada clase muestra: número de semana, título, estado (habilitada/no), cantidad de materiales.
- [ ] Modal de creación de clase con: título, descripción, número de semana.
- [ ] Modal de edición.
- [ ] Toggle de habilitación con confirmación.
- [ ] Acceso al detalle de materiales de cada clase.

**PUNTAJE:**  
65

---

### ISSUE-062: Vista de gestión de Materiales de clase (docente)

**DESCRIPCIÓN:**  
Implementar la vista donde el docente gestiona los materiales de una clase: agregar archivos (upload), links de video, notas de texto; listar y eliminar materiales.

**RESULTADOS ESPERADOS:**  
- [ ] Listado de materiales de la clase con tipo, nombre y fecha.
- [ ] Formulario para agregar material tipo archivo (drag & drop + click).
- [ ] Formulario para agregar material tipo link (URL + título).
- [ ] Formulario para agregar material tipo nota (editor de texto simple).
- [ ] Acción de eliminar material con confirmación.
- [ ] Preview básico según tipo de material.

**PUNTAJE:**  
70

---

## FASE 1 — FRONTEND: PANEL ALUMNO

---

### ISSUE-063: Dashboard del Alumno

**DESCRIPCIÓN:**  
Implementar la página principal del panel del alumno con sus materias del curso actual, clases disponibles (habilitadas) más recientes y accesos rápidos.

**RESULTADOS ESPERADOS:**  
- [ ] Cards con las materias del curso del alumno.
- [ ] Sección "Novedades": últimas clases habilitadas ordenadas por fecha.
- [ ] Datos del alumno: nombre, curso, turno, año escolar.
- [ ] Acceso rápido a cada materia.
- [ ] Estado de carga con skeletons.

**PUNTAJE:**  
50

---

### ISSUE-064: Vista de Mis Materias (alumno)

**DESCRIPCIÓN:**  
Implementar la vista donde el alumno ve todas las materias de su curso, con indicador de clases disponibles en cada una.

**RESULTADOS ESPERADOS:**  
- [ ] Grid/listado de materias del curso del alumno.
- [ ] Cada materia muestra: nombre, color/ícono, docente asignado, cantidad de clases habilitadas.
- [ ] Al hacer click, navega a las clases de esa materia.
- [ ] Diseño visual inspirado en la referencia del campus UNAB.

**PUNTAJE:**  
40

---

### ISSUE-065: Vista de Clases de una Materia (alumno)

**DESCRIPCIÓN:**  
Implementar la vista donde el alumno ve las clases habilitadas de una materia, ordenadas por semana, con acceso a los materiales de cada clase.

**RESULTADOS ESPERADOS:**  
- [ ] Listado de clases habilitadas de la materia, ordenadas por semana descendente.
- [ ] Cada clase muestra: número de semana, título, descripción breve, fecha de habilitación, cantidad de materiales.
- [ ] Las clases no habilitadas no aparecen para el alumno.
- [ ] Al hacer click, navega a los materiales de la clase.
- [ ] Breadcrumb: Mis Materias > [Materia] > Clases.

**PUNTAJE:**  
35

---

### ISSUE-066: Vista de Materiales de una Clase (alumno)

**DESCRIPCIÓN:**  
Implementar la vista donde el alumno ve y accede a todos los materiales de una clase: archivos descargables, links de video y notas de texto.

**RESULTADOS ESPERADOS:**  
- [ ] Listado de materiales con ícono y nombre según tipo.
- [ ] Para archivos: botón de descarga.
- [ ] Para links de video: botón que abre en nueva pestaña o embed de video.
- [ ] Para notas: visualización del contenido de texto.
- [ ] Breadcrumb: Mis Materias > [Materia] > Clases > [Clase] > Materiales.

**PUNTAJE:**  
40

---

## FASE 1 — FRONTEND: FEATURES TRANSVERSALES

---

### ISSUE-067: Página principal pública (landing) con branding escolar

**DESCRIPCIÓN:**  
Implementar la página de inicio pública del campus virtual, visible antes de hacer login. Inspirada en la referencia visual (campus UNAB): banner principal, descripción del sistema y botón de acceso.

**RESULTADOS ESPERADOS:**  
- [ ] Página `/` con: banner/slider con imágenes, nombre de la institución, descripción.
- [ ] Botón prominente de "Ingresar" que redirige a `/login`.
- [ ] Barra de navegación con logo de la escuela y botón de login.
- [ ] Footer con información de contacto.
- [ ] Responsive mobile.

**PUNTAJE:**  
50

---

### ISSUE-068: Sistema de notificaciones toast

**DESCRIPCIÓN:**  
Implementar un sistema global de notificaciones toast para feedback de acciones del usuario: éxito, error, info y advertencia.

**RESULTADOS ESPERADOS:**  
- [ ] Componente `Toast` y `ToastContainer` configurados.
- [ ] Hook `useToast()` para usar desde cualquier componente.
- [ ] Variantes: `success`, `error`, `info`, `warning`.
- [ ] Auto-dismiss configurable (default: 3 segundos).
- [ ] Posición configurable (default: top-right).

**PUNTAJE:**  
30

---

### ISSUE-069: Componente de estados de carga y vacío

**DESCRIPCIÓN:**  
Implementar componentes reutilizables para estados de carga (skeleton loaders) y estados vacíos (empty states) para usar en todas las vistas con listas o tablas.

**RESULTADOS ESPERADOS:**  
- [ ] Componente `Skeleton` con variantes: `text`, `card`, `table-row`, `avatar`.
- [ ] Componente `EmptyState` con icono, mensaje configurable y acción opcional.
- [ ] Usados en todas las listas/tablas del sistema.

**PUNTAJE:**  
25

---

### ISSUE-070: Diseño responsive y adaptable a mobile

**DESCRIPCIÓN:**  
Garantizar que todas las vistas principales del campus virtual sean responsivas y funcionales en dispositivos móviles (breakpoint: 768px) y tablets (1024px).

**RESULTADOS ESPERADOS:**  
- [ ] Sidebar colapsa automáticamente en mobile.
- [ ] Tablas de gestión adaptables (scroll horizontal o vista tipo cards en mobile).
- [ ] Formularios y modales adaptables a mobile.
- [ ] Todas las vistas probadas en viewport 375px y 768px.
- [ ] Sin scroll horizontal no intencionado en ninguna vista.

**PUNTAJE:**  
60

---

## FASE 1 — TESTING

---

### ISSUE-071: Setup de framework de testing (Vitest + Testing Library)

**DESCRIPCIÓN:**  
Configurar el framework de testing para el frontend (Vitest + React Testing Library) y el backend (Jest + Supertest). Incluir configuración de cobertura y scripts de test.

**RESULTADOS ESPERADOS:**  
- [ ] Vitest configurado para frontend con React Testing Library.
- [ ] Jest configurado para backend con Supertest.
- [ ] Scripts `npm run test` y `npm run test:coverage` funcionales en ambos proyectos.
- [ ] Al menos un test de ejemplo en cada proyecto para validar la configuración.
- [ ] Integración con el pipeline CI.

**PUNTAJE:**  
60

---

### ISSUE-072: Tests unitarios — Middlewares de autenticación (backend)

**DESCRIPCIÓN:**  
Escribir tests unitarios para los middlewares de autenticación y autorización: `authenticate` y `authorize`, cubriendo todos los casos posibles (token válido, inválido, expirado, sin rol).

**RESULTADOS ESPERADOS:**  
- [ ] Test: token válido pasa `authenticate` correctamente.
- [ ] Test: sin token devuelve 401.
- [ ] Test: token inválido devuelve 401.
- [ ] Test: `authorize('ADMIN')` con user ADMIN pasa.
- [ ] Test: `authorize('ADMIN')` con user ALUMNO devuelve 403.
- [ ] Cobertura mínima: 80% en los middlewares testeados.

**PUNTAJE:**  
50

---

### ISSUE-073: Tests de integración — Endpoints de autenticación (backend)

**DESCRIPCIÓN:**  
Escribir tests de integración para los endpoints de autenticación: login, refresh, logout y me. Usar Supertest con base de datos de test.

**RESULTADOS ESPERADOS:**  
- [ ] Test: login con credenciales correctas devuelve 200 + tokens.
- [ ] Test: login con contraseña incorrecta devuelve 401.
- [ ] Test: refresh con token válido devuelve nuevo access token.
- [ ] Test: logout invalida el refresh token.
- [ ] Test: `GET /api/auth/me` con token válido devuelve datos del usuario.
- [ ] Setup y teardown de base de datos de test configurados.

**PUNTAJE:**  
70

---

### ISSUE-074: Tests unitarios — Componentes base del frontend

**DESCRIPCIÓN:**  
Escribir tests unitarios para los componentes base reutilizables: Button, Input, Modal, Badge, Alert.

**RESULTADOS ESPERADOS:**  
- [ ] Test de Button: render, click, variantes, disabled.
- [ ] Test de Input: render, value, onChange, validación.
- [ ] Test de Modal: apertura, cierre, contenido.
- [ ] Test de Badge: variantes de color.
- [ ] Test de Alert: variantes y contenido.

**PUNTAJE:**  
45

---

## FASE 2 — ESCALADO A 30 CURSOS

---

### ISSUE-075: Seed completo de los 30 cursos con sus materias y turnos

**DESCRIPCIÓN:**  
Crear el seed completo de datos reales para los 30 cursos (1° a 6° en 3 turnos más dos divisiones por año), con las materias correspondientes por año (los sextos con 9 materias).

**RESULTADOS ESPERADOS:**  
- [ ] Seed que inserta los 30 cursos con grado, división y turno correctos.
- [ ] Materias asignadas por año escolar (distribución real de la escuela).
- [ ] Script `npm run db:seed:fase2` funcional.
- [ ] Documentación de la distribución de cursos y materias.

**PUNTAJE:**  
60

---

### ISSUE-076: Paginación y performance para listados de alumnos (30 cursos)

**DESCRIPCIÓN:**  
Optimizar los endpoints de listado de alumnos y cursos para manejar la carga de 30 cursos con ~30 alumnos cada uno (~900 alumnos). Agregar índices en la base de datos y paginación eficiente.

**RESULTADOS ESPERADOS:**  
- [ ] Índices de base de datos en campos de filtrado frecuente (email, DNI, courseId, turno).
- [ ] Paginación con cursor o offset+limit en todos los endpoints de listado.
- [ ] Tiempo de respuesta < 500ms para listados paginados con 1000 registros.
- [ ] Prueba de carga básica documentada.

**PUNTAJE:**  
70

---

### ISSUE-077: Integración con Google Drive para importación de alumnos

**DESCRIPCIÓN:**  
Implementar la integración con la API de Google Drive para leer archivos de alumnos directamente desde Drive, sin necesidad de descarga manual.

**RESULTADOS ESPERADOS:**  
- [ ] Autenticación con Google Drive API (OAuth2 o Service Account).
- [ ] Endpoint `POST /api/admin/students/import-from-drive` que acepta URL de archivo Drive.
- [ ] Soporte para Google Sheets y archivos Excel en Drive.
- [ ] Documentación de configuración de credenciales Google.

**PUNTAJE:**  
100

---

### ISSUE-078: Panel de estadísticas y reportes para Admin

**DESCRIPCIÓN:**  
Implementar un panel de estadísticas y reportes para el administrador: alumnos por curso/turno, distribución de materiales por materia, actividad de clases habilitadas.

**RESULTADOS ESPERADOS:**  
- [ ] Gráfico de barras: cantidad de alumnos por curso.
- [ ] Gráfico de torta: distribución por turno.
- [ ] Tabla: materias con más y menos materiales subidos.
- [ ] Exportación de reportes a CSV.

**PUNTAJE:**  
80

---

### ISSUE-079: Setup de E2E Testing con Playwright

**DESCRIPCIÓN:**  
Configurar Playwright para tests end-to-end y escribir los tests críticos del flujo completo: login por rol, navegación de alumno, subida de material por docente.

**RESULTADOS ESPERADOS:**  
- [ ] Playwright configurado con entorno de staging/test.
- [ ] Test E2E: login como alumno → ver materias → ver clases → ver materiales.
- [ ] Test E2E: login como docente → crear clase → subir material → habilitar clase.
- [ ] Test E2E: login como admin → crear curso → asignar docente → inscribir alumno.
- [ ] Scripts `npm run test:e2e` funcional.

**PUNTAJE:**  
80

---

### ISSUE-080: Documentación de despliegue en VPS y Docker

**DESCRIPCIÓN:**  
Documentar el proceso completo de despliegue del campus virtual en un VPS con Docker, incluyendo configuración de NGINX, certificados SSL y variables de producción.

**RESULTADOS ESPERADOS:**  
- [ ] `docs/DEPLOYMENT.md` con guía paso a paso de despliegue.
- [ ] Configuración de NGINX como reverse proxy documentada.
- [ ] Configuración de SSL con Let's Encrypt documentada.
- [ ] Secrets de GitHub Actions necesarios listados y documentados.
- [ ] Guía de rollback ante fallo.

**PUNTAJE:**  
60

---

## RESUMEN DE PUNTAJES POR ÁREA

| Área | Issues | Puntaje Total Aprox. |
|------|--------|----------------------|
| Setup e Infraestructura | ISSUE-001 a ISSUE-010 | 710 |
| Documentación | ISSUE-011 a ISSUE-016 | 320 |
| Backend — Modelos y DB | ISSUE-017 a ISSUE-025 | 360 |
| Backend — Autenticación | ISSUE-026 a ISSUE-029 | 195 |
| Backend — Usuarios | ISSUE-030 a ISSUE-034 | 345 |
| Backend — Estructura Académica | ISSUE-035 a ISSUE-038 | 160 |
| Backend — Clases y Materiales | ISSUE-039 a ISSUE-044 | 280 |
| Frontend — Estructura Base | ISSUE-045 a ISSUE-050 | 320 |
| Frontend — Autenticación | ISSUE-051 | 50 |
| Frontend — Panel Admin | ISSUE-052 a ISSUE-058 | 380 |
| Frontend — Panel Docente | ISSUE-059 a ISSUE-062 | 215 |
| Frontend — Panel Alumno | ISSUE-063 a ISSUE-066 | 165 |
| Frontend — Features Transversales | ISSUE-067 a ISSUE-070 | 165 |
| Testing | ISSUE-071 a ISSUE-074 | 225 |
| Fase 2 — Escalado | ISSUE-075 a ISSUE-080 | 450 |
| **TOTAL** | **80 issues** | **~4.340 pts** |

---

> **Nota:** Los puntajes de gestión (apertura/merge/revisión de PRs, creación de issues, etc.) se suman automáticamente vía GitHub Actions y se acreditan a `dgimenezdeveloper`/`folkodegroup`.
