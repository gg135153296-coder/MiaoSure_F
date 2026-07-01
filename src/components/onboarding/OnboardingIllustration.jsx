import {
  Beaker,
  BookStack,
  FlatPerson,
  FloatingDecor,
  Microscope,
} from './flatPrimitives'

const DECOR = [
  { cx: 30, cy: 40, r: 6, fill: 'rgba(255,255,255,0.2)' },
  { cx: 340, cy: 60, r: 8, fill: 'rgba(252,211,77,0.35)' },
  { cx: 310, cy: 30, r: 5, fill: 'rgba(255,255,255,0.15)' },
  { cx: 50, cy: 90, r: 4, fill: 'rgba(255,255,255,0.18)' },
]

export function ReadingScene() {
  return (
    <svg viewBox="0 0 360 280" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="ob-scene">
      <ellipse cx="180" cy="268" rx="150" ry="10" fill="rgba(0,0,0,0.1)" />
      <FloatingDecor items={DECOR} />

      <Microscope x={248} y={80} />
      <Beaker x={24} y={100} />

      <g className="ob-anim ob-anim--enter ob-anim--delay-1">
        <FlatPerson x={148} y={108} pose="lab-coat" />
      </g>
      <g className="ob-anim ob-anim--enter ob-anim--delay-2">
        <FlatPerson x={88} y={72} pose="lightbulb" />
      </g>
      <g className="ob-anim ob-anim--enter ob-anim--delay-3">
        <FlatPerson x={28} y={148} pose="sit-books" />
      </g>
      <g className="ob-anim ob-anim--enter ob-anim--delay-2">
        <FlatPerson x={200} y={168} pose="basketball" />
      </g>
      <g className="ob-anim ob-anim--enter ob-anim--delay-4">
        <FlatPerson x={128} y={196} pose="laptop" />
      </g>

      <g className="ob-anim ob-anim--float">
        <BookStack x={290} y={180} count={4} />
        <rect x={298} y={168} width={28} height={14} rx={3} fill="#fff" />
      </g>

      <circle cx={320} cy={130} r={16} fill="#fcd34d" className="ob-anim ob-anim--spin-slow" opacity="0.7" />
      <rect x={312} y={122} width={16} height={16} rx={2} fill="#fbbf24" transform="rotate(45 320 130)" className="ob-anim ob-anim--spin-slow" opacity="0.5" />
    </svg>
  )
}

export function ExploreScene() {
  return (
    <svg viewBox="0 0 360 280" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="ob-scene">
      <ellipse cx="180" cy="268" rx="150" ry="10" fill="rgba(0,0,0,0.1)" />
      <FloatingDecor items={DECOR} />

      <g className="ob-anim ob-anim--float">
        <circle cx={180} cy={110} r={56} fill="rgba(255,255,255,0.12)" stroke="#fff" strokeWidth="3" />
        <circle cx={180} cy={110} r={40} fill="rgba(255,255,255,0.08)" />
        <path d="M180 54v20M180 146v20M124 110h20M216 110h20" stroke="#fcd34d" strokeWidth="3" strokeLinecap="round" />
        <circle cx={180} cy={110} r={10} fill="#fcd34d" className="ob-anim ob-anim--pulse" />
      </g>

      <g className="ob-anim ob-anim--enter ob-anim--delay-1">
        <FlatPerson x={60} y={140} pose="stand" />
        <rect x={48} y={168} width={36} height={44} rx={6} fill="#fff" opacity="0.9" />
        <rect x={54} y={176} width={24} height={4} rx={2} fill="#4f6ef7" />
        <rect x={54} y={186} width={18} height={3} rx={1.5} fill="rgba(79,110,247,0.4)" />
      </g>

      <g className="ob-anim ob-anim--sway">
        <rect x={250} y={120} width={14} height={60} rx={4} fill="#fcd34d" />
        <circle cx={257} cy={108} r={18} fill="none" stroke="#fff" strokeWidth="4" />
        <line x1={257} y1={90} x2={257} y2={78} stroke="#fff" strokeWidth="3" strokeLinecap="round" />
        <FlatPerson x={238} y={148} pose="stand" />
      </g>

      <g className="ob-anim ob-anim--enter ob-anim--delay-3">
        <FlatPerson x={148} y={168} pose="laptop" />
      </g>

      <g className="ob-anim ob-anim--bob-slow">
        <rect x={20} y={200} width={52} height={40} rx={8} fill="#fff" opacity="0.85" />
        <rect x={28} y={210} width={36} height={5} rx={2} fill="#8b5cf6" />
        <rect x={28} y={220} width={28} height={3} rx={1.5} fill="rgba(139,92,246,0.45)" />
        <rect x={28} y={228} width={32} height={3} rx={1.5} fill="rgba(139,92,246,0.45)" />
        <circle cx={280} cy={210} r={20} fill="#3b82f6" className="ob-anim ob-anim--pulse" />
        <path d="M268 210h24M280 198v24" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      </g>

      <BookStack x={300} y={220} count={3} />
    </svg>
  )
}

export function WriteScene() {
  return (
    <svg viewBox="0 0 360 280" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="ob-scene">
      <ellipse cx="180" cy="268" rx="150" ry="10" fill="rgba(0,0,0,0.1)" />
      <FloatingDecor items={DECOR} />

      <g className="ob-anim ob-anim--enter">
        <rect x={70} y={70} width={220} height={130} rx={12} fill="#fff" opacity="0.92" />
        <rect x={90} y={88} width={100} height={6} rx={3} fill="#4f6ef7" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect
            key={i}
            x={90}
            y={104 + i * 14}
            width={180 - i * 8}
            height={4}
            rx={2}
            fill="rgba(79,110,247,0.3)"
            className={`ob-anim ob-anim--typewriter ob-anim--delay-${i % 4}`}
          />
        ))}
      </g>

      <g className="ob-anim ob-anim--write-pen">
        <path d="M270 190l36-36 14 14-36 36h-14v-14z" fill="#fcd34d" />
        <rect x={296} y={150} width={18} height={8} rx={2} transform="rotate(45 305 154)" fill="#fff" />
      </g>

      <g className="ob-anim ob-anim--enter ob-anim--delay-2">
        <FlatPerson x={40} y={130} pose="sit-books" />
      </g>

      <g className="ob-anim ob-anim--enter ob-anim--delay-3">
        <FlatPerson x={260} y={170} pose="stand" />
      </g>

      <Beaker x={16} y={60} />
      <Microscope x={290} y={50} />

      <g className="ob-anim ob-anim--float">
        <circle cx={180} cy={48} r={12} fill="#fcd34d" />
        <text x={180} y={53} textAnchor="middle" fill="#fff" fontSize="14" fontWeight="700">✎</text>
      </g>
    </svg>
  )
}

export function WelcomeScene() {
  return (
    <svg viewBox="0 0 360 280" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="ob-scene">
      <ellipse cx="180" cy="268" rx="150" ry="10" fill="rgba(0,0,0,0.1)" />

      {[...Array(8)].map((_, i) => (
        <rect
          key={i}
          x={30 + i * 40}
          y={20 + (i % 3) * 18}
          width={8}
          height={8}
          rx={2}
          fill={['#fcd34d', '#fff', '#60a5fa', '#f472b6'][i % 4]}
          className={`ob-anim ob-anim--confetti ob-anim--delay-${i % 4}`}
          transform={`rotate(${i * 30} ${34 + i * 40} ${24 + (i % 3) * 18})`}
        />
      ))}

      <g className="ob-anim ob-anim--enter">
        <FlatPerson x={148} y={88} pose="lab-coat" />
        <circle cx={180} cy={72} r={28} fill="rgba(252,211,77,0.25)" className="ob-anim ob-anim--pulse" />
      </g>

      <g className="ob-anim ob-anim--enter ob-anim--delay-1">
        <FlatPerson x={48} y={148} pose="lightbulb" />
      </g>
      <g className="ob-anim ob-anim--enter ob-anim--delay-2">
        <FlatPerson x={248} y={148} pose="basketball" />
      </g>
      <g className="ob-anim ob-anim--enter ob-anim--delay-3">
        <FlatPerson x={108} y={188} pose="laptop" />
      </g>
      <g className="ob-anim ob-anim--enter ob-anim--delay-2">
        <FlatPerson x={210} y={188} pose="sit-books" />
      </g>

      <Beaker x={290} y={90} />
      <Microscope x={10} y={90} />
      <BookStack x={158} y={220} count={4} />

      <path
        d="M160 56l20-20 20 20"
        stroke="#fcd34d"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        className="ob-anim ob-anim--sway"
      />
    </svg>
  )
}

const SCENES = {
  reading: ReadingScene,
  explore: ExploreScene,
  write: WriteScene,
  welcome: WelcomeScene,
}

export default function OnboardingIllustration({ name }) {
  const Scene = SCENES[name] ?? ReadingScene
  return (
    <div className="onboarding__illustration">
      <Scene />
    </div>
  )
}
