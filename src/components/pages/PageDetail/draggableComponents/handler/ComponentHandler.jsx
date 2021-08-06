import React from 'react'
import { Button, Flex, useDisclosure, VStack } from '@chakra-ui/react'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from '@chakra-ui/react'
import { FaGripHorizontal, FaRegEdit, FaRegTrashAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { selectPage, removeComponent } from '../../../../../app/pageSlice'
import {
  selectPageSettings,
  setEditor,
  setEditorIsOpen,
  toggleEditor,
} from '../../../../../app/pageSettings'
import axios from '../../../../../lib/axios'
import { useSession } from 'next-auth/client'

const ComponentHandler = ({ uuid, provided }) => {
  const dispatch = useDispatch()
  const [session] = useSession()
  const page = useSelector(selectPage)
  const { editorIsOpen, currentComponentId } = useSelector(selectPageSettings)

  const handleEdit = () => {
    const payload = {
      uuid: page.components[uuid].uuid,
      type_: page.components[uuid].type_of,
    }

    dispatch(setEditor(payload))
    // 1. si la ventana de editor está abierta
    if (editorIsOpen) {
      // 2. no hacemos nada
      return
    }
    // 3. de lo contrario la abrimos.
    dispatch(toggleEditor())
  }

  const handleDelete = () => {
    //If we delete the currentComponent, we clear the Editor
    if (uuid === currentComponentId) {
      const payload = {
        uuid: null,
        type_: null,
      }
      dispatch(setEditor(payload))
    }

    //Delete from DB
    const dbComponent = {
      parent: page.uuid,
      uuid: uuid,
      type_of: page.components[uuid].type_of,
    }
    axios('DELETE', `/pages/component/${uuid}/`, dbComponent, session)

    dispatch(removeComponent(uuid))
  }
  return (
    <VStack
      minW="12"
      direction="column"
      align="center"
      opacity=".3"
      transition=".2s ease-out"
      _hover={{ opacity: '1' }}
    >
      <Flex {...provided.dragHandleProps} p="2">
        <FaGripHorizontal size="20px" opacity="1" />
      </Flex>
      <Button p="0" size="xs" onClick={handleEdit}>
        <FaRegEdit size="20px" opacity="1" />
      </Button>
      <DeleteConfirmation handleDelete={handleDelete} page={page} uuid={uuid} />
    </VStack>
  )
}

export default ComponentHandler

function DeleteConfirmation({ handleDelete, page, uuid }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()

  return (
    <>
      <Button p="0" size="xs" onClick={onOpen}>
        <FaRegTrashAlt size="20px" opacity="1" />
      </Button>

      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Eliminar componente?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody fontSize="14">
            Deseas eliminar este componente de {page.components[uuid].type_of}?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button colorScheme="red" ml={3} onClick={handleDelete}>
              Sí
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
