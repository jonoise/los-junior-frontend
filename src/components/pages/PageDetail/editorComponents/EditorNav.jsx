import {
  Box,
  Button,
  Flex,
  HStack,
  Text,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react'
import { BiRightArrowAlt, BiSave } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import {
  toggleEditor,
  selectPageSettings,
  setEditor,
} from '../../pageSettingsSlice'
function EditorNav() {
  const dispatch = useDispatch()
  const pageSettings = useSelector(selectPageSettings)
  const { editorIsOpen, currentEditor, unsavedChanges, currentComponentId } =
    pageSettings

  const handleToggleEditor = () => {
    dispatch(toggleEditor())
    dispatch(setEditor({ id: null, type_: null }))
  }

  const saveComponent = () => {}
  return (
    <Flex
      h="auto"
      justify="space-between"
      px="2"
      position="sticky"
      top="0"
      bg={useColorModeValue('white', 'gray.900')}
      zIndex="3"
    >
      {currentEditor === 'markdown' ? (
        // Si el editor es Markdown, mostramos el ícono.
        <HStack>
          <Button
            transition="1s ease"
            cursor="pointer"
            p="0"
            m="0.5"
            size="xs"
            outline="none"
            onClick={saveComponent}
          >
            <BiSave fontSize="25px" />
          </Button>
          {unsavedChanges && editorIsOpen ? (
            <Badge colorScheme="red">Hay cambios sin guardar</Badge>
          ) : (
            ''
          )}
        </HStack>
      ) : (
        // De lo contrario solo mostrar alerta para guardar componente.
        <Box>
          {unsavedChanges ? (
            <Badge colorScheme="red">Hay cambios sin guardar</Badge>
          ) : (
            ''
          )}
        </Box>
      )}
      <Button
        transform={editorIsOpen ? 'rotate(180deg)' : 'none'}
        transition="1s ease"
        cursor="pointer"
        p="0"
        m="0.5"
        size="xs"
        outline="none"
        className="disableFocus"
      >
        <BiRightArrowAlt fontSize="25px" onClick={handleToggleEditor} />
      </Button>
    </Flex>
  )
}

export default EditorNav
