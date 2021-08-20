import {
  Container,
  Flex,
  Heading,
  Link,
  SimpleGrid,
  Stack,
  Text,
  Tooltip,
  VStack,
} from '@chakra-ui/react'
import {
  SiDjango,
  SiGithub,
  SiNextDotJs,
  SiReact,
  SiRedux,
  SiVisualstudiocode,
} from 'react-icons/si'
import { RiWindow2Fill } from 'react-icons/ri'

const LoginInfo = () => {
  return (
    <Container
      as={SimpleGrid}
      maxW={'7xl'}
      columns={{ base: 1, md: 1, lg: 2 }}
      spacing={{ base: 10, lg: 25, xl: 40 }}
      py={{ base: 5, sm: 10, md: '50px', lg: '70px', xl: '50px' }}
    >
      <Stack
        direction="column"
        p="5"
        bg={'gray.100'}
        minH="60vh"
        rounded={'xl'}
      >
        <Flex color="gray.600" align="center">
          <Heading pr="2">Qué es Github?</Heading> <SiGithub size="35px" />
        </Flex>
        <Text color="gray.900">
          Github es un servicio para hostear proyectos en la nube ☁. Sirve como
          un gran archivo en el que puedes llevar el control de tu proyecto,
          colaborar con otras personas y revertir cambios, todo desde la
          terminal de tu computadora.
        </Text>
        <Text color="gray.900">
          La mayoría de proyectos Open Source están en Github. Y es muy probable
          que en tu camino como desarrollador de software tengas que trabajar
          con tu equipo mediante una servicio como Github.
        </Text>
        <Text color="gray.900">
          Estos son algunos de los proyectos que más amamos y que se encuentran
          en Github:
        </Text>
        <Flex
          p={{ base: '1', lg: '5' }}
          w="full"
          h="full"
          justify={{ base: 'space-between', lg: 'space-around' }}
          align="center"
        >
          {LovedProyects.map((project) => {
            return <LovedComponent project={project} key={project.id} />
          })}
        </Flex>
      </Stack>
      <Stack
        direction="column"
        p="5"
        bg={'gray.100'}
        minH="60vh"
        rounded={'xl'}
      >
        <Flex color="gray.600" align="center">
          <Heading>Por qué crear cuenta solamente con Github?</Heading>
        </Flex>
        <Text color="gray.900">
          Nuestra misión es que te conviertas en un mejor desarrollador de
          software con cada paso que das. Esto lo pensamos porque, como ya lo
          sabes, Github es casi un estándar en la industria.
        </Text>
        <Text color="gray.900">
          Al "obligarte" a crear una cuenta con Github, nos estamos asegurando
          que empiezas tu camino como desarrollador de software con el pie
          derecho.
        </Text>
        <Text color="gray.900">
          Tu perfil de Github es tu carta de presentación para reclutadores y
          developers, además de que es un servicio asombroso, en el cuál puedes
          leer el código de otras personas y así obtener ideas e inspiración.
        </Text>
      </Stack>
    </Container>
  )
}

export default LoginInfo

const LovedProyects = [
  {
    id: 1,
    name: 'NextJS',
    icon: <SiNextDotJs />,
    url: 'https://nextjs.org/',
    github: 'https://github.com/vercel/next.js/',
  },
  {
    id: 2,
    name: 'React',
    icon: <SiReact />,
    url: 'https://reactjs.org/',
    github: 'https://github.com/facebook/react',
  },
  {
    id: 3,
    name: 'Django',
    icon: <SiDjango />,
    url: 'https://www.djangoproject.com/',
    github: 'https://github.com/django/django',
  },
  {
    id: 4,
    name: 'Redux',
    icon: <SiRedux />,
    url: 'https://redux.js.org/',
    github: 'https://github.com/reduxjs/redux',
  },
  {
    id: 5,
    name: 'VS Code',
    icon: <SiVisualstudiocode />,
    url: 'https://code.visualstudio.com/',
    github: 'https://github.com/Microsoft/vscode',
  },
]

const LovedComponent = ({ project }) => {
  return (
    <VStack color="gray.700">
      {/* ICON */}
      <Tooltip label={project.name} placement="top" hasArrow>
        <Text fontSize="50px">{project.icon}</Text>
      </Tooltip>

      <Flex w="full" justify="space-around">
        {/* WEBSITE */}
        <Tooltip size="xs" label="Website" placement="bottom" fontSize="xs">
          <Link target="_blank" href={project.url}>
            <RiWindow2Fill />
          </Link>
        </Tooltip>

        {/* GITHUB */}
        <Tooltip size="xs" label="Repositorio" placement="bottom" fontSize="xs">
          <Link target="_blank" href={project.github}>
            <SiGithub />
          </Link>
        </Tooltip>
      </Flex>
    </VStack>
  )
}
