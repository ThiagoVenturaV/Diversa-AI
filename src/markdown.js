import DOMPurify from 'dompurify'
import { marked } from 'marked'

import { safeHttpUrl } from './security'

marked.use({
  renderer: {
    link({ href, tokens }) {
      const text = this.parser.parseInline(tokens)
      const safeHref = safeHttpUrl(href)
      return safeHref
        ? `<a href="${safeHref}" target="_blank" rel="noopener noreferrer">${text}</a>`
        : text
    },
  },
  gfm: true,
  breaks: true,
})

export function sanitizeMarkdown(raw) {
  if (!raw) return ''
  return DOMPurify.sanitize(marked.parse(raw), {
    ADD_ATTR: ['target'],
    FORBID_TAGS: [
      'style', 'script', 'iframe', 'object', 'embed', 'form',
      'img', 'svg', 'math', 'template',
    ],
    FORBID_ATTR: ['style'],
  })
}
