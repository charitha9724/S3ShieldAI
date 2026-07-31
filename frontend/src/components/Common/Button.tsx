import { type ButtonHTMLAttributes, type PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'

type ButtonProps = PropsWithChildren<{ to?: string; variant?: 'primary' | 'secondary' | 'ghost'; className?: string } & ButtonHTMLAttributes<HTMLButtonElement>>
const styles = { primary: 'bg-cyan-400 text-slate-950 hover:bg-cyan-300 shadow-lg shadow-cyan-950/30', secondary: 'border border-slate-700 bg-slate-900 text-slate-100 hover:border-slate-500 hover:bg-slate-800', ghost: 'text-slate-400 hover:bg-slate-800 hover:text-white' }
export default function Button({ children, to, variant = 'primary', className = '', ...props }: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-300/60 ${styles[variant]} ${className}`
  return to ? <Link to={to} className={classes}>{children}</Link> : <button type="button" className={classes} {...props}>{children}</button>
}
