import { Flex } from '@chakra-ui/react'
import { useSession } from 'next-auth/client'
import { DragDropContext } from 'react-beautiful-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { selectPage, updateComponent } from '../../../pageSlice'
import ComponentHandler from '../handler/ComponentHandler'
import Column from './Column'
import {
  reorderSwitchColumnsRequest,
  reorderSameColumnRequest,
} from './reorderColumns'
const TodoDraggable = ({ uuid, provided }) => {
  // COMPONENT TYPE_: TODO
  const dispatch = useDispatch()
  const page = useSelector(selectPage)
  const todoComponent = page.components[uuid] //uuid === todoComponentId
  const [session] = useSession()

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result

    if (!destination) {
      // if no destination (aka: drop outside droppable)
      return
    }
    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) {
      // if dropping on same index and same column
      return
    }
    if (destination.droppableId !== source.droppableId) {
      // if dropping in different column we gonna get both tasksList from each column

      const sourceCol = todoComponent.columns[source.droppableId]
      const destinationCol = todoComponent.columns[destination.droppableId]

      // 1. extract task list from source column
      const sourceTasksList = Array.from(sourceCol.tasksIds)
      // 2. remove task from source column
      sourceTasksList.splice(source.index, 1)
      // 3. extract task list from destination column
      const destinationTasksList = Array.from(destinationCol.tasksIds)
      // 4. add task to destination column
      destinationTasksList.splice(destination.index, 0, draggableId)
      // 6. Recreate new columns with updated info.
      const newSourceColumn = {
        ...sourceCol,
        tasksIds: sourceTasksList,
      }
      const newDestinationColumn = {
        ...destinationCol,
        tasksIds: destinationTasksList,
      }
      // 7. Recreate a new component with updated values and add it to the state.
      // @ The payload for this action is an ID and the COMPONENT with NEW COLUMNS.
      const payload = {
        uuid: todoComponent.uuid,
        component: {
          ...todoComponent,
          columns: {
            [source.droppableId]: newSourceColumn,
            [destination.droppableId]: newDestinationColumn,
          },
        },
      }
      console.log(payload)
      reorderSwitchColumnsRequest(payload, session)
      dispatch(updateComponent(payload))
      return
    }

    // This will handle the change between the same column.
    const col = todoComponent.columns[source.droppableId]
    const newTasksList = Array.from(col.tasksIds)

    newTasksList.splice(source.index, 1)
    newTasksList.splice(destination.index, 0, draggableId)

    const newCol = {
      ...col,
      tasksIds: newTasksList,
    }

    const newTodoList = {
      ...todoComponent,
      columns: {
        ...todoComponent.columns,
        [newCol.id]: newCol,
      },
    }
    const payload = {
      uuid: newTodoList.uuid,
      component: newTodoList,
    }
    reorderSameColumnRequest(todoComponent, newCol, session)
    dispatch(updateComponent(payload))
  }
  return (
    <>
      <Flex {...provided.draggableProps} ref={provided.innerRef} mb="2.5rem">
        {/* HANDLER/CRUD */}
        <ComponentHandler uuid={uuid} provided={provided} />
        {/* TODO DND COMPONENT */}
        <DragDropContext onDragEnd={onDragEnd}>
          {todoComponent.columnsOrder.map((columnId) => {
            const column = todoComponent.columns[columnId]
            return (
              <Flex direction="column" key={column.id} w="full" align="center">
                <Column column={column} todoComponent={todoComponent} />
              </Flex>
            )
          })}
        </DragDropContext>
      </Flex>
    </>
  )
}

export default TodoDraggable
