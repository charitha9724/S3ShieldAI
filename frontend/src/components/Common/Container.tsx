import type { PropsWithChildren } from 'react'
export default function Container({ children, className = '' }: PropsWithChildren<{ className?: string }>) { return <div className={`mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10 ${className}`}>{children}</div> }
