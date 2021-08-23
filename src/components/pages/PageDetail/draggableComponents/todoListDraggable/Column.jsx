import { Box, Flex, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Droppable } from 'react-beautiful-dnd'
import Task from './Task'

function Column({ column, todoComponent }) {
  return (
    <>
      <Stack
        w="full"
        h="full"
        justify="center"
        align="center"
        p="4"
        m="2"
        border="1px solid #ffeedd06"
      >
        <Text>Tareas {column.title}</Text>
        <Droppable droppableId={column.id}>
          {(provided) => (
            <Flex
              w="90%"
              minH="30vh"
              direction="column"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {column.tasksIds.length > 0 &&
                column.tasksIds.map((taskId, index) => {
                  const task = todoComponent.tasksComponents[taskId]
                  return <Task task={task} index={index} key={task.uuid} />
                })}
              {column.tasksIds.length === 0 &&
                column.id === 'pending_tasks' && <EmptyPendingColumn />}
              {column.tasksIds.length === 0 &&
                column.id === 'completed_tasks' &&
                ''}
              {provided.placeholder}
            </Flex>
          )}
        </Droppable>
      </Stack>
    </>
  )
}

export default Column

const EmptyPendingColumn = () => {
  return (
    <Flex w="full" h="full" align="center" justify="center" bg="#ffeedd06">
      <Text opacity=".4">Completaste todas las tareas.🥳</Text>
    </Flex>
  )
}
