import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
/* Use `…/dist/cjs/…` if you’re not in ESM! */
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism'

const components = {
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '')
    return !inline && match ? (
      <SyntaxHighlighter
        wrapLongLines={true}
        style={dracula}
        language={match[1]}
        PreTag="div"
        {...props}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props} />
    )
  },
}

export default components
