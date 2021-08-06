import React from 'react'
import {
  Flex,
  useColorModeValue,
  Text,
  useDisclosure,
  Avatar,
  Box,
} from '@chakra-ui/react'
import formatDate from '../../../../../lib/dateStringify'

const Comment = ({ comment }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Flex
        border="1px solid"
        borderColor="gray.100"
        borderRadius="sm"
        w="full"
        direction="column"
      >
        <Flex
          p="2"
          borderTopRadius="sm"
          alignItems="center"
          justify="space-between"
          borderBottom="1px solid"
          borderBottomColor={useColorModeValue('gray.200')}
          bg={useColorModeValue('gray.300', 'gray.800')}
        >
          <Flex alignItems="center">
            <Avatar
              name={comment.author.name}
              src={comment.author.image}
              size="xs"
              mr="2"
            />
            <Text fontWeight="bold" fontSize="12">
              {comment.author.name} comentó:
            </Text>
          </Flex>
          <Text fontSize="10px">Fecha: {formatDate(comment.created)}</Text>
        </Flex>
        <Flex p="2" pl="8" bg={useColorModeValue('gray.200', 'gray.900')}>
          <Text>{comment.content}</Text>
        </Flex>
      </Flex>
    </>
  )
}

export default Comment
