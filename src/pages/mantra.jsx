import { Container, Flex, SimpleGrid, Text } from '@chakra-ui/layout'
import Navbar from '../components/navbar/NavApp'
const mantra = () => {
  return (
    <>
      <Navbar />
      <Container
        as={SimpleGrid}
        maxW={'8xl'}
        columns={{ base: 1, md: 1, lg: 2 }}
        spacing={{ base: 10, lg: 25, xl: 40 }}
        py={{ base: 5, sm: 10, md: '50px', lg: '70px', xl: '90px' }}
      >
        <Flex w="full" minH="70vh" bg="red.400">
          <Text>s</Text>
        </Flex>
        <Flex></Flex>
      </Container>
    </>
  )
}

export default mantra
