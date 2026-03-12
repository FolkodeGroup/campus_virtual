#!/usr/bin/env node
'use strict';

/**
 * generar_management_log.cjs
 * Regenera MANAGEMENT_LOG.md retroactivamente leyendo el historial de GitHub:
 * - PRs (apertura + merge + reviews)
 * - Issues (apertura + etiquetado + asignación)
 * - Milestones (creación + cierre)
 *
 * Solo registra actividades de: dgimenezdeveloper, folkodegroup
 * Ambos se acreditan a: dgimenezdeveloper
 */

const fs = require('fs');

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const OWNER = 'FolkodeGroup';
const REPO = 'campus_virtual';
const TRACKED_ACTORS = new Set(['dgimenezdeveloper', 'folkodegroup']);
const DEV_MAP = { folkodegroup: 'dgimenezdeveloper' };

if (!GITHUB_TOKEN) {
  console.error('❌ GITHUB_TOKEN no está definido.');
  process.exit(1);
}

function resolveActor(actor) {
  return DEV_MAP[(actor || '').toLowerCase()] || actor;
}

async function githubFetch(url) {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3+json',
      'User-Agent': 'campus-virtual-scores',
    },
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`GitHub API ${response.status}: ${url}\n${text}`);
  }
  return response.json();
}

async function getAllPages(baseUrl) {
  const results = [];
  let page = 1;
  const separator = baseUrl.includes('?') ? '&' : '?';
  while (true) {
    const data = await githubFetch(`${baseUrl}${separator}per_page=100&page=${page}`);
    if (!Array.isArray(data) || data.length === 0) break;
    results.push(...data);
    if (data.length < 100) break;
    page++;
  }
  return results;
}

async function main() {
  console.log('🔄 Generando MANAGEMENT_LOG.md retroactivamente...');

  const BASE = `https://api.github.com/repos/${OWNER}/${REPO}`;
  const entries = [];

  // ── 1. Pull Requests ─────────────────────────────────────────────────────────
  console.log('  → Procesando Pull Requests...');
  const prs = await getAllPages(`${BASE}/pulls?state=all`);

  for (const pr of prs) {
    const actor = pr.user?.login;
    if (!TRACKED_ACTORS.has(actor)) continue;

    const dev = resolveActor(actor);
    const fechaOpen = pr.created_at.split('T')[0];
    const ref = `PR #${pr.number}: ${pr.title.substring(0, 80)}`;

    entries.push({ dev, puntaje: 5, actividad: 'Apertura de PR', referencia: ref, fecha: fechaOpen });

    if (pr.merged_at) {
      const mergedBy = pr.merged_by?.login || actor;
      if (TRACKED_ACTORS.has(mergedBy)) {
        entries.push({
          dev: resolveActor(mergedBy),
          puntaje: 15,
          actividad: 'Merge de PR',
          referencia: ref,
          fecha: pr.merged_at.split('T')[0],
        });
      }
    }

    // Reviews del PR
    try {
      const reviews = await getAllPages(`${BASE}/pulls/${pr.number}/reviews`);
      for (const review of reviews) {
        const reviewer = review.user?.login;
        if (!TRACKED_ACTORS.has(reviewer)) continue;
        const reviewDev = resolveActor(reviewer);
        const state = review.state?.toLowerCase();
        const reviewFecha = review.submitted_at?.split('T')[0] || fechaOpen;

        if (state === 'approved') {
          entries.push({ dev: reviewDev, puntaje: 15, actividad: 'Revisión de PR — Aprobación', referencia: ref, fecha: reviewFecha });
        } else if (state === 'changes_requested') {
          entries.push({ dev: reviewDev, puntaje: 10, actividad: 'Revisión de PR — Solicitud de cambios', referencia: ref, fecha: reviewFecha });
        } else if (state === 'commented') {
          entries.push({ dev: reviewDev, puntaje: 5, actividad: 'Revisión de PR — Comentario de revisión', referencia: ref, fecha: reviewFecha });
        }
      }
    } catch (e) {
      console.warn(`  ⚠ No se pudieron obtener reviews de PR #${pr.number}: ${e.message}`);
    }
  }

  // ── 2. Issues (eventos: apertura, etiquetado, asignación) ────────────────────
  console.log('  → Procesando Issues...');
  const issues = await getAllPages(`${BASE}/issues?state=all`);

  for (const issue of issues) {
    if (issue.pull_request) continue; // Saltear PRs listados como issues

    const actor = issue.user?.login;
    if (!TRACKED_ACTORS.has(actor)) continue;

    const dev = resolveActor(actor);
    const fecha = issue.created_at.split('T')[0];
    const ref = `Issue #${issue.number}: ${issue.title.substring(0, 80)}`;

    entries.push({ dev, puntaje: 3, actividad: 'Creación de issue', referencia: ref, fecha });

    // Eventos del issue (labeled, assigned)
    try {
      const events = await getAllPages(`${BASE}/issues/${issue.number}/events`);
      for (const event of events) {
        const eventActor = event.actor?.login;
        if (!TRACKED_ACTORS.has(eventActor)) continue;
        const eventDev = resolveActor(eventActor);
        const eventFecha = event.created_at?.split('T')[0] || fecha;

        if (event.event === 'labeled') {
          const label = event.label?.name || '';
          entries.push({ dev: eventDev, puntaje: 2, actividad: `Etiquetado de issue (${label})`, referencia: ref, fecha: eventFecha });
        } else if (event.event === 'assigned') {
          const assignee = event.assignee?.login || '';
          entries.push({ dev: eventDev, puntaje: 3, actividad: `Asignación de issue a ${assignee}`, referencia: ref, fecha: eventFecha });
        }
      }
    } catch (e) {
      console.warn(`  ⚠ No se pudieron obtener eventos del issue #${issue.number}: ${e.message}`);
    }
  }

  // ── 3. Milestones ─────────────────────────────────────────────────────────────
  console.log('  → Procesando Milestones...');
  try {
    const milestones = await getAllPages(`${BASE}/milestones?state=all`);
    for (const ms of milestones) {
      const actor = ms.creator?.login;
      if (!TRACKED_ACTORS.has(actor)) continue;
      const dev = resolveActor(actor);
      const ref = `Milestone: ${ms.title}`;

      entries.push({ dev, puntaje: 5, actividad: 'Creación de milestone', referencia: ref, fecha: ms.created_at.split('T')[0] });

      if (ms.state === 'closed' && ms.closed_at) {
        entries.push({ dev, puntaje: 15, actividad: 'Cierre de milestone', referencia: ref, fecha: ms.closed_at.split('T')[0] });
      }
    }
  } catch (e) {
    console.warn(`  ⚠ No se pudieron obtener milestones: ${e.message}`);
  }

  // Ordenar por fecha ascendente
  entries.sort((a, b) => a.fecha.localeCompare(b.fecha));

  // Escribir MANAGEMENT_LOG.md
  let content = `# Management Log — Campus Virtual\n\n`;
  content += `> Generado automáticamente. Registra todas las actividades de gestión del proyecto.\n`;
  content += `> Última actualización: ${new Date().toISOString().split('T')[0]}\n\n`;
  content += `| Dev | Puntaje | Actividad | Referencia | Fecha |\n`;
  content += `|-----|---------|-----------|------------|-------|\n`;

  for (const entry of entries) {
    const ref = entry.referencia.replace(/\|/g, ' ');
    content += `| ${entry.dev} | ${entry.puntaje} | ${entry.actividad} | ${ref} | ${entry.fecha} |\n`;
  }

  fs.writeFileSync('MANAGEMENT_LOG.md', content, 'utf8');
  console.log(`✅ MANAGEMENT_LOG.md generado con ${entries.length} entradas.`);
}

main().catch((err) => {
  console.error('❌ Error en generar_management_log.cjs:', err.message);
  process.exit(1);
});
