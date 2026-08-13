/**
 * styles.js
 *
 * CSS do widget injetado no Shadow DOM.
 * Os estilos ficam completamente isolados da página host.
 */

/**
 * @param {{ color?: string, position?: string }} options
 * @returns {string} CSS completo do widget
 */
export function getStyles(options = {}) {
  const color = options.color || '#0078d4';

  return `
    :host {
      --lw-color: ${color};
      --lw-color-dark: color-mix(in srgb, ${color} 70%, black);
      --lw-size: 58px;
      --lw-z: 2147483647;
    }

    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    /* ── Botão principal (Ocultado para usar botão nativo) ── */
    #lw-btn {
      display: none !important;
    }

    /* ── Anel pulsante "traduzindo" (Ocultado) ── */
    #lw-ring {
      display: none !important;
    }

    /* ── Tooltip (Ocultado) ── */
    #lw-tooltip {
      display: none !important;
    }

    /* ── Loader (enquanto VLibras carrega) ────────────── */
    #lw-loader {
      width: 20px;
      height: 20px;
      border: 2.5px solid rgba(255,255,255,0.35);
      border-top-color: white;
      border-radius: 50%;
      animation: lw-spin 0.7s linear infinite;
    }

    @keyframes lw-spin {
      to { transform: rotate(360deg); }
    }
  `;
}
