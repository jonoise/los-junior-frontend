import { Flex, Text } from '@chakra-ui/layout'
import Navbar from '../components/navbar/NavApp'
import Footer from '../components/footer/FooterLayout'
import Image from 'next/image'
import { Box, HStack, Stack, useColorModeValue, VStack } from '@chakra-ui/react'
const mantra = () => {
  return (
    <>
      <Navbar />
      <Flex
        maxW={'8xl'}
        direction={{ base: 'column', lg: 'row' }}
        py={{ base: 5, sm: 10, md: '50px', lg: '70px' }}
      >
        <Flex
          w={{ base: 'full', lg: '80%' }}
          minH="70vh"
          justify="center"
          align="center"
        >
          <Image
            src={useColorModeValue(
              '/images/mantra_light.png',
              '/images/mantra_dark.png'
            )}
            alt="mantra_junior"
            width="420"
            height="500"
          />
        </Flex>
        <Flex w="full" minH="70vh" justify="center" align="center">
          <Stack>
            {mantras.map((mantra) => {
              return (
                <HStack key={mantra.id} align={'top'}>
                  <Box color={'green.400'} px={2}>
                    <Text fontWeight="bold">{mantra.id}.</Text>
                  </Box>
                  <VStack align={'start'}>
                    <Text color={useColorModeValue('gray.900', 'gray.100')}>
                      {mantra.title}
                    </Text>
                  </VStack>
                </HStack>
              )
            })}
          </Stack>
        </Flex>
      </Flex>
      <Footer />
    </>
  )
}

export default mantra

const mantras = [
  {
    id: 1,
    title: 'Confía en tus errores, son tu mayor maestro.',
  },
  {
    id: 2,
    title: 'Confía en Google, es tu mayor maestro después de tus errores.',
  },
  {
    id: 3,
    title: 'Un buen junior es aquél que googlea como senior.',
  },
  {
    id: 4,
    title:
      'Claro que existen preguntas estúpidas, acaso no has visto Stack Overflow?',
  },
  {
    id: 5,
    title: 'Si no has visto Stack Overflow, qué estás esperando?',
  },
  {
    id: 6,
    title:
      'Es mejor hacer una pregunta estúpida que escribir código spaguetti.',
  },
  {
    id: 7,
    title:
      'Compartir tu conocimiento no ayuda a la "competencia". Te hace consciente de tu trabajo.',
  },
  {
    id: 8,
    title: 'Todo se logra un commit a la vez.',
  },
  {
    id: 9,
    title: 'El orden es más valioso que el talento.',
  },
  {
    id: 10,
    title:
      'Escribir código es un road trip. No se trata del destino, sino del trayecto.',
  },
]
