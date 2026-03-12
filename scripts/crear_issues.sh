#!/bin/bash

ISSUE_FILE="ISSUES_CAMPUS_VIRTUAL.md"
REPO="FolkodeGroup/campus_virtual"

echo "📋 Creando etiquetas..."
gh label create "SETUP"    --color "0075ca" --description "Inicializacion, configuracion, infraestructura" --repo "$REPO" 2>/dev/null || true
gh label create "BACKEND"  --color "e4e669" --description "Logica del servidor, API, base de datos"        --repo "$REPO" 2>/dev/null || true
gh label create "FRONTEND" --color "bfd4f2" --description "UI, componentes, vistas"                        --repo "$REPO" 2>/dev/null || true
gh label create "DOCS"     --color "cfd3d7" --description "Documentacion, README, guias"                   --repo "$REPO" 2>/dev/null || true
gh label create "AUTH"     --color "d93f0b" --description "Autenticacion, autorizacion, roles"              --repo "$REPO" 2>/dev/null || true
gh label create "TESTING"  --color "0e8a16" --description "Tests unitarios, integracion, E2E"              --repo "$REPO" 2>/dev/null || true
gh label create "DEVOPS"   --color "5319e7" --description "CI/CD, Docker, despliegue"                      --repo "$REPO" 2>/dev/null || true
gh label create "FEATURE"  --color "a2eeef" --description "Nueva funcionalidad"                             --repo "$REPO" 2>/dev/null || true
gh label create "BUG"      --color "d73a4a" --description "Correccion de errores"                          --repo "$REPO" 2>/dev/null || true
echo "✅ Etiquetas listas."
echo ""
echo "📝 Procesando issues..."
python3 parse_issues.py "$ISSUE_FILE" "$REPO"
