import {
  Box,
  Button,
  Flex,
  Input,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react'
import { nanoid } from 'nanoid'
import { useSession } from 'next-auth/client'
import { useEffect, useRef, useState } from 'react'
import { AiFillPlusSquare } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { selectPageSettings } from '../../pageSettingsSlice'
import { addComponent, selectPage, updateComponent } from '../../pageSlice'
import axios from '../../../../lib/axios'

const ShowTodoEditor = ({ displayEditor }) => {
  const toast = useToast()
  const initialInputFocus = useRef()
  const [session] = useSession()
  const dispatch = useDispatch()
  const page = useSelector(selectPage)
  const { currentComponentId } = useSelector(selectPageSettings)
  const [todoComponent, setTodoComponent] = useState(null)

  const [currentChangingInput, setCurrentChangingInput] = useState({
    uuid: undefined,
    content: undefined,
  })

  useEffect(() => {
    console.log(page)
    setTodoComponent(page.components[currentComponentId])
  }, [page.components])

  useEffect(() => {
    // This use effect handle POST requests to DB everytime a task is updated
    // it uses a setTimeout to await some time while the use is typing.
    const timeout = setTimeout(() => {
      axios(
        'PATCH',
        `pages/todos/tasks/${currentChangingInput.uuid}`,
        { content: currentChangingInput.content, type_of: 'task' },
        session
      )
    }, 800)

    return () => clearTimeout(timeout)
  }, [currentChangingInput])

  const createNewTask = () => {
    const newTask = {
      uuid: nanoid(20),
      content: '',
    }

    setTodoComponent({
      ...todoComponent,
      tasksComponents: {
        ...todoComponent.tasksComponents,
        [newTask.uuid]: {
          uuid: newTask.uuid,
          content: newTask.content,
        },
      },
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
      tasksIds: [...todoComponent.tasksIds, newTask.uuid],
    })
    axios('POST', `pages/todos/${todoComponent.uuid}/tasks/`, newTask, session)
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

    // Setting the currentChangingInput for the useEffect
    setCurrentChangingInput({ uuid: e.target.id, content: e.target.value })
  }

  const saveEditTodo = () => {
    console.log(todoComponent.tasks)
    for (let taskId in todoComponent.tasks) {
      console.log(taskId)
      if (todoComponent.tasks[taskId].content === '') {
        toast({
          title: 'Hay tareas incompletas.',
          description: 'Asegúrate de rellenar todos los espacios.',
          id: taskId,
          duration: 5000,
          status: 'error',
        })
        return
      }
    }

    const payload = {
      uuid: todoComponent.uuid,
      component: todoComponent,
    }
    dispatch(updateComponent(payload))
  }

  return (
    <>
      <Flex
        w="full"
        h="full"
        direction="column"
        style={{ opacity: displayEditor ? '1' : '0', transition: '1s ease' }}
      >
        <Stack w="full" p="2" h="full" direction="column">
          <Flex id="title" align="center" direction="column">
            <Text>Título:</Text>
            <Input
              ref={initialInputFocus}
              defaultValue={todoComponent ? todoComponent.title : ''}
              // onChange={handleTaskTitleChange}
            ></Input>
          </Flex>
          {todoComponent
            ? todoComponent.tasksIds.map((uuid, index) => {
                const task = todoComponent.tasksComponents[uuid]
                return (
                  <Flex id="tasks" align="center" key={uuid} w="full">
                    <Text px="1">{index + 1}-</Text>
                    <Text pr="2">Tarea:</Text>
                    <Input
                      id={uuid}
                      defaultValue={task.content}
                      onChange={handleTaskInputChange}
                      // ref={newTaskInputFocus}
                      placeholder={task.content ? task.content : 'Editar tarea'}
                    />
                  </Flex>
                )
              })
            : ''}

          <Flex id="settings" align="center" px="6" pb="5rem">
            <Button p="0" size="xs" onClick={createNewTask}>
              <AiFillPlusSquare />
            </Button>
          </Flex>
          <Flex
            id="settings"
            align="center"
            px="6"
            pb="5rem"
            justify="flex-end"
          >
            <Button onClick={saveEditTodo}>Guardar</Button>
          </Flex>
        </Stack>
      </Flex>
    </>
  )
}

export default ShowTodoEditor
