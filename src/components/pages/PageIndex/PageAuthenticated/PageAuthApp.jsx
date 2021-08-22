import {
  Avatar,
  Flex,
  HStack,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { useState } from 'react'
import { API_BASE_URL } from '../../../../constants'
import { useEffect } from 'react'
import NewPageModal from './newPageModal/NewPageModal'
import MainPagesList from './MainPagesList'
import SidePagesList from './SidePagesList'

const PageAuthApp = ({ session }) => {
  const [pages, setPages] = useState(null)
  const [pagesLoading, setPagesLoading] = useState(true)

  useEffect(() => {
    const fetchPages = async () => {
      const data = await (
        await fetch(`${API_BASE_URL}/pages/owner/${session.user.username}`)
      ).json()
      setPages(data)
      setPagesLoading(false)
    }

    fetchPages()
  }, [])

  return (
    <>
      <Flex
        w="100%"
        justify="center"
        px={{ base: 2, lg: '10' }}
        direction={{ base: 'column', lg: 'row' }}
      >
        {/* SIDEBAR */}
        <Stack w={{ base: 'full', lg: '30%' }} p="5">
          {session ? <MiniAvatar session={session} /> : ''}
          <Text>
            Empieza a llevar registro de tu aprendizaje y de cualquier actividad
            con una página:
          </Text>
          <NewPageModal />
          {pagesLoading ? 'LOADING...' : <SidePagesList pages={pages} />}
        </Stack>
        {/* MAIN FRAME */}
        <Flex direction="column" flex={{ base: '100%', lg: '1' }} p="5">
          {pagesLoading ? 'LOADING...' : <MainPagesList pages={pages} />}
        </Flex>
      </Flex>
    </>
  )
}

export default PageAuthApp

const MiniAvatar = ({ session }) => {
  return (
    <HStack
      w="full"
      px="5"
      minH="40px"
      bg={useColorModeValue('gray.200', 'gray.900')}
      rounded="md"
    >
      <HStack>
        <Avatar src={session.user.image} size="xs" />
        <Text>{session.user.name}</Text>
      </HStack>
    </HStack>
  )
}
