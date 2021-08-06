import { Flex, Heading, Text } from '@chakra-ui/react'

const PageAnonApp = () => {
  return (
    <Flex
      minH="90vh"
      w="full"
      justify="center"
      align="center"
      direction="column"
      p="10"
    >
      <iframe src="https://embed.lottiefiles.com/animation/66205"></iframe>
      <Heading>En construcción</Heading>
      <Text>
        Estamos trabajando para traerte las Páginas. Donde podrás llevar de
        manera organizada tus tareas, apuntes, evaluaciones, calificaciones y
        más.
      </Text>
    </Flex>
  )
}

export default PageAnonApp
