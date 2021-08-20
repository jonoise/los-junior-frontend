import React from 'react'

import {
  Box,
  Container,
  Image,
  Link,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

const Logo = (props) => {
  return (
    <Image
      {...props}
      src="https://user-images.githubusercontent.com/71573508/123221377-1eab8800-d48c-11eb-8a76-34a07a4ae62c.png"
      alt=""
    />
  )
}

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  )
}

export default function LargeWithLogoLeft() {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
    >
      <Container as={Stack} maxW={'6xl'} p={10}>
        <SimpleGrid
          templateColumns={{ sm: '1fr 1fr', md: '2fr 1fr 1fr 1fr 1fr' }}
          spacing={8}
        >
          <Stack spacing={6}>
            <Box>
              <Logo color={useColorModeValue('gray.700', 'white')} w="10rem" />
            </Box>
            <Text fontSize={'sm'}>© 2021 - Somos Los Junior</Text>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Support</ListHeader>
            <Link href={'#'}>Contacto</Link>
            <Link href={'#'}>Términos de servicio</Link>
            <Link href={'#'}>Términos de privacidad</Link>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Producto</ListHeader>
            <Link href={'#'}>Overview</Link>
            <Link href={'#'}>Features</Link>
            <Link href={'#'}>Tutorials</Link>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Síguenos</ListHeader>
            <Link href={'#'}>Facebook</Link>
            <Link href={'#'}>Twitter</Link>
            <Link href={'#'}>Instagram</Link>
            <Link href={'#'}>Github</Link>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  )
}
