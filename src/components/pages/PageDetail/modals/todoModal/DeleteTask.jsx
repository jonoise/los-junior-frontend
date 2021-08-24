import { useRef } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button,
  useDisclosure,
} from '@chakra-ui/react'
import { filterColumns } from '../../../../../lib/filterTodoColumns'

const DeleteTask = ({ uuid, todoComponent, setTodoComponent }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()
  const handleDeleteTask = () => {
    const filteredColumns = filterColumns(uuid, todoComponent)
    console.log(filteredColumns)

    delete todoComponent.tasksComponents[uuid]

    setTodoComponent((prev) => ({
      ...prev,
      columns: {
        pending_tasks: {
          ...prev.columns.pending_tasks,
          tasksIds: filteredColumns.newPendingIds,
        },
        completed_tasks: {
          ...prev.columns.completed_tasks,
          tasksIds: filteredColumns.newCompletedIds,
        },
      },
      tasksIds: filteredColumns.newTasksIds,
    }))
  }

  return (
    <>
      <Button p="0" ml="2" onClick={onOpen}>
        <AiFillDelete />
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
          <AlertDialogHeader>Eliminar tarea?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody fontSize="14">
            Deseas eliminar esta tarea?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button colorScheme="red" ml={3} onClick={handleDeleteTask}>
              Sí
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default DeleteTask
