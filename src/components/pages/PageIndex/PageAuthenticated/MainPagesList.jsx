import {
  Badge,
  Box,
  Divider,
  Flex,
  Heading,
  HStack,
  Link,
  Stack,
  Text,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react'
import { TiUser } from 'react-icons/ti'
import NewPageModal from './newPageModal/NewPageModal'

const MainPagesList = ({ pages }) => {
  return (
    <>
      <PagesNav />
      <Stack minH="70vh">
        {pages.length > 0 &&
          pages.map((page) => {
            console.log(page)
            return <SinglePageBox page={page} key={page.uuid} />
          })}

        {pages.length === 0 && <NoPages />}
      </Stack>
    </>
  )
}

export default MainPagesList

const PagesNav = () => {
  return (
    <HStack
      w="full"
      px="5"
      minH="40px"
      bg={useColorModeValue('gray.200', 'gray.900')}
      borderTopLeftRadius="md"
      borderTopRightRadius="md"
    >
      <HStack></HStack>
    </HStack>
  )
}

const SinglePageBox = ({ page }) => {
  return (
    <Stack
      _hover={{ bg: '#ffddee06' }}
      px={{ base: '2', lg: '10' }}
      pt={{ base: '2', lg: '10' }}
      pb="2"
    >
      <Flex justify="space-between" align="center">
        <HStack fontSize="xl">
          <Text>{page.emoji}</Text>
          <Link href={`/pages/${page.uuid}`}>
            <Text
              color={useColorModeValue('gray.900', 'teal.300')}
              fontWeight="semibold"
            >
              {page.title}
            </Text>
          </Link>
        </HStack>
        <Badge>{page.category}</Badge>
      </Flex>
      <Flex justify="space-between">
        <Text
          color={useColorModeValue('gray.700', 'gray.100')}
          fontWeight="thin"
        >
          {page.description}
        </Text>
        <Tooltip label="Seguidores" hasArrow placement="top">
          <HStack>
            <TiUser />
            <Text>{page.followers.length > 0 ? page.followers : 0}</Text>
          </HStack>
        </Tooltip>
      </Flex>
      <Divider />
    </Stack>
  )
}

const NoPages = () => {
  return (
    <Stack
      w="full"
      h="full"
      align="center"
      justify="center"
      bg="#ddffee06"
      rounded="md"
    >
      <Heading>Aún no tienes páginas.</Heading>
      <Flex w="50%">
        <NewPageModal />
      </Flex>
    </Stack>
  )
}
