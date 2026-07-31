import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

const codeStyle = {
  ...vscDarkPlus,
  'pre[class*="language-"]': {
    ...vscDarkPlus['pre[class*="language-"]'],
    margin: 0,
    background: 'transparent',
    fontSize: '12px',
    lineHeight: '1.65',
  },
}

export default function JsonViewer({ code }: { code: string }) {
  return (
    <div className="h-[520px] overflow-auto">
      <SyntaxHighlighter
        language="json"
        style={codeStyle}
        customStyle={{
          margin: 0,
          padding: '16px',
          background: 'transparent',
          minHeight: '100%',
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )
}