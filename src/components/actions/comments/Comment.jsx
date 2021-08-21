import React from 'react'
import { Flex, useColorModeValue, Text, Avatar } from '@chakra-ui/react'
import formatDate from '../../../lib/dateStringify'
import { useSession } from 'next-auth/client'
import DeleteComment from './DeleteComment'

const Comment = ({ comment, setComments }) => {
  const [session] = useSession()
  const { author, content, created } = comment
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
            <Avatar name={author.name} src={author.image} size="xs" mr="2" />
            <Text fontWeight="bold" fontSize="12">
              {author.name} comentó:
            </Text>
          </Flex>
          <Flex align="center" justify="center">
            <Text fontSize="10px">Fecha: {formatDate(created)}</Text>
            {session && session.user.username === author.username && (
              <DeleteComment comment={comment} setComments={setComments} />
            )}
          </Flex>
        </Flex>
        <Flex p="2" pl="8" bg={useColorModeValue('gray.200', 'gray.900')}>
          <Text>{content}</Text>
        </Flex>
      </Flex>
    </>
  )
}

export default Comment
