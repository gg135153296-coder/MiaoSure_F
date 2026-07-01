/* Reusable flat-design character & object primitives */

export function FlatHead({ cx, cy, r = 14, fill = '#fff' }) {
  return <circle cx={cx} cy={cy} r={r} fill={fill} />
}

export function FlatBody({ x, y, w = 28, h = 36, fill = '#fff', rx = 6 }) {
  return <rect x={x} y={y} width={w} height={h} rx={rx} fill={fill} />
}

export function FlatLegs({ x, y, w = 28 }) {
  return (
    <>
      <rect x={x + 4} y={y} width={8} height={18} rx={4} fill="#fff" />
      <rect x={x + w - 12} y={y} width={8} height={18} rx={4} fill="#fff" />
    </>
  )
}

export function FlatPerson({ x, y, bodyFill = '#fff', headR = 13, pose = 'stand' }) {
  const cx = x + 14
  if (pose === 'laptop') {
    return (
      <g className="ob-anim ob-anim--bob">
        <FlatHead cx={cx} cy={y + 12} r={headR} />
        <FlatBody x={x} y={y + 24} w={28} h={30} fill={bodyFill} />
        <rect x={x - 8} y={y + 38} width={44} height={24} rx={4} fill="#1e293b" />
        <rect x={x - 4} y={y + 42} width={36} height={16} rx={2} fill="#60a5fa" />
        <FlatLegs x={x} y={y + 54} />
      </g>
    )
  }
  if (pose === 'sit-books') {
    return (
      <g className="ob-anim ob-anim--bob-slow">
        <rect x={x - 6} y={y + 48} width={40} height={10} rx={3} fill="#fcd34d" />
        <rect x={x - 4} y={y + 38} width={36} height={10} rx={3} fill="#fbbf24" />
        <rect x={x - 2} y={y + 28} width={32} height={10} rx={3} fill="#fff" />
        <FlatHead cx={cx} cy={y + 10} r={headR} />
        <FlatBody x={x} y={y + 22} w={28} h={22} fill={bodyFill} />
        <rect x={x + 30} y={y - 8} width={10} height={52} rx={3} fill="#fcd34d" transform={`rotate(12 ${x + 35} ${y + 18})`} />
        <polygon points={`${x + 35},${y - 12} ${x + 42},${y + 2} ${x + 28},${y + 2}`} fill="#ef4444" />
      </g>
    )
  }
  if (pose === 'lightbulb') {
    return (
      <g className="ob-anim ob-anim--sway">
        <FlatHead cx={cx} cy={y + 14} r={headR} />
        <FlatBody x={x} y={y + 26} w={28} h={32} fill={bodyFill} />
        <rect x={x - 6} y={y + 30} width={10} height={22} rx={4} fill="#fff" transform={`rotate(-20 ${x} ${y + 40})`} />
        <rect x={x + 24} y={y + 30} width={10} height={22} rx={4} fill="#fff" transform={`rotate(20 ${x + 28} ${y + 40})`} />
        <FlatLegs x={x} y={y + 58} />
        <g>
          <circle cx={cx} cy={y - 28} r={32} fill="#fcd34d" opacity="0.2" className="ob-anim ob-anim--glow-ring ob-anim--glow-ring--outer" />
          <circle cx={cx} cy={y - 28} r={22} fill="#fcd34d" className="ob-anim ob-anim--glow-ring" />
          <circle cx={cx} cy={y - 28} r={14} fill="#fef08a" />
          <rect x={cx - 8} y={y - 8} width={16} height={8} rx={2} fill="#94a3b8" />
          <line x1={cx} y1={y - 50} x2={cx} y2={y - 62} stroke="#fef08a" strokeWidth="3" strokeLinecap="round" className="ob-anim ob-anim--pulse-line" />
          <line x1={cx - 14} y1={y - 38} x2={cx - 22} y2={y - 44} stroke="#fef08a" strokeWidth="2" strokeLinecap="round" className="ob-anim ob-anim--pulse-line ob-anim--delay-1" />
          <line x1={cx + 14} y1={y - 38} x2={cx + 22} y2={y - 44} stroke="#fef08a" strokeWidth="2" strokeLinecap="round" className="ob-anim ob-anim--pulse-line ob-anim--delay-2" />
        </g>
      </g>
    )
  }
  if (pose === 'basketball') {
    return (
      <g className="ob-anim ob-anim--bob">
        <rect x={x - 4} y={y + 36} width={36} height={16} rx={4} fill="#fcd34d" />
        <FlatHead cx={cx} cy={y + 8} r={headR} />
        <FlatBody x={x} y={y + 20} w={28} h={24} fill={bodyFill} />
        <circle cx={x + 32} cy={y + 14} r={12} fill="#f97316" />
        <path d={`M${x + 32} ${y + 2}v24M${x + 20} ${y + 14}h24`} stroke="#fff" strokeWidth="1.5" opacity="0.7" />
        <FlatLegs x={x} y={y + 44} />
      </g>
    )
  }
  if (pose === 'lab-coat') {
    return (
      <g className="ob-anim ob-anim--stand">
        <FlatHead cx={cx} cy={y + 14} r={15} />
        <rect x={x - 2} y={y + 28} width={32} height={38} rx={6} fill="#fff" />
        <rect x={x + 10} y={y + 28} width={8} height={38} rx={2} fill="#e2e8f0" />
        <rect x={x - 8} y={y + 32} width={10} height={24} rx={4} fill="#fff" transform={`rotate(-8 ${x - 4} ${y + 44})`} />
        <rect x={x + 26} y={y + 32} width={10} height={24} rx={4} fill="#fff" transform={`rotate(8 ${x + 30} ${y + 44})`} />
        <FlatLegs x={x} y={y + 66} />
      </g>
    )
  }
  return (
    <g className="ob-anim ob-anim--bob">
      <FlatHead cx={cx} cy={y + 12} r={headR} />
      <FlatBody x={x} y={y + 24} w={28} h={32} fill={bodyFill} />
      <FlatLegs x={x} y={y + 56} />
    </g>
  )
}

export function Microscope({ x, y }) {
  return (
    <g className="ob-anim ob-anim--float">
      <rect x={x} y={y + 60} width={48} height={8} rx={3} fill="#1d4ed8" />
      <rect x={x + 18} y={y + 20} width={12} height={42} rx={4} fill="#2563eb" />
      <circle cx={x + 24} cy={y + 16} r={14} fill="#3b82f6" stroke="#fff" strokeWidth="3" />
      <circle cx={x + 24} cy={y + 16} r={6} fill="#60a5fa" />
      <path d={`M${x + 8} ${y + 36} Q${x + 24} ${y + 28} ${x + 40} ${y + 36}`} stroke="#1d4ed8" strokeWidth="6" fill="none" strokeLinecap="round" />
      <rect x={x + 10} y={y + 48} width={28} height={14} rx={4} fill="#1e40af" />
    </g>
  )
}

export function Beaker({ x, y }) {
  return (
    <g className="ob-anim ob-anim--float-reverse">
      <path d={`M${x + 10} ${y} L${x + 34} ${y} L${x + 38} ${y + 52} Q${x + 22} ${y + 58} ${x + 6} ${y + 52} Z`} fill="#fff" opacity="0.95" />
      <path d={`M${x + 12} ${y + 30} L${x + 34} ${y + 30} L${x + 36} ${y + 50} Q${x + 22} ${y + 54} ${x + 10} ${y + 50} Z`} fill="#3b82f6" className="ob-anim ob-anim--liquid" />
      <rect x={x + 14} y={y - 4} width={16} height={6} rx={2} fill="#94a3b8" />
      <circle cx={x + 18} cy={y + 38} r={3} fill="#60a5fa" className="ob-anim ob-anim--bubble" />
      <circle cx={x + 28} cy={y + 42} r={2} fill="#93c5fd" className="ob-anim ob-anim--bubble ob-anim--delay-1" />
    </g>
  )
}

export function BookStack({ x, y, count = 3 }) {
  const colors = ['#fff', '#fcd34d', '#fbbf24']
  return (
    <g>
      {Array.from({ length: count }).map((_, i) => (
        <rect
          key={i}
          x={x + i * 2}
          y={y + (count - 1 - i) * 10}
          width={44 - i * 4}
          height={10}
          rx={3}
          fill={colors[i % colors.length]}
        />
      ))}
    </g>
  )
}

export function FloatingDecor({ items }) {
  return (
    <>
      {items.map((item, i) => (
        <circle
          key={i}
          cx={item.cx}
          cy={item.cy}
          r={item.r}
          fill={item.fill}
          className={`ob-anim ob-anim--drift ob-anim--delay-${i % 3}`}
        />
      ))}
    </>
  )
}
