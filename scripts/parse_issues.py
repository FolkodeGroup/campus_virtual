import sys
import subprocess
import re

issue_file = sys.argv[1]
repo       = sys.argv[2]

with open(issue_file, 'r', encoding='utf-8') as f:
    content = f.read()

blocks = re.split(r'\n(?=### ISSUE-\d+:)', content)

LABEL_MAP = [
    ('SETUP',    ['MONOREPO', 'WORKSPACES', 'DOCKER-COMPOSE', 'DOCKER COMPOSE',
                  'VARIABLES DE ENTORNO', 'GITHUB PROJECT', 'MILESTONES',
                  'WORKFLOWS DE PUNTAJES']),
    ('DEVOPS',   ['CI PIPELINE', 'CD PIPELINE', 'CI/CD', 'DESPLIEGUE', 'VPS', 'DOCKERFILE']),
    ('AUTH',     ['JWT', 'LOGIN', 'LOGOUT', 'REFRESH TOKEN', 'AUTENTICACI',
                  'CONTRASE', 'BCRYPT', 'PERFIL DE USUARIO AUTENTICADO']),
    ('TESTING',  ['PLAYWRIGHT', 'VITEST', 'JEST', 'TESTS UNITARIOS',
                  'TESTS DE INTEGRACI', 'E2E TESTING', 'FRAMEWORK DE TESTING']),
    ('DOCS',     ['README', 'DOCUMENTACI', 'CONTRIBUTING', 'ERD',
                  'PRESUPUESTO', 'ROLES Y PERMISOS', 'API REST']),
    ('FRONTEND', ['REACT ROUTER', 'VITE', 'SIDEBAR', 'HEADER', 'LAYOUT BASE',
                  'ESTILOS GLOBALES', 'AUTHCONTEXT', 'AXIOS', 'DASHBOARD DEL',
                  'PANEL ADMIN', 'PANEL DOCENTE', 'PANEL ALUMNO',
                  'VISTA DE', 'MIS MATERIAS', 'TOAST', 'SKELETON',
                  'RESPONSIVE', 'LANDING', 'DE LOGIN',
                  'BIBLIOTECA DE COMPONENTES', 'REACT']),
    ('BACKEND',  ['CRUD', 'ENDPOINT', 'PRISMA', 'MODELO DE',
                  'SEED', 'IMPORTACI', 'ASIGNACI', 'INSCRIPCI',
                  'UPLOAD', 'MATERIAL DE CLASE', 'HABILITACI',
                  'DESCARGA', 'ALUMNO A CURSO']),
]

def get_label(title, body):
    text = (title + ' ' + body[:400]).upper()
    for label, keywords in LABEL_MAP:
        for kw in keywords:
            if re.search(kw, text):
                return label
    return 'FEATURE'

created = 0
errors  = 0
skipped = 0

for block in blocks:
    block = block.strip()
    if not block.startswith('### ISSUE-'):
        skipped += 1
        continue

    block = re.sub(r'\n---[\s]*$', '', block).strip()
    lines      = block.split('\n')
    first_line = lines[0]

    m = re.match(r'^### ISSUE-\d+:\s+(.+)$', first_line)
    if not m:
        print(f"⚠️  Sin título válido, saltando: {first_line[:60]}")
        skipped += 1
        continue

    title = m.group(1).strip()
    body  = '\n'.join(lines[1:]).strip()
    label = get_label(title, body)

    print(f"\n→ [{label}] {title}")

    result = subprocess.run(
        ['gh', 'issue', 'create',
         '--repo',  repo,
         '--title', title,
         '--body',  body,
         '--label', label],
        capture_output=True,
        text=True
    )

    if result.returncode == 0:
        print(f"  ✅ {result.stdout.strip()}")
        created += 1
    else:
        print(f"  ❌ Error: {result.stderr.strip()}")
        errors += 1

print(f"\n{'='*60}")
print(f"✅ Issues creadas  : {created}")
print(f"❌ Errores         : {errors}")
print(f"⏭  Bloques saltados: {skipped}")
