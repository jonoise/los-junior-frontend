import { Flex, Text, useColorModeValue } from '@chakra-ui/react'

const ListDisplay = (props) => {
  const { title, list, blogSearch } = props
  return (
    <Flex
      direction="column"
      w="full"
      h="full"
      justify="center"
      align="center"
      p="2"
      border="1px solid"
    >
      <Text>{title}</Text>
      {list.length >= 5 ? (
        list.map((obj) => {
          return (
            <SingleObjectInline
              obj={obj}
              key={obj.id}
              blogSearch={blogSearch}
            />
          )
        })
      ) : (
        <NotEnoughObjects />
      )}
    </Flex>
  )
}

export default ListDisplay

const SingleObjectInline = ({ obj }) => {
  return (
    <Flex
      px="2"
      py="1"
      bg={useColorModeValue('gray.200', 'gray.900')}
      borderRadius="4"
      as="a"
      href={obj.url}
      w="full"
      my="1"
      transition=".4s all"
      _hover={{
        bg: useColorModeValue('gray.400', 'gray.700'),
      }}
    >
      <Text p="-0.5" fontSize={{ base: 'xs', md: 'xx-small' }}>
        {obj.title}
      </Text>
    </Flex>
  )
}

const NotEnoughObjects = () => {
  return (
    <Flex
      px="2"
      py="1"
      borderRadius="4"
      w="full"
      my="1"
      transition=".4s all"
      justify="center"
    >
      <Text p="-0.5" fontSize={{ base: 'xs', md: 'xx-small' }}>
        No hay suficiente contenido para mostrar.
      </Text>
    </Flex>
  )
}
