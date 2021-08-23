import React, { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectPage, reorderColumn } from '../pageSlice'
import { Droppable, DragDropContext } from 'react-beautiful-dnd'
import { Flex, useColorModeValue, VStack } from '@chakra-ui/react'
import DraggableComponent from './DraggableComponent'
import { selectStateMarkdownContent } from './editorComponents/markdownEditor/markdownEditorSlice'
function View() {
  const dispatch = useDispatch()
  const page = useSelector(selectPage)
  const markdownEditorContent = useSelector(selectStateMarkdownContent)
  const [dragging, setDragging] = useState(false)

  useEffect(() => {
    const viewWindow = document.getElementById('viewWindow')

    const position =
      viewWindow.clientHeight -
      Math.ceil(viewWindow.scrollHeight - viewWindow.scrollTop)
    console.log(position)
    if (position > -90) {
      viewWindow.scrollTop = viewWindow.scrollHeight
    }
  }, [markdownEditorContent])

  const onDragStart = (start) => {
    setDragging(true)
  }

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result
    setDragging(false)
    if (!destination) {
      return
    }
    if (destination.index === source.index) {
      return
    }
    const newComponentList = Array.from(page.column.componentsIds)
    newComponentList.splice(source.index, 1)
    newComponentList.splice(destination.index, 0, draggableId)
    dispatch(reorderColumn(newComponentList))
  }

  return (
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      {/* ESTA ES MI COLUMNA */}
      <Droppable droppableId={page.column.id}>
        {(provided) => (
          <Flex
            id="viewWindow"
            border="1px dotted"
            p="1rem"
            w="full"
            h="full"
            transition=".5s ease-in-out"
            bg={useColorModeValue(
              dragging ? '#f8f8f8' : 'white',
              dragging ? 'gray.700' : 'gray.800'
            )}
            borderRadius="10px"
            direction="column"
            overflowY="auto"
            ref={provided.innerRef}
            {...provided.droppableProps}
            css={{
              '&::-webkit-scrollbar': {
                background: 'black',
                width: '10px',
              },
              '&::-webkit-scrollbar-track': {
                background: '#171923',
                width: '6px',
                borderRadius: '24px',
              },
              '&::-webkit-scrollbar-thumb': {
                height: 'xs',
                width: '10em',
                background: '#3182CE',
                borderRadius: '24px',
              },
            }}
          >
            {page.column.componentsIds.map((id, index) => {
              const component = page.components[id]
              return (
                <DraggableComponent
                  component={component}
                  index={index}
                  key={component.uuid}
                />
              )
            })}
            {provided.placeholder}
          </Flex>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default View
