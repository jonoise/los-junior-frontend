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
import axiosReborn from '../../../../lib/axios'
import { useSession } from 'next-auth/client'
import { useRef } from 'react'

const DeletePage = ({ page, setPages }) => {
  const [session] = useSession()

  const handleDeletepage = async () => {
    const res = await axiosReborn(
      'DELETE',
      `/pages/${page.uuid}`,
      page,
      session
    )

    setPages((prev) => {
      const filteredPages = prev.filter((c) => {
        return c.uuid !== page.uuid
      })
      return filteredPages
    })
  }

  return (
    <>
      <DeleteConfirmation
        handleDeletepage={handleDeletepage}
        title={page.title}
        setPages={setPages}
      />
    </>
  )
}

export default DeletePage

function DeleteConfirmation({ handleDeletepage, title }) {
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
          <AlertDialogHeader>Eliminar página</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody fontSize="14">
            Desear eliminar la página: {title}?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button colorScheme="red" ml={3} onClick={handleDeletepage}>
              Sí
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
