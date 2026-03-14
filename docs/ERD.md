# Modelo de Datos (ERD) - Campus Virtual

Este documento describe el modelo de datos objetivo del sistema para la Fase 1.

## Diagrama ERD (Mermaid)

```mermaid
erDiagram
    direction LR

    USER ||--o{ TEACHER_SUBJECT_COURSE : dicta
    SUBJECT ||--o{ TEACHER_SUBJECT_COURSE : se_asigna_en
    COURSE ||--o{ TEACHER_SUBJECT_COURSE : recibe

    TEACHER_SUBJECT_COURSE ||--o{ CLASS : planifica
    CLASS ||--o{ MATERIAL : contiene
    USER ||--o{ MATERIAL : sube

    USER ||--o{ ENROLLMENT : registra
    COURSE ||--o{ ENROLLMENT : incluye

    USER {
        uuid id PK
        string nombre
        string apellido
        string email UK
        string password
        enum rol
        boolean activo
        datetime createdAt
        datetime updatedAt
    }

    COURSE {
        uuid id PK
        string nombre
        int grado
        string division
        enum turno
        int anoEscolar
        boolean activo
        datetime createdAt
        datetime updatedAt
    }

    SUBJECT {
        uuid id PK
        string nombre
        string descripcion
        string color
        string icono
        boolean activo
        datetime createdAt
        datetime updatedAt
    }

    TEACHER_SUBJECT_COURSE {
        uuid id PK
        uuid teacherId FK
        uuid subjectId FK
        uuid courseId FK
        int anoEscolar
        datetime createdAt
        datetime updatedAt
    }

    CLASS {
        uuid id PK
        uuid assignmentId FK
        string titulo
        string descripcion
        int semana
        boolean habilitada
        datetime fechaHabilitacion
        datetime createdAt
        datetime updatedAt
    }

    MATERIAL {
        uuid id PK
        uuid classId FK
        enum tipo
        string titulo
        string descripcion
        string url
        string nombreArchivo
        int tamanioBytes
        uuid uploaderId FK
        datetime createdAt
    }

    ENROLLMENT {
        uuid id PK
        uuid studentId FK
        uuid courseId FK
        int anoEscolar
        datetime fechaInscripcion
        boolean activo
        datetime createdAt
        datetime updatedAt
    }
```

## Entidades

### User
Representa a cualquier persona que usa la plataforma.

Atributos principales:
- id (PK)
- nombre
- apellido
- email (UK)
- password
- rol (ADMIN, DOCENTE, ALUMNO)
- activo
- createdAt
- updatedAt

Responsabilidad:
- Base de identidad y autenticacion del sistema.
- Un usuario con rol DOCENTE puede estar asignado a multiples combinaciones de materia y curso.
- Un usuario con rol ALUMNO se vincula a cursos mediante inscripciones.

### Course
Representa un curso escolar (por ejemplo, 1A, 2B, etc.) en un turno y anio lectivo.

Atributos principales:
- id (PK)
- nombre
- grado
- division
- turno (MANANA, TARDE, NOCHE)
- anoEscolar
- activo
- createdAt
- updatedAt

Responsabilidad:
- Agrupa alumnos (inscripciones) y materias que se dictan en ese curso.

### Subject
Representa una materia academica (por ejemplo, Matematica, Historia).

Atributos principales:
- id (PK)
- nombre
- descripcion
- color
- icono
- activo
- createdAt
- updatedAt

Responsabilidad:
- Define el contenido curricular que puede dictarse en uno o varios cursos.

### TeacherSubjectCourse
Tabla de asignacion academica. Vincula a un docente con una materia y un curso para un anio escolar.

Atributos principales:
- id (PK)
- teacherId (FK -> User)
- subjectId (FK -> Subject)
- courseId (FK -> Course)
- anoEscolar
- createdAt
- updatedAt

Responsabilidad:
- Resolver la relacion N:M entre docentes, materias y cursos.
- Punto de origen para crear clases semanales.

### Class
Representa una clase semanal publicada por un docente para una asignacion especifica.

Atributos principales:
- id (PK)
- assignmentId (FK -> TeacherSubjectCourse)
- titulo
- descripcion
- semana
- habilitada
- fechaHabilitacion
- createdAt
- updatedAt

Responsabilidad:
- Organizar el contenido pedagogico por semana.
- Servir de contenedor para materiales.

### Material
Representa un recurso de aprendizaje asociado a una clase (archivo, link, nota, etc.).

Atributos principales:
- id (PK)
- classId (FK -> Class)
- tipo (PDF, IMAGEN, VIDEO_LINK, ARCHIVO, NOTA)
- titulo
- descripcion
- url
- nombreArchivo
- tamanioBytes
- uploaderId (FK -> User)
- createdAt

Responsabilidad:
- Almacenar y clasificar recursos educativos publicados en cada clase.

### Enrollment
Representa la inscripcion de un alumno a un curso en un anio escolar.

Atributos principales:
- id (PK)
- studentId (FK -> User)
- courseId (FK -> Course)
- anoEscolar
- fechaInscripcion
- activo
- createdAt
- updatedAt

Responsabilidad:
- Resolver la relacion N:M entre alumnos y cursos a traves del tiempo.

## Relaciones y cardinalidades

- User (DOCENTE) 1:N TeacherSubjectCourse
  - Un docente puede tener multiples asignaciones.
  - Cada asignacion pertenece a un unico docente.

- Subject 1:N TeacherSubjectCourse
  - Una materia puede estar asignada en muchos cursos/docentes.
  - Cada asignacion referencia una unica materia.

- Course 1:N TeacherSubjectCourse
  - Un curso puede tener multiples asignaciones docentes de distintas materias.
  - Cada asignacion pertenece a un unico curso.

- TeacherSubjectCourse 1:N Class
  - Una asignacion puede tener muchas clases.
  - Cada clase pertenece a una unica asignacion.

- Class 1:N Material
  - Una clase puede tener muchos materiales.
  - Cada material pertenece a una unica clase.

- User 1:N Material (uploader)
  - Un usuario puede subir muchos materiales.
  - Cada material tiene un unico usuario cargador.

- User (ALUMNO) 1:N Enrollment y Course 1:N Enrollment
  - Estas dos relaciones implementan User(ALUMNO) N:M Course mediante Enrollment.

## Relaciones N:M resueltas con tablas intermedias

- User(ALUMNO) N:M Course -> Enrollment.
- User(DOCENTE) N:M Subject y N:M Course -> TeacherSubjectCourse (asociacion ternaria docente-materia-curso).

## Notas

- Este ERD refleja el modelo objetivo de negocio definido por las historias/issues del proyecto.
- El esquema actual en Prisma puede estar en avance incremental respecto de este modelo objetivo.
