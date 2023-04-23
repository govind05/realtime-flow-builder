export const randomColor = () => {
  const colors = [
    'f43f5e',
    'ec4899',
    'd946ef',
    'a855f7',
    '8b5cf6',
    '6366f1',
    '22c55e',
    '84cc16',
    'ef4444',
    '38bdf8'
  ]

  const index = Math.floor(Math.random() * colors.length)
  return `#${colors[index]}`
}
