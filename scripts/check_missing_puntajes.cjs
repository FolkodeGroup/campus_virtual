#!/usr/bin/env node
'use strict';

/**
 * check_missing_puntajes.cjs
 * Verifica issues cerrados que no tienen `PUNTAJE: X` en su descripción.
 * Genera un reporte en .missing_puntajes_report.md si hay issues sin puntaje.
 */

const fs = require('fs');

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const OWNER = 'FolkodeGroup';
const REPO = 'campus_virtual';

if (!GITHUB_TOKEN) {
  console.error('❌ GITHUB_TOKEN no está definido.');
  process.exit(1);
}

async function getAllPages(baseUrl) {
  const results = [];
  let page = 1;
  const separator = baseUrl.includes('?') ? '&' : '?';
  while (true) {
    const response = await fetch(`${baseUrl}${separator}per_page=100&page=${page}`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'campus-virtual-scores',
      },
    });
    if (!response.ok) break;
    const data = await response.json();
    if (!Array.isArray(data) || data.length === 0) break;
    results.push(...data);
    if (data.length < 100) break;
    page++;
  }
  return results;
}

async function main() {
  console.log('🔍 Verificando issues sin puntaje asignado...');

  const BASE = `https://api.github.com/repos/${OWNER}/${REPO}`;
  const issues = await getAllPages(`${BASE}/issues?state=closed`);

  // Filtrar solo issues reales (no PRs) sin PUNTAJE en el body
  const missing = issues.filter((issue) => {
    if (issue.pull_request) return false;
    const body = issue.body || '';
    // Buscar PUNTAJE en la misma línea O en la siguiente
    const hasPuntaje = /PUNTAJE\s*[:：]\s*\d+/i.test(body) || /PUNTAJE\s*[:：]\s*\n\s*\d+/i.test(body);
    return !hasPuntaje;
  });

  // Limpiar reporte anterior si no hay issues faltantes
  if (missing.length === 0) {
    console.log('✅ Todos los issues cerrados tienen puntaje asignado.');
    if (fs.existsSync('.missing_puntajes_report.md')) {
      fs.unlinkSync('.missing_puntajes_report.md');
    }
    return;
  }

  let report = `## ⚠️ Issues cerrados sin puntaje asignado (${missing.length})\n\n`;
  report += `Los siguientes issues no tienen \`PUNTAJE: <valor>\` en su descripción.\n`;
  report += `Editá cada issue y agregá la línea al final del body:\n\n`;
  report += `\`\`\`\nPUNTAJE: <valor>\n\`\`\`\n\n`;

  for (const issue of missing) {
    report += `- [#${issue.number} — ${issue.title}](${issue.html_url})\n`;
  }

  report += `\n> **Tabla de referencia de puntajes:** ver [PUNTAJES.md](PUNTAJES.md)\n`;

  fs.writeFileSync('.missing_puntajes_report.md', report, 'utf8');
  console.log(`⚠️  ${missing.length} issues sin puntaje asignado. Reporte en .missing_puntajes_report.md`);
}

main().catch((err) => {
  console.error('❌ Error en check_missing_puntajes.cjs:', err.message);
  process.exit(1);
});
