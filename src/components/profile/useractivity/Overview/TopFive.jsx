import { Flex, Link, Stack, Text, useColorModeValue } from '@chakra-ui/react'

const TopFive = (props) => {
  const { title, top_five } = props
  return (
    <Flex
      w="full"
      h="full"
      justify="center"
      align="center"
      direction="column"
      p="2"
      border="1px solid"
    >
      <Text>{title}</Text>
      <Stack>
        {top_five.map((obj) => {
          return <SingleObjectInline obj={obj} key={obj.id} />
        })}
      </Stack>
    </Flex>
  )
}

export default TopFive

const SingleObjectInline = ({ obj }) => {
  return (
    <Flex
      px="2"
      py="1"
      bg={useColorModeValue('gray.200', 'gray.900')}
      borderRadius="4"
      as="a"
      href={`/blog/post/${obj.slug}`}
    >
      <Text fontSize="xs">{obj.title}</Text>
    </Flex>
  )
}
