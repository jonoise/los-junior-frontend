import {
  Box,
  Heading,
  Text,
  Button,
  Stack,
  Container,
  SimpleGrid,
  HStack,
  Icon,
  VStack,
} from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'

const Hero = () => {
  return (
    <Container
      as={SimpleGrid}
      maxW={'8xl'}
      columns={{ base: 1, md: 1, lg: 2 }}
      spacing={{ base: 10, lg: 25, xl: 40 }}
      py={{ base: 5, sm: 10, xl: '20px' }}
    >
      <Stack
        as={Box}
        textAlign={'center'}
        spacing={{ base: 8, md: 14 }}
        py={{ base: 20, md: 36 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
          lineHeight={'110%'}
        >
          Organiza tu flujo de <br />
          <Text as={'span'} color={'green.400'}>
            aprendizaje
          </Text>
        </Heading>
        <Text color={'gray.500'}>
          Crea páginas y organiza la forma en la que aprendes por medio de
          nuestros componentes. Registra tus deberes con listas de tareas, lleva
          el control de tus calificaciones y crea cheatsheets para estudiarlas
          por medio de la técnica pomodoro.
        </Text>
        <Stack
          direction={'column'}
          spacing={3}
          align={'center'}
          alignSelf={'center'}
          position={'relative'}
        >
          <Button
            as="a"
            href="/login"
            colorScheme={'green'}
            bg={'green.400'}
            rounded={'full'}
            px={6}
            _hover={{
              bg: 'green.500',
            }}
          >
            Empezar
          </Button>
          <Button
            as="a"
            variant={'link'}
            colorScheme={'blue'}
            size={'sm'}
            className="disableFocus"
            href={'#know-more'}
          >
            Ver Demo
          </Button>
        </Stack>
      </Stack>
      <Stack align="center" justify="center">
        {pagesFeatures.map((feature) => {
          return (
            <HStack key={feature.id} align={'top'}>
              <Box color={'green.400'} px={2}>
                <Icon as={CheckIcon} />
              </Box>
              <VStack align={'start'}>
                <Text fontWeight={600}>{feature.title}</Text>
                <Text color={'gray.600'}>{feature.text}</Text>
              </VStack>
            </HStack>
          )
        })}
      </Stack>
    </Container>
  )
}

export default Hero

const pagesFeatures = [
  {
    id: 1,
    title: 'Todo en un mismo lugar',
    text: 'Los apuntes son muy importantes, mantenlos todos en un mismo lugar dentro de una página. Se acabaron las hojas de apuntes perdidas en pilas de papeles.',
  },
  {
    id: 2,
    title: 'Crea cheatsheets',
    text: 'Nuestras páginas usan Markdown. Date la ventaja de organizar tu aprendizaje y acceder a él en cualquier momento.',
  },
  {
    id: 5,
    title: 'Crea listas de tareas',
    text: 'Enumerar una serie de tareas relacionadas a una actividad te ayuda a obtener una imagen más amplia y organizada del problema que tienes que solucionar.',
  },
  {
    id: 4,
    title: 'Registra tus calificaciones',
    text: 'Crea un componente de calificaciones para llevar un registro de cuándo entregaste equis o ye tarea, y los puntos que obtuviste de la misma.',
  },
  {
    id: 3,
    title: 'Estudia tus cheatsheets',
    text: 'Nuestras páginas te dejan crear sesiones de estudio usando la técnica pomodoro. Una técnica para la administración del tiempo muy famosa, usada por líderes en todo el mundo.',
  },
]
