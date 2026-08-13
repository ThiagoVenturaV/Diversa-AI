import { motion } from 'framer-motion'
import { safeHttpUrl } from '../security'

export default function SourceCard({ titulo, url, index }) {
  const safeUrl = safeHttpUrl(url)
  const Card = safeUrl ? motion.a : motion.div
  return (
    <Card
      {...(safeUrl ? { href: safeUrl, target: '_blank', rel: 'noopener noreferrer' } : {})}
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: Math.min(index, 4) * 0.05 }}
      className="source-card"
    >
      <span>
        {titulo}
      </span>
      <i className="fa-solid fa-arrow-up-right" style={{ fontSize: '9px', color: 'var(--color-brand-light)' }} />
    </Card>
  )
}
