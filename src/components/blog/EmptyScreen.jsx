import { Flex, Heading, Text } from '@chakra-ui/react'

const EmptyScreen = () => {
  return (
    <Flex
      minH="80vh"
      w="full"
      justify="center"
      align="center"
      direction="column"
    >
      <Heading>No hemos encontrado un match a tu query 😢</Heading>
      <Text>Trata con una palabra específica o una frase pequeña</Text>
      {/* TODO: BLOG ADVANCED SEARCH */}
      {/* <Text>
        Sino, puedes elaborar una{' '}
        <a href="/blog/buscar/">búsqueda más avanzada</a>.
      </Text> */}
    </Flex>
  )
}

export default EmptyScreen
