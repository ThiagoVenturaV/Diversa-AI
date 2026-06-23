/**
 * translator.js
 *
 * Simula seleção de texto no DOM para acionar a tradução do VLibras.
 * O VLibras escuta o evento nativo `selectionchange` do browser —
 * ao selecionar programaticamente um elemento com o texto desejado,
 * o avatar recebe o conteúdo e executa a tradução em LIBRAS.
 *
 * Workaround necessário pois o VLibras não expõe API pública de postMessage.
 */

let activeEl = null;

/**
 * Traduz o texto fornecido via simulação de seleção DOM.
 * @param {string} texto - Texto em português a ser traduzido para LIBRAS.
 */
export function translate(texto, element) {
  if (!texto || typeof texto !== 'string' || !texto.trim()) return;

  const sel = window.getSelection();
  sel.removeAllRanges();

  let targetEl = element;

  if (!targetEl) {
    // Remove elemento anterior se ainda existir
    _cleanup();

    // Cria elemento temporário invisível com o texto
    const el = document.createElement('span');
    el.setAttribute('data-lw-translate', '');
    el.style.cssText = [
      'position: fixed',
      'top: -9999px',
      'left: -9999px',
      'opacity: 0.01',
      'pointer-events: none',
      'user-select: text',
      '-webkit-user-select: text',
      'font-size: 1px',
      'line-height: 1',
    ].join('; ');
    el.textContent = texto.trim();
    document.body.appendChild(el);
    activeEl = el;
    targetEl = el;
  }

  // Seleciona o conteúdo do elemento via Range API
  try {
    const range = document.createRange();
    range.selectNodeContents(targetEl);
    sel.addRange(range);
  } catch (err) {
    console.error('[LibrasWidget] Falha na seleção do Range:', err);
    if (!element) _cleanup();
    return;
  }

  // Dispara o evento que o VLibras escuta internamente
  document.dispatchEvent(new Event('selectionchange'));

  // Limpa seleção após o VLibras processar
  setTimeout(() => {
    try {
      window.getSelection().removeAllRanges();
    } catch (e) {}
    if (!element) {
      _cleanup();
    }
  }, 1000);
}

function _cleanup() {
  try {
    if (activeEl && activeEl.parentNode) {
      activeEl.parentNode.removeChild(activeEl);
    }
  } catch {
    // ignora se já foi removido
  }
  activeEl = null;
}
