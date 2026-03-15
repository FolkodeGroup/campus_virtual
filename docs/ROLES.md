# Sistema de Roles y Permisos

Este documento describe los roles del sistema y los permisos diferenciados por recurso y endpoint.

## Roles del sistema

### 1. Admin
- **Descripción:** Usuario con acceso total al sistema. Puede gestionar usuarios, cursos, materias, asignaciones, inscripciones y ver estadísticas.
- **Capacidades principales:**
  - Crear, editar y eliminar usuarios (admins, docentes, alumnos).
  - Asignar docentes a materias y cursos.
  - Inscribir alumnos a cursos.
  - Gestionar cursos y materias.
  - Acceder a reportes y estadísticas.
  - Gestionar materiales y clases de cualquier curso.

### 2. Docente
- **Descripción:** Usuario encargado de dictar materias en uno o varios cursos.
- **Capacidades principales:**
  - Ver y editar sus propias clases y materiales.
  - Habilitar/deshabilitar clases.
  - Subir materiales a sus clases.
  - Ver lista de alumnos de sus cursos.
  - Acceder a su propio panel docente.

### 3. Alumno
- **Descripción:** Usuario que cursa materias en un curso determinado.
- **Capacidades principales:**
  - Ver materias y clases habilitadas de su curso.
  - Descargar materiales de sus clases.
  - Acceder a su propio panel de alumno.

## Tabla de permisos por recurso/endpoint

| Recurso / Endpoint                | Admin | Docente | Alumno |
|-----------------------------------|:-----:|:-------:|:------:|
| `/api/admin/admins`               |  ✔️   |         |        |
| `/api/admin/teachers`             |  ✔️   |         |        |
| `/api/admin/students`             |  ✔️   |         |        |
| `/api/admin/courses`              |  ✔️   |         |        |
| `/api/admin/subjects`             |  ✔️   |         |        |
| `/api/admin/assignments`          |  ✔️   |         |        |
| `/api/admin/enrollments`          |  ✔️   |         |        |
| `/api/teacher/classes`            |       |   ✔️    |        |
| `/api/teacher/classes/:id`        |       |   ✔️    |        |
| `/api/teacher/classes/:id/materials` |     |   ✔️    |        |
| `/api/teacher/materials/:materialId` |    |   ✔️    |        |
| `/api/student/subjects`           |       |         |   ✔️   |
| `/api/student/subjects/:subjectId/classes` | |       |   ✔️   |
| `/api/student/classes/:classId/materials` | |       |   ✔️   |
| `/api/student/materials/:materialId/download` | |     |   ✔️   |
| `/api/auth/me`                    |  ✔️   |   ✔️    |   ✔️   |
| `/api/auth/login`                 |  ✔️   |   ✔️    |   ✔️   |
| `/api/auth/change-password`       |  ✔️   |   ✔️    |   ✔️   |

**Leyenda:**
- ✔️ = Acceso permitido
- Celda vacía = Acceso denegado

## Casos de uso por rol

### Admin
- Crear un nuevo curso y asignar docentes y materias.
- Inscribir alumnos a cursos y gestionar sus datos.
- Consultar reportes de actividad y puntajes.
- Editar o eliminar cualquier usuario, curso, materia o material.

### Docente
- Crear y publicar clases semanales para sus materias asignadas.
- Subir materiales (archivos, links, notas) a sus clases.
- Habilitar o deshabilitar clases para los alumnos.
- Ver la lista de alumnos de sus cursos.

### Alumno
- Ver el listado de materias de su curso actual.
- Acceder a las clases habilitadas de cada materia.
- Descargar materiales de las clases.
- Consultar novedades y actividades recientes en su panel.

---

> **Nota:** Los permisos pueden ampliarse o ajustarse según la evolución del sistema y los requerimientos de la institución.
