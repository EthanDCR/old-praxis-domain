import { useState, useId } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useLottie } from 'lottie-react'
import animationData from './assets/praxis-animation-lottie.json'


const NEW_URL = 'https://praxis-storm.base44.app'

function Logo({ size = 32, className }: { size?: number; className?: string }) {
  const uid = useId()
  const mid = `pm${uid.replace(/:/g, '')}`
  const h = Math.round(size * 44 / 36)
  return (
    <svg width={size} height={h} viewBox="0 0 36 44" fill="none" aria-hidden="true" className={className}>
      <defs>
        <mask id={mid}>
          <rect width="36" height="44" fill="white" />
          <rect x="9"    y="16" width="18" height="3" fill="black" />
          <rect x="12.5" y="12" width="11" height="3" fill="black" />
          <rect x="16"   y="8"  width="4"  height="3" fill="black" />
        </mask>
      </defs>
      <g fill="currentColor" mask={`url(#${mid})`}>
        <rect x="0"  y="0"  width="8"  height="44" />
        <rect x="8"  y="0"  width="28" height="7"  />
        <rect x="28" y="7"  width="8"  height="20" />
        <rect x="8"  y="20" width="28" height="7"  />
      </g>
    </svg>
  )
}

function Splash({ onDone }: { onDone: () => void }) {
  const { View, setSpeed } = useLottie({
    animationData,
    loop: false,
    autoplay: true,
    style: { width: '650px', maxWidth: '80vw' },
    onComplete: onDone,
  })
  setSpeed(0.75)

  return (
    <motion.div
      style={{
        position: 'fixed', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--bg)',
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {View}
    </motion.div>
  )
}

function MigrationCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '28px',
        padding: '48px 40px',
        maxWidth: '520px',
        width: '90vw',
        background: 'var(--surface)',
        border: '1px solid var(--surface-border-strong)',
        borderRadius: '16px',
        boxShadow: '0 0 60px rgba(64,123,167,0.12)',
        textAlign: 'center',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', color: 'var(--text-primary)' }}>
        <Logo size={44} />
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: '22px',
          fontWeight: 700,
          letterSpacing: '0.08em',
          color: 'var(--text-primary)',
        }}>
          PRAXIS
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '15px',
          fontWeight: 600,
          letterSpacing: '0.15em',
          color: 'var(--accent)',
          textTransform: 'uppercase',
        }}>
          We&rsquo;ve Moved
        </h1>
        <p style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '16px',
          lineHeight: 1.7,
          color: 'var(--text-secondary)',
        }}>
          We have migrated to a new home <br/> — this page will not be maintained going forward.
        </p>
      </div>

      <a
        href={NEW_URL}
        style={{
          display: 'inline-block',
          padding: '13px 32px',
          background: 'var(--accent)',
          color: '#fff',
          fontFamily: 'var(--font-ui)',
          fontWeight: 600,
          fontSize: '15px',
          letterSpacing: '0.03em',
          borderRadius: '8px',
          textDecoration: 'none',
          boxShadow: '0 0 24px var(--accent-glow)',
          transition: 'background 0.15s, box-shadow 0.15s',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLAnchorElement).style.background = 'var(--accent-hover)'
          ;(e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 36px var(--accent-glow)'
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLAnchorElement).style.background = 'var(--accent)'
          ;(e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 24px var(--accent-glow)'
        }}
      >
        Go to new site &rarr;
      </a>

      <p style={{
        fontFamily: 'var(--font-ui)',
        fontSize: '12px',
        color: 'var(--text-muted)',
        wordBreak: 'break-all',
      }}>
        {NEW_URL}
      </p>
    </motion.div>
  )
}

export default function App() {
  const [phase, setPhase] = useState<'splash' | 'migrated'>('splash')

  return (
    <AnimatePresence mode="wait">
      {phase === 'splash' && (
        <Splash key="splash" onDone={() => setPhase('migrated')} />
      )}
      {phase === 'migrated' && (
        <MigrationCard key="migrated" />
      )}
    </AnimatePresence>
  )
}
