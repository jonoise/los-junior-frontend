import { Flex, Text } from '@chakra-ui/react'

const CountBox = (props) => {
  const { count, title, description } = props
  // TODO: REDUCIR EL FONTSIZE DEPENDIENDO DEL LENGTH DEL COUNT
  return (
    <Flex
      w="full"
      h="full"
      justify="center"
      align="center"
      direction="column"
      p="5"
      border="1px solid"
    >
      <Text>{title}</Text>
      <Text
        fontSize="9xl"
        fontFamily="Montserrat"
        fontWeight="semibold"
        lineHeight="1"
        transition=".3s all"
      >
        {count}
      </Text>
      <Text fontFamily="Montserrat" lineHeight=".9" fontSize="xs">
        {description}
      </Text>
    </Flex>
  )
}

export default CountBox
