import { Draggable } from 'react-beautiful-dnd'
import { selectPage } from '../../../pageSlice'
import { useSelector } from 'react-redux'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import HighlightedMarkdown from './HighlightedMarkdown'
import { Flex } from '@chakra-ui/react'
import ComponentHandler from '../handler/ComponentHandler'

function MarkdownDraggable({ uuid, provided }) {
  const page = useSelector(selectPage)
  const activeComponent = page.components[uuid]

  return (
    <>
      <Flex {...provided.draggableProps} ref={provided.innerRef} mb="2.5rem">
        {/* HANDLER/CRUD */}
        <ComponentHandler uuid={uuid} provided={provided} />
        {/* MARKDOWN COMPONEN */}
        <ReactMarkdown
          components={HighlightedMarkdown}
          className="markdownPreview"
          plugins={[gfm]}
        >
          {activeComponent.content}
        </ReactMarkdown>
      </Flex>
    </>
  )
}

export default MarkdownDraggable
