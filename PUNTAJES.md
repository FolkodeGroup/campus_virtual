---
Sistema de puntajes y distribución de ganancias — Campus Virtual
---

## ¿Cómo funciona el sistema de puntajes?

Cada tarea (issue) del proyecto tiene un puntaje asignado según su complejidad. Al finalizar el proyecto, se suman los puntajes de todas las tareas completadas por cada colaborador.

### Puntaje total del proyecto
El puntaje total será la suma de los puntajes de todos los issues completados. El puntaje total estimado del proyecto es **~4.340 pts** distribuidos en 80 issues.

### Reparto proporcional del dinero
Al finalizar el proyecto, el dinero total se reparte entre los colaboradores según la proporción de puntaje obtenido respecto al puntaje total del proyecto.

#### Ejemplo:
- Dinero total a repartir: $10,000
- Puntaje total del proyecto: 4,340
- Colaborador A: 1,500 puntos → (1500 / 4340) × $10,000 = **$3,456**
- Colaborador B: 2,840 puntos → (2840 / 4340) × $10,000 = **$6,544**

### Reglas adicionales
- Cada issue debe tener asignado un responsable antes de iniciarse.
- Los puntajes se definen en el body del issue con la línea: `PUNTAJE: <valor>`
- El sistema es transparente y auditable desde `SCORES.md` y `MANAGEMENT_LOG.md`.

---

## Tabla de puntajes por tipo de tarea

### Issues (tareas de desarrollo)
| Complejidad | Puntaje sugerido | Ejemplos |
|-------------|-----------------|----------|
| Muy baja    | 10–20            | Pequeños ajustes, correcciones |
| Baja        | 25–40            | Configuración básica, modelos simples |
| Media       | 45–70            | CRUD completo, componentes con lógica |
| Alta        | 75–100           | Autenticación, uploads, importaciones |
| Muy alta    | 100–200          | Integraciones externas, pipelines CI/CD |

### Actividades de gestión (automáticas — acreditadas a dgimenezdeveloper)
Registradas automáticamente por `puntajes_gestion.yml` en `MANAGEMENT_LOG.md`.

| Actividad                                         | Puntaje |
|---------------------------------------------------|---------|
| Revisión de PR — Aprobación                       | 15      |
| Revisión de PR — Solicitud de cambios             | 10      |
| Revisión de PR — Comentario de revisión           | 5       |
| Merge de PR                                       | 15      |
| Apertura de PR                                    | 5       |
| Creación de milestone                             | 5       |
| Cierre de milestone                               | 15      |
| Creación de issue                                 | 3       |
| Etiquetado de issue                               | 2       |
| Asignación de issue                               | 3       |

> **Nota:** El usuario `folkodegroup` se mapea a `dgimenezdeveloper` a efectos de puntaje.

---

## Transparencia y auditoría

- `MANAGEMENT_LOG.md` — registro completo de actividades de gestión con fecha y puntaje.
- `SCORES.md` — tabla consolidada de puntajes por colaborador (issues + gestión).
- Actualización automática cada domingo a las 00:00 UTC via `actualizar_puntajes_semanal.yml`.
- Script `scripts/sumar_puntajes.cjs` — consolida puntajes. Ejecutable localmente con `GITHUB_TOKEN`.
- Script `scripts/generar_management_log.cjs` — sincroniza retroactivamente el log de gestión.
- Script `scripts/check_missing_puntajes.cjs` — detecta issues cerrados sin puntaje asignado.

---

## Configuración requerida en GitHub

### Secrets (Settings → Secrets and variables → Actions → Secrets)
| Secret | Descripción |
|--------|-------------|
| `PROJECTS_TOKEN` | Personal Access Token con permisos `repo`, `project` y `read:org` |

### Variables (Settings → Secrets and variables → Actions → Variables)
| Variable | Descripción |
|----------|-------------|
| `PROJECT_NUMBER` | Número del GitHub Project V2 de campus_virtual (ej: `1`) |
