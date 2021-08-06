import React from 'react'
import { Text, VStack, Flex } from '@chakra-ui/react'

function SinglePostHeader({ author, title }) {
  return (
    <VStack>
      <Text fontFamily="Noto Serif" fontSize={{ base: '2.6rem', xl: '6xl' }}>
        {title}
      </Text>
      <Flex w="full">
        <Flex
          justify="space-between"
          w="full"
          direction={{ base: 'column', lg: 'row' }}
        >
          <Text>Escrito por: {author.name ? author.name : author.email}</Text>
        </Flex>
      </Flex>
    </VStack>
  )
}

export default SinglePostHeader
