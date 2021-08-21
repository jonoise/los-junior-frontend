import { Flex, Text } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectPageSettings } from '../../pageSettingsSlice'
import ShowMarkdownEditor from './ShowMarkdownEditor'
import ShowTodoEditor from './todoEditor/ShowTodoEditor'

const ShowEditor = () => {
  // ↓ SMOOTH EDITOR DISPLAY STATE ↓
  const [displayEditor, setDisplayEditor] = useState(false)
  useEffect(() => {
    const visibleEditor = setTimeout(() => {
      setDisplayEditor(true)
    }, 800)
    return () => clearTimeout(visibleEditor)
  })
  // ↑ SMOOTH EDITOR DISPLAY STATE ↑

  const { currentEditor } = useSelector(selectPageSettings)
  switch (currentEditor) {
    case null:
      return (
        <Flex
          style={{ opacity: displayEditor ? '1' : '0', transition: '1s ease' }}
          height="full"
          justify="center"
          align="center"
          p="10"
        >
          <Text fontSize="lg">
            Empieza creando un componente o editando uno de la página.
          </Text>
        </Flex>
      )
    case 'markdown':
      return (
        <Flex
          style={{ opacity: displayEditor ? '1' : '0', transition: '1s ease' }}
          bg="#1E1E1E"
          height="full"
          justify="center"
          align="center"
          overflow="hide"
        >
          <ShowMarkdownEditor />
        </Flex>
      )
    case 'todo':
      return <ShowTodoEditor displayEditor={displayEditor} />
    default:
      return 'Aún no has creado un editor para este component'
  }
}

export default ShowEditor
