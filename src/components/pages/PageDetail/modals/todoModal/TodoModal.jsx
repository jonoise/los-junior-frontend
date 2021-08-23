import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Flex,
  Input,
  Button,
  Text,
  Stack,
  useToast,
  Tooltip,
} from '@chakra-ui/react'
import { v4 as uuid_v4 } from 'uuid'

import { AiOutlineUnorderedList, AiFillPlusSquare } from 'react-icons/ai'

import { addComponent, selectPage } from '../../../pageSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import axios from '../../../../../lib/axios'
import { useSession } from 'next-auth/client'
import DeleteTask from './DeleteTask'

function TodoModal() {
  function useDidMount() {
    const didMountRef = useRef(true)

    useEffect(() => {
      didMountRef.current = false
    }, [])
    return didMountRef.current
  }
  const [session] = useSession()
  const page = useSelector(selectPage)
  const initialInputFocus = useRef()
  const newTaskInputFocus = useRef()
  const dispatch = useDispatch()
  const didMount = useDidMount()
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialTaskId = uuid_v4()
  const initialTodo = {
    uuid: uuid_v4(),
    title: '',
    type_of: 'todo',
    tasksComponents: {
      [initialTaskId]: {
        uuid: initialTaskId,
        content: '',
      },
    },
    tasksIds: [initialTaskId],
    columnsOrder: ['pending_tasks', 'completed_tasks'],
    get columns() {
      return {
        pending_tasks: {
          id: 'pending_tasks',
          title: 'Pendientes',
          tasksIds: this.tasksIds,
        },
        completed_tasks: {
          id: 'completed_tasks',
          title: 'Completados',
          tasksIds: [],
        },
      }
    },
  }

  const [todoComponent, setTodoComponent] = useState(initialTodo)

  const createNewTask = () => {
    const newTask = {
      uuid: uuid_v4(),
      content: '',
      status: 'pending',
      type_of: 'task',
    }
    setTodoComponent({
      ...todoComponent,
      columns: {
        ...todoComponent.columns,
        pending_tasks: {
          ...todoComponent.columns.pending_tasks,
          tasksIds: [
            ...todoComponent.columns.pending_tasks.tasksIds,
            newTask.uuid,
          ],
        },
      },
      tasksComponents: {
        ...todoComponent.tasksComponents,
        [newTask.uuid]: newTask,
      },
      tasksIds: [...todoComponent.tasksIds, newTask.uuid],
    })
  }

  const handleTaskTitleChange = (e) => {
    const title = initialInputFocus.current.value
    setTodoComponent({
      ...todoComponent,
      title: title,
    })
  }

  const handleTaskInputChange = (e) => {
    setTodoComponent({
      ...todoComponent,
      tasksComponents: {
        ...todoComponent.tasksComponents,
        [e.target.id]: {
          uuid: e.target.id,
          content: e.target.value,
        },
      },
    })
  }

  const addToState = () => {
    for (let taskId in todoComponent.tasksComponents) {
      if (todoComponent.tasksComponents[taskId].content === '') {
        toast({
          title: 'Hay tareas incompletas.',
          description: 'Asegúrate de rellenar todos los espacios.',
          id: taskId,
          duration: 5000,
          status: 'error',
        })
        return
      }
      if (todoComponent.title === '') {
        toast({
          title: 'Completa el título.',
          description: 'Asegúrate de rellenar todos los espacios.',
          id: taskId,
          duration: 5000,
          status: 'error',
        })
        return
      }
    }

    axios('POST', `/pages/${page.uuid}/todos/`, todoComponent, session)

    dispatch(addComponent(todoComponent))
    setTodoComponent(initialTodo)

    onClose()
  }

  useEffect(() => {
    if (didMount) {
      // Si el component se acaba de montar,
      // no vamos a efectuar ninguna acción. Solo on re-renders
      return
    }
    // Cada vez que creemos un nuevo Task vamos a hacerle focus al input.
    console.log(todoComponent.tasksIds[todoComponent.tasksIds.length - 1])
    console.log(todoComponent)
    const last_target = document.getElementById(
      todoComponent.tasksIds[todoComponent.tasksIds.length - 1]
    )

    // Prevents to focus an unexisting target, everytime a new Task is created
    if (last_target) {
      last_target.focus()
    }
  }, [todoComponent.tasksIds])
  return (
    <>
      <Tooltip
        hasArrow
        label="Todo-List"
        bg="white"
        color="black"
        placement="right"
      >
        <Button
          p="0"
          m="0"
          size="sm"
          className="disableFocus"
          opacity=".9"
          _hover={{ opacity: '1' }}
          transition="0.5s all"
          align="center"
          justify="center"
          onClick={onOpen}
        >
          <AiOutlineUnorderedList size="30px" />
        </Button>
      </Tooltip>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        initialFocusRef={initialInputFocus}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Agrega una lista de tareas:</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <Flex id="title" align="center" direction="column" w="full">
                <Text>Título:</Text>
                <Input
                  ref={initialInputFocus}
                  onChange={handleTaskTitleChange}
                ></Input>
              </Flex>
              {todoComponent.tasksIds.map((uuid, index) => (
                <Flex id="tasks" align="center" key={uuid}>
                  <Text px="1">{index + 1}-</Text>
                  <Text pr="2">Tarea:</Text>
                  <Input
                    id={uuid}
                    onChange={handleTaskInputChange}
                    ref={newTaskInputFocus}
                    placeholder="Agrega tarea nueva."
                  />
                  <Flex id="settings" align="center">
                    <DeleteTask
                      uuid={uuid}
                      todoComponent={todoComponent}
                      setTodoComponent={setTodoComponent}
                    />
                  </Flex>
                </Flex>
              ))}

              <Flex id="settings" align="center" px="6">
                <Button p="0" size="xs" onClick={createNewTask}>
                  <AiFillPlusSquare />
                </Button>
              </Flex>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button onClick={addToState}>Crear</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default TodoModal
