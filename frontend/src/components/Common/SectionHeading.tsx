export default function SectionHeading({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string
  title: string
  copy: string
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-300">
        {eyebrow}
      </p>

      <h2
        className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl"
        style={{
          textShadow: "0 2px 12px rgba(0,0,0,0.25)",
        }}
      >
        {title}
      </h2>

      <p
        className="mt-4 leading-8 text-slate-200"
        style={{
          textShadow: "0 1px 8px rgba(0,0,0,0.20)",
        }}
      >
        {copy}
      </p>
    </div>
  )
}