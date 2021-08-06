import React from 'react'
import { VStack } from '@chakra-ui/react'
import ReactMarkdown from 'react-markdown'
import HighlightedMarkdown from './HighlightedMarkdown'
import gfm from 'remark-gfm'

function SinglePostBody({ abstract, content }) {
  return (
    <VStack alignItems="flex-start">
      <ReactMarkdown className="markdownAbstract">{abstract}</ReactMarkdown>
      <ReactMarkdown
        className="markdownContent"
        remarkPlugins={[gfm]}
        components={HighlightedMarkdown}
      >
        {content}
      </ReactMarkdown>
    </VStack>
  )
}

export default SinglePostBody
