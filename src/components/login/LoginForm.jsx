import {
  Box,
  Stack,
  Heading,
  Text,
  Container,
  SimpleGrid,
  VStack,
  Link,
  useColorModeValue,
} from '@chakra-ui/react'
import GithubButton from '../buttons/GithubButton'

const quotes = [
  {
    author: 'La tecnología es mejor cuando junta a las personas.',
    content: 'Matt Mullenweg',
    url: 'https://en.wikipedia.org/wiki/Matt_Mullenweg',
  },
]

export default function JoinOurTeam() {
  return (
    <Box position={'relative'}>
      <Container
        as={SimpleGrid}
        maxW={'7xl'}
        columns={{ base: 1, md: 1, lg: 2 }}
        spacing={{ base: 10, lg: 25, xl: 40 }}
        py={{ base: 5, sm: 10, md: '50px', lg: '70px', xl: '90px' }}
      >
        <Stack spacing={{ base: 10, md: 20 }}>
          <Heading
            lineHeight={1.1}
            fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}
          >
            Recuerda que un buen junior, es aquel que{' '}
            <Text
              as={'span'}
              bgGradient="linear(to-r, red.300,purple.300)"
              bgClip="text"
            >
              Googlea
            </Text>{' '}
            como senior.
            <Text
              fontSize={{ base: 'lg', sm: 'lg', md: 'xl', lg: 'xl' }}
              py="8"
            >
              <Link
                href={'/mantra'}
                color={useColorModeValue('red.400', 'teal.400')}
              >
                -El mantra del junior
              </Link>
            </Text>
          </Heading>
        </Stack>
        <Stack
          bg={'gray.50'}
          rounded={'xl'}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ lg: 'lg' }}
        >
          <Stack spacing={4}>
            <Heading
              color={'gray.800'}
              lineHeight={1.1}
              fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
            >
              Bienvenido, junior. 😀
            </Heading>
            <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
              Sigue construyendo tu camino como desarrollador de software y
              hazte un nombre en la comunidad.
              <br />
            </Text>
          </Stack>
          <GithubButton />
          <VStack spacing="1">
            <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
              No tienes una cuenta de{' '}
              <Link href="https://github.com" color="blue.500" target="_blank">
                Github
              </Link>
              ? 🥴 *se desmaya*. <br />
              Para empezar tu camino como Junior con el pie derecho te
              recomendamos crearte una cuenta con{' '}
              <Link
                href="https://github.com/signup"
                color="blue.500"
                target="_blank"
              >
                Github
              </Link>
              .
            </Text>
          </VStack>
          <Text color={'gray.500'} fontSize={{ base: 'xs', sm: 'sm' }}>
            FAQ: <br />
            Qué es Github?{' '}
            <Link href="#login-info" color="red">
              Saber más
            </Link>{' '}
            <br />
            Por qué solo con Github?{' '}
            <Link href="#login-info" color="red">
              {' '}
              Saber más
            </Link>
          </Text>
        </Stack>
      </Container>
    </Box>
  )
}
