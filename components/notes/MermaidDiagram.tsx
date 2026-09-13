'use client';

/**
 * MermaidDiagram — renders a single Mermaid diagram string as an SVG.
 *
 * BUNDLE STRATEGY
 * ───────────────
 * The `mermaid` package adds ~570 KB gzipped. It must NEVER land in the shared
 * bundle. This component achieves that by:
 *   1. Living in its own Client Component file.
 *   2. Being imported by consumers via `next/dynamic` with `{ ssr: false }`.
 *      That call is what creates the split-point — `mermaid` only loads for the
 *      small subset of notes that contain a diagram.
 *
 * THEME
 * ─────
 * Instead of using Mermaid's built-in `dark`/`base` themes (which ship their
 * own colour palette), we use the `neutral` theme as a structural skeleton and
 * then override every colour via `themeVariables` using values read live from
 * CSS custom properties.  This keeps diagrams on-brand in both light and dark
 * mode, including across system-preference changes.
 */

import React, { useEffect, useId, useRef, useState } from 'react';

interface MermaidDiagramProps {
  /** Raw mermaid diagram definition string, e.g. the content between the fences. */
  chart: string;
}

export function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const reactId = useId();
  // Mermaid requires IDs that start with a letter, no colons.
  const id = `mermaid-${reactId.replace(/:/g, '')}`;

  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function render() {
      try {
        // Dynamic import — this is the ONLY place `mermaid` is imported.
        // next/dynamic wraps the entire component, so this import only fires
        // for pages that actually mount <MermaidDiagram>.
        const { default: mermaid } = await import('mermaid');

        if (cancelled) return;

        // Read brand tokens from the live computed style so diagrams stay
        // on-brand in both light and dark mode.
        const style = getComputedStyle(document.documentElement);
        const get = (v: string) => style.getPropertyValue(v).trim();

        const primaryColor   = get('--rn-bg-surface');        // node fill
        const primaryBorder  = get('--rn-border-brand');      // node border
        const primaryText    = get('--rn-text-primary');      // node label
        const lineColor      = get('--rn-border-strong');     // edge lines
        const edgeLabelBg    = get('--rn-bg-canvas');         // edge label bg
        const clusterBg      = get('--rn-bg-subtle');         // sub-graph bg
        const clusterBorder  = get('--rn-border-default');    // sub-graph border
        const noteBg         = get('--rn-brand-subtle');      // note callout bg
        const noteText       = get('--rn-text-secondary');    // note callout text
        const fontFamily     = `"Figtree", system-ui, -apple-system, sans-serif`;

        mermaid.initialize({
          startOnLoad: false,
          theme: 'base',
          fontFamily,
          themeVariables: {
            // Nodes
            primaryColor,
            primaryBorderColor:  primaryBorder,
            primaryTextColor:    primaryText,
            // Edges
            lineColor,
            edgeLabelBackground: edgeLabelBg,
            // Cluster / sub-graph
            clusterBkg:          clusterBg,
            clusterBorder,
            // Callout notes
            noteBkgColor:        noteBg,
            noteTextColor:       noteText,
            // Sequence diagrams
            actorBkg:            primaryColor,
            actorBorder:         primaryBorder,
            actorTextColor:      primaryText,
            activationBkgColor:  clusterBg,
            signalColor:         lineColor,
            signalTextColor:     primaryText,
            labelBoxBkgColor:    edgeLabelBg,
            labelTextColor:      primaryText,
          },
          securityLevel: 'strict',
        });

        const { svg } = await mermaid.render(id, chart.trim());

        if (cancelled) return;

        if (containerRef.current) {
          containerRef.current.innerHTML = svg;
          // Make the embedded SVG responsive.
          const svgEl = containerRef.current.querySelector('svg');
          if (svgEl) {
            svgEl.removeAttribute('height');
            svgEl.setAttribute('width', '100%');
            svgEl.style.maxWidth = '100%';
          }
        }

        setRendered(true);
        setError(null);
      } catch (err) {
        if (cancelled) return;
        const msg = err instanceof Error ? err.message : String(err);
        setError(msg);
        setRendered(false);
      }
    }

    render();
    return () => { cancelled = true; };
    // Re-render whenever chart text or theme changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chart, id]);

  if (error) {
    // Plain-text fallback — still readable and copy-pasteable.
    return (
      <div
        role="img"
        aria-label="Diagram (could not render)"
        className="my-8 overflow-x-auto rounded-[10px] border border-[var(--rn-border-default)] bg-[var(--rn-bg-surface)] p-5"
      >
        <pre className="font-mono text-sm leading-relaxed text-[var(--rn-text-muted)] whitespace-pre-wrap break-words">
          {chart}
        </pre>
        <p className="mt-3 font-sans text-xs text-[var(--rn-error)]">
          ⚠ Diagram could not be rendered — showing source instead.
        </p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label="Mermaid diagram"
      className="my-8 overflow-x-auto rounded-[10px] border border-[var(--rn-border-default)] bg-[var(--rn-bg-surface)] p-4 sm:p-6"
      style={{ minHeight: rendered ? undefined : '6rem' }}
    />
  );
}
