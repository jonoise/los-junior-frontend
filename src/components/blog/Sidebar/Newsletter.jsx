import { Flex, Input, Text } from '@chakra-ui/react'

const Newsletter = () => {
  return (
    <Flex boxShadow="lg" p="6" w="full" alignItems="center" direction="column">
      <Text fontWeight="bold" fontSize="xl" my={2} color="teal.300">
        Suscríbete al Newsletter 🧐
      </Text>
      <Input
        w="full"
        placeholder="Ingresa tu correo electrónico :)"
        _placeholder={{ textAlign: 'center' }}
      />
    </Flex>
  )
}

export default Newsletter
