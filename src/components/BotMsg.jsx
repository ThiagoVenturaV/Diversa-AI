import { useRef } from 'react'
import { motion } from 'framer-motion'
import BotAvatar from './BotAvatar'
import SourceCard from './SourceCard'
import { sanitizeMarkdown } from '../markdown'

export default function BotMsg({ text, sources, streaming, onTranslate }) {
  const textRef = useRef(null)

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
      className="bot-msg-container"
    >
      <BotAvatar />
      <div className="bot-text-wrapper">
        {/* Traduzir para Libras Button */}
        {text && (
          <button
            onClick={() => onTranslate?.(text, textRef.current)}
            className="btn-translate-libras"
            title="Traduzir resposta para LIBRAS"
            disabled={streaming}
          >
            <i className="fa-solid fa-hands-asl-interpreting" />
            <span>Traduzir LIBRAS</span>
          </button>
        )}

        {/* Texto corrido — sem fundo, sem borda */}
        <div
          ref={textRef}
          className={`prose-bot${streaming && text ? ' streaming-cursor' : ''}`}
          dangerouslySetInnerHTML={{ __html: sanitizeMarkdown(text) }}
        />

        {/* Sources */}
        {sources && sources.length > 0 && (
          <div>
            <p className="sources-title">
              FONTES CONSULTADAS
            </p>
            <div className="sources-container">
              {sources.map((s, i) => (
                <SourceCard key={s.url + i} titulo={s.titulo} url={s.url} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}
