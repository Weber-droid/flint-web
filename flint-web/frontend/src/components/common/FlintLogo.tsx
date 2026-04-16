interface Props {
  /** Size of the bolt icon in px (default 24) */
  size?: number
  /** 'icon' = bolt only | 'full' = bolt + wordmark (default 'full') */
  variant?: 'icon' | 'full'
  /** Color for both the bolt and the text (default uses accent purple) */
  color?: string
  className?: string
}

export function FlintLogo({ size = 24, variant = 'full', color, className = '' }: Props) {
  const boltColor = color ?? '#7c3aed'
  const textColor = color ?? 'currentColor'

  // The bolt viewBox is 0 0 80 120 — scale it to `size` px tall
  const boltWidth = (size * 80) / 120
  const fontSize = size * 0.72

  if (variant === 'icon') {
    return (
      <svg
        viewBox="0 0 80 120"
        width={boltWidth}
        height={size}
        fill={boltColor}
        className={className}
        aria-label="Flint logo"
      >
        <polygon points="0,100 40,0 80,0 40,50 65,50 25,120 35,70 10,70" />
      </svg>
    )
  }

  return (
    <span className={`inline-flex items-center gap-2 ${className}`} aria-label="Flint">
      <svg
        viewBox="0 0 80 120"
        width={boltWidth}
        height={size}
        fill={boltColor}
        aria-hidden
      >
        <polygon points="0,100 40,0 80,0 40,50 65,50 25,120 35,70 10,70" />
      </svg>
      <span
        style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 700,
          fontSize: `${fontSize}px`,
          letterSpacing: '-0.04em',
          color: textColor,
          lineHeight: 1,
        }}
      >
        flint
      </span>
    </span>
  )
}
