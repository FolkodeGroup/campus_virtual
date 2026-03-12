#!/usr/bin/env node
'use strict';

/**
 * sumar_puntajes.cjs
 * Consolida SCORES.md sumando:
 *   1. Puntaje de issues cerrados (lee PUNTAJE: X del body del issue)
 *      — El puntaje se acredita al assignee; si no tiene, al autor.
 *   2. Actividades de gestión desde MANAGEMENT_LOG.md
 *
 * Mapeo de usuarios:
 *   folkodegroup → dgimenezdeveloper
 */

const fs = require('fs');

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const OWNER = 'FolkodeGroup';
const REPO = 'campus_virtual';
const DEV_MAP = { folkodegroup: 'dgimenezdeveloper' };

if (!GITHUB_TOKEN) {
  console.error('❌ GITHUB_TOKEN no está definido.');
  process.exit(1);
}

function resolveActor(actor) {
  return DEV_MAP[(actor || '').toLowerCase()] || actor;
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
  console.log('📊 Consolidando SCORES.md...');

  const BASE = `https://api.github.com/repos/${OWNER}/${REPO}`;

  // scores[dev] = { total: number, entries: Array<{puntaje, tipo, titulo, fecha}> }
  const scores = {};

  function addEntry(dev, puntaje, tipo, titulo, fecha) {
    dev = resolveActor(dev);
    if (!scores[dev]) scores[dev] = { total: 0, entries: [] };
    scores[dev].total += puntaje;
    scores[dev].entries.push({ puntaje, tipo, titulo: titulo.replace(/\|/g, '-'), fecha });
  }

  // ── 1. Issues cerrados con PUNTAJE ──────────────────────────────────────────
  console.log('  → Leyendo issues cerrados...');
  const issues = await getAllPages(`${BASE}/issues?state=closed`);

  for (const issue of issues) {
    if (issue.pull_request) continue;
    const body = issue.body || '';
    const match = body.match(/PUNTAJE\s*[:：]\s*(\d+)/i);
    if (!match) continue;

    const puntaje = parseInt(match[1], 10);
    if (puntaje <= 0) continue;

    const assignee = issue.assignee?.login || issue.user?.login || 'unknown';
    const fecha = (issue.closed_at || issue.updated_at).split('T')[0];
    addEntry(assignee, puntaje, 'Issue', issue.title, fecha);
  }

  // ── 2. Actividades de gestión desde MANAGEMENT_LOG.md ───────────────────────
  console.log('  → Leyendo MANAGEMENT_LOG.md...');
  if (fs.existsSync('MANAGEMENT_LOG.md')) {
    const logContent = fs.readFileSync('MANAGEMENT_LOG.md', 'utf8');
    const lines = logContent.split('\n');

    for (const line of lines) {
      // Formato esperado: | dev | puntaje | actividad | referencia | fecha |
      const match = line.match(
        /^\|\s*([^|]+?)\s*\|\s*(\d+)\s*\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|\s*(\d{4}-\d{2}-\d{2})\s*\|/
      );
      if (!match) continue;

      const [, dev, puntajeStr, actividad, referencia, fecha] = match;
      if (dev.trim() === 'Dev') continue; // Saltar encabezado

      const puntaje = parseInt(puntajeStr, 10);
      if (isNaN(puntaje) || puntaje <= 0) continue;

      const titulo = `${actividad.trim()} — ${referencia.trim()}`;
      addEntry(dev.trim(), puntaje, 'Gestión', titulo, fecha);
    }
  } else {
    console.log('  ℹ MANAGEMENT_LOG.md no encontrado, saltando gestión.');
  }

  // Ordenar entradas por fecha descendente dentro de cada dev
  for (const dev of Object.keys(scores)) {
    scores[dev].entries.sort((a, b) => b.fecha.localeCompare(a.fecha));
  }

  // Ordenar devs por puntaje total descendente
  const sortedDevs = Object.keys(scores).sort((a, b) => scores[b].total - scores[a].total);

  // ── Generar SCORES.md ────────────────────────────────────────────────────────
  const today = new Date().toISOString().split('T')[0];
  let content = `# SCORES — Campus Virtual\n\n`;
  content += `> Actualizado automáticamente: ${today}\n\n`;

  // Tabla resumen
  content += `| Dev | Puntaje acumulado |\n`;
  content += `|-----|-------------------|\n`;
  for (const dev of sortedDevs) {
    content += `| ${dev} | ${scores[dev].total} |\n`;
  }

  // Tabla detalle
  content += `\n\n## Detalle por actividad\n`;
  content += `| Dev | Puntaje | Tipo | Título / Actividad | Fecha |\n`;
  content += `|-----|---------|------|--------------------|-------|\n`;
  for (const dev of sortedDevs) {
    for (const entry of scores[dev].entries) {
      content += `| ${dev} | ${entry.puntaje} | ${entry.tipo} | ${entry.titulo} | ${entry.fecha} |\n`;
    }
  }

  fs.writeFileSync('SCORES.md', content, 'utf8');

  const totalPuntos = sortedDevs.reduce((sum, dev) => sum + scores[dev].total, 0);
  console.log(`✅ SCORES.md generado. Total acumulado: ${totalPuntos} pts.`);
  for (const dev of sortedDevs) {
    console.log(`   ${dev}: ${scores[dev].total} pts`);
  }
}

main().catch((err) => {
  console.error('❌ Error en sumar_puntajes.cjs:', err.message);
  process.exit(1);
});
