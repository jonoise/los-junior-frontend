import {
  Button,
  Flex,
  HStack,
  Text,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react'
import { useState } from 'react'
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
          mt="2"
          px={taskCharCount > 30 ? '3' : '2'}
          py={taskCharCount > 30 ? '1.5' : '1'}
          align="center"
          justify="space-between"
          borderRadius="50px"
          background={useColorModeValue(
            'linear-gradient(45deg, #f0f0f0, #f1f1f1)',
            'linear-gradient(45deg, #11101894, #0d0d11)'
          )}
          _hover={{ background: 'gray.400' }}
          boxShadow={useColorModeValue(
            '-7px 7px 30px #e7e7e7, 7px -7px 20px #ffffff',
            '-3px 3px 1px #111018, 3px -3px 20px #0d0d11'
          )}
          // boxShadow="-3px 3px 1px #e7e7e7, 3px -3px 20px #eeeeee"

          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <Text fontSize="14">{task.content}</Text>
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
