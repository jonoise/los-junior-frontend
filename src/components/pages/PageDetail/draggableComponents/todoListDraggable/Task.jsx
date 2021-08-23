import {
  Button,
  Flex,
  HStack,
  Text,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { IoIosCopy } from 'react-icons/io'

const Task = ({ task, index }) => {
  const [taskCharCount, setTaskCharCount] = useState(task.content.length)

  const handleCopyAsCommit = () => {
    console.log(task)
  }

  return (
    <Draggable draggableId={task.uuid} index={index}>
      {(provided) => (
        <Flex
          px={taskCharCount > 30 ? '3' : '2'}
          py={taskCharCount > 30 ? '1.5' : '1'}
          mt="2"
          align="center"
          justify="space-between"
          border="1px solid #ffeedd23"
          bg={useColorModeValue('gray.100', 'gray.800')}
          shadow="lg"
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <Text shadow="sm">{task.content}</Text>
          <HStack>
            <Tooltip hasArrow label="Copiar como commit" placement="top">
              <Button size="xs" p="0" m="0" onClick={handleCopyAsCommit}>
                <IoIosCopy />
              </Button>
            </Tooltip>
          </HStack>
        </Flex>
      )}
    </Draggable>
  )
}

export default Task
