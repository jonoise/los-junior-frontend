import { Button, useDisclosure } from '@chakra-ui/react'
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
} from '@chakra-ui/react'
import { updateComponent } from '../../../pageSlice'
import { useDispatch } from 'react-redux'
import axios from '../../../../../lib/axios'

const DeleteTask = ({ uuid, todoComponent, session }) => {
  const dispatch = useDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()

  const handleDeleteTask = () => {
    const filteredColumns = filterColumns(uuid, todoComponent)
    const updatedTodoComponent = {
      ...todoComponent,
      columns: {
        pending_tasks: {
          ...todoComponent.columns.pending_tasks,
          tasksIds: filteredColumns.newPendingIds,
        },
        completed_tasks: {
          ...todoComponent.columns.completed_tasks,
          tasksIds: filteredColumns.newCompletedIds,
        },
      },
      tasksIds: filteredColumns.newTasksIds,
    }
    dispatch(
      updateComponent({
        uuid: todoComponent.uuid,
        component: updatedTodoComponent,
      })
    )
    axios('DELETE', `/pages/todos/tasks/${uuid}/`, null, session)
    axios(
      'PATCH',
      `/pages/todos/${todoComponent.uuid}/`,
      {
        pending_tasksIds: filteredColumns.newPendingIds,
        completed_tasksIds: filteredColumns.newCompletedIds,
        tasksIds: filteredColumns.newTasksIds,
      },
      session
    )
  }

  const filterColumns = (uuid, todoComponent) => {
    const newPendingIds = todoComponent.columns.pending_tasks.tasksIds.filter(
      (id) => id !== uuid
    )
    const newCompletedIds =
      todoComponent.columns.completed_tasks.tasksIds.filter((id) => id !== uuid)

    const newTasksIds = todoComponent.tasksIds.filter((id) => id !== uuid)

    return {
      newPendingIds,
      newCompletedIds,
      newTasksIds,
    }
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
