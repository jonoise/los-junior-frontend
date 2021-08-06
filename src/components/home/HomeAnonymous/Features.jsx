import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  HStack,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'

const features = [
  {
    id: 1,
    title: 'Aprende Git',
    text: 'Qué es Git y para qué sirve? Aquí te enseñamos a crear repos, enviar commits y viajar en el tiempo.',
  },
  {
    id: 2,
    title: 'Aprende Markdown',
    text: 'Un lenguaje de marcado, similar a HTML. Amado por developers en todas partes del mundo 🌎.',
  },
  {
    id: 5,
    title: 'Lenguajes en demanda',
    text: 'Nuestro contenido se enfoca en dos lenguajes muy populares: Python y Javascript.',
  },
  {
    id: 3,
    title: 'Crea tus propios Cheatsheets',
    text: 'Usando Markdown vamos a crear nuestras propias cheatsheets para estudiarlas en el futuro.',
  },
  {
    id: 4,
    title: 'Administra tu tiempo',
    text: 'Usa la técnica Pomodoro para estudiar tus Cheatsheets. Crea sesiones de estudio y streaks por día.',
  },
  {
    id: 6,
    title: 'Únete a la comunidad',
    text: 'Juntos seremos más fuertes. Completa tu entramiento 🐱‍👤 y ayuda a los que vienen detrás tuyo.',
  },
]

const Features = () => {
  return (
    <Box px={4} py="16" bg={useColorModeValue('gray.200')}>
      <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
        <Heading fontSize={'3xl'}>Entrena como los grandes!🥇</Heading>
        <Text color={'gray.600'} fontSize={'xl'}>
          En Los Junior hemos construído un espacio para que aprendas. Te damos
          las herramientas y te enseñamos a hacer uso efectivo de ellas. <br />{' '}
          Únete y completa el{' '}
          <span style={{ color: 'red' }}>camino del Junior</span>.
        </Text>
      </Stack>
      <Container maxW={'5xl'} mt={10}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
          {features.map((feature) => (
            <HStack key={feature.id} align={'top'}>
              <Box color={'green.400'} px={2}>
                <Icon as={CheckIcon} />
              </Box>
              <VStack align={'start'}>
                <Text fontWeight={600}>{feature.title}</Text>
                <Text color={'gray.600'}>{feature.text}</Text>
              </VStack>
            </HStack>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}
export default Features
