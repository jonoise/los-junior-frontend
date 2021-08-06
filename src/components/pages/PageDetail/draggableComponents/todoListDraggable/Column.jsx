import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import Task from './Task'

function Column({ column, todoComponent }) {
  return (
    <>
      <Box w="full" p="2" textAlign="center">
        <Text>{column.title}</Text>
      </Box>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <Flex
            w="90%"
            maxW="300px"
            m="2"
            p="4"
            margin="20px"
            minH="15rem"
            direction="column"
            transition=".3s all"
            bg={useColorModeValue('#fcfcfc', 'gray.800')}
            {...provided.droppableProps}
            ref={provided.innerRef}
            borderRadius="10px"
            boxShadow={useColorModeValue(
              '-15px 15px 30px #e7e7e7, 15px -15px 20px #ffffff',
              '-15px 15px 30px #111018, 15px -15px 40px #0d0d11'
            )}
          >
            {column.tasksIds.length > 0 ? (
              column.tasksIds.map((taskId, index) => {
                const task = todoComponent.tasksComponents[taskId]
                return <Task task={task} index={index} key={task.uuid} />
              })
            ) : column.id === 'pending_tasks' ? (
              <EmptyPendingColumn />
            ) : (
              ''
            )}
            {provided.placeholder}
          </Flex>
        )}
      </Droppable>
    </>
  )
}

export default Column

const EmptyPendingColumn = () => {
  return (
    <Flex w="full" h="full" align="center" justify="center">
      <Text opacity=".4">Completaste todas las tareas.🥳</Text>
    </Flex>
  )
}
