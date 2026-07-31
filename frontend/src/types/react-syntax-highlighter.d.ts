declare module 'react-syntax-highlighter' {
  import type { ComponentType, CSSProperties } from 'react'

  export const Prism: ComponentType<{
    language?: string
    style?: Record<string, Record<string, string | number>>
    customStyle?: CSSProperties
    children: string
  }>
}

declare module 'react-syntax-highlighter/dist/esm/styles/prism' {
  export const vscDarkPlus: Record<string, Record<string, string | number>>
}
