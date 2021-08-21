import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Tooltip,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { FaTimes } from 'react-icons/fa'
import axiosReborn from '../../../lib/axios'
import { useSession } from 'next-auth/client'
import { useRef } from 'react'

const DeleteComment = ({ comment, setComments }) => {
  const [session] = useSession()

  const handleDeleteComment = async () => {
    const res = await axiosReborn(
      'DELETE',
      `/comments/${comment.uuid}`,
      comment,
      session
    )

    setComments((prev) => {
      const filteredComments = prev.filter((c) => {
        return c.uuid !== comment.uuid
      })
      return filteredComments
    })
  }

  return (
    <>
      <DeleteConfirmation handleDeleteComment={handleDeleteComment} />
    </>
  )
}

export default DeleteComment

function DeleteConfirmation({ handleDeleteComment }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()

  return (
    <>
      <Button ml="2" p="0" size="xs" onClick={onOpen}>
        <FaTimes />
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
          <AlertDialogHeader>Eliminar comentario?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody fontSize="14">
            Deseas eliminar este comentario?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button colorScheme="red" ml={3} onClick={handleDeleteComment}>
              Sí
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
