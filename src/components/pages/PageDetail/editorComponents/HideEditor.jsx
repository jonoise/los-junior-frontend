import { Flex, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectPageSettings, toggleEditor } from '../../pageSettingsSlice'
const HideEditor = () => {
  // ↓ SMOOTH EDITOR DISPLAY STATE ↓
  const [displayEditor, setDisplayEditor] = useState(false)
  useEffect(() => {
    const visibleEditor = setTimeout(() => {
      setDisplayEditor(true)
    }, 800)
    return () => clearTimeout(visibleEditor)
  })
  // ↑ SMOOTH EDITOR DISPLAY STATE ↑

  const dispatch = useDispatch()
  const { editorIsOpen } = useSelector(selectPageSettings)

  const handleToggleEditor = () => {
    dispatch(toggleEditor())
  }

  return (
    <Flex
      h="full"
      opacity={displayEditor ? 1 : 0}
      w="full"
      justify="center"
      align="center"
      transition="1s ease"
    >
      <Text
        fontSize="x-large"
        transform="rotate(-90deg)"
        onClick={handleToggleEditor}
        cursor="pointer"
        color="gray.500"
      >
        EDITOR
      </Text>
    </Flex>
  )
}

export default HideEditor
