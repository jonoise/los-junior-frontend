import React from 'react'
import {
  chakra,
  Text,
  Box,
  useColorModeValue,
  Stack,
  Image,
  Flex,
  Link,
  Button,
} from '@chakra-ui/react'

const CTA = () => {
  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      bg={useColorModeValue('brand.500')}
      px={8}
      py={24}
      mx="auto"
    >
      <Box
        w={{ base: 'full', md: 11 / 12, xl: 9 / 12 }}
        mx="auto"
        pr={{ md: 20 }}
      >
        <Text
          fontSize={{ base: '3xl', sm: '4xl' }}
          fontWeight="extrabold"
          lineHeight="shorter"
          color={useColorModeValue('gray.700', 'gray.100')}
          mb={6}
        >
          <chakra.span display="block">Únete a nuestra comunidad</chakra.span>
          <chakra.span
            display="block"
            color={useColorModeValue('gray.700', 'gray.500')}
          >
            y conviertete en desarrollador junior.
          </chakra.span>
        </Text>
        <Text
          mb={6}
          fontSize={{ base: 'lg', md: 'xl' }}
          color={useColorModeValue('gray.500', 'gray.300')}
        >
          Organiza tu aprendizaje con las Páginas de Los Junior. <br />
          Aprovecha las herramientas que te ofrecemos para que mantengas tu
          línea de estudio acorde a lo que vas aprendiendo y puedas volver a
          ello cuando quieras!
        </Text>
        <Stack
          direction={{ base: 'column', sm: 'row' }}
          mb={{ base: 4, md: 8 }}
          spacing={2}
        >
          <Button
            as={'a'}
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg={'green.400'}
            href={'/login'}
            _hover={{
              bg: 'green.500',
            }}
          >
            Crear cuenta
          </Button>
          <Button
            as={'a'}
            href={`/descubrir`}
            borderRadius="md"
            cursor="pointer"
            bg="transparent"
            borderWidth="1px"
            borderColor={useColorModeValue('black', 'white')}
            color={useColorModeValue('black', 'white')}
            justify="center"
            transition=".3s"
            _hover={{
              bg: useColorModeValue('black', 'white'),
              color: useColorModeValue('white', 'black'),
            }}
          >
            Descubre +
          </Button>
        </Stack>
      </Box>
      <Box w={{ base: 'full', md: 10 / 12 }} mx="auto" textAlign="center">
        <Image
          w="full"
          rounded="lg"
          shadow="2xl"
          src="https://user-images.githubusercontent.com/71573508/127221875-cfdf9cbb-dd9b-4be1-ae66-3bf443ed7c94.png"
          alt="Imagen de portada de Los Juniors. Buscador con logo"
        />
      </Box>
    </Flex>
  )
}

export default CTA
