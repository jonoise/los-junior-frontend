import { Container, Flex, HStack, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import NavApp from '../../components/navbar/NavApp'
import dynamic from 'next/dynamic'
import Sidebar from '../../components/pages/PageDetail/Sidebar'
import Editor from '../../components/pages/PageDetail/Editor'
import { useDispatch, useSelector } from 'react-redux'
import { loadPage } from '../../app/pageSlice'
import { selectPageSettings } from '../../app/pageSettings'
import { getSession, providers } from 'next-auth/client'
import axios from '../../lib/axios'
import { API_BASE_URL } from '../../constants'
const View = dynamic(import('../../components/pages/PageDetail/View'))

function PageDetail(props) {
  const { page } = props
  const dispatch = useDispatch()
  const pageSettings = useSelector(selectPageSettings)
  const [winReady, setwinReady] = useState(false)

  useEffect(() => {
    setwinReady(true)
  }, [])

  useEffect(() => {
    dispatch(loadPage(page))
  }, [page])
  return (
    <>
      <NavApp />
      <HStack h="96vh" py="5" px="2">
        <Flex
          w="full"
          h="full"
          justify="center"
          maxW="12"
          p="2"
          border="1px dotted"
          borderRadius="10px"
          borderColor="#a5a5a5"
        >
          {/* PAGE SIDEBAR */}
          <Sidebar />
        </Flex>
        <Flex
          w="full"
          h="full"
          overflow="auto"
          overflowX="hidden"
          direction="column"
          maxW={pageSettings.editorIsOpen ? '500' : '60px'}
          transition=".7s all"
          border="1px dotted"
          borderColor="#a5a5a5"
          borderRadius="10px"
          css={{
            '&::-webkit-scrollbar': {
              background: 'black',
              width: '10px',
            },
            '&::-webkit-scrollbar-track': {
              background: '#171923',
              width: '6px',
              borderRadius: '24px',
            },
            '&::-webkit-scrollbar-thumb': {
              height: 'xs',
              width: '10em',
              background: '#3182CE',
              borderRadius: '24px',
            },
          }}
        >
          {/* PAGE EDITOR */}
          <Editor />
        </Flex>
        <Flex h="full" w="full" minW="600px" flex={2} justify="center">
          {/* PAGE VIEW */}
          {winReady ? <View /> : null}
        </Flex>
      </HStack>
    </>
  )
}

export default PageDetail

export async function getServerSideProps(context) {
  const { req, res, params } = context

  const session = await getSession({ req })
  if (!session) {
    res.writeHead(302, {
      Location: `/login?message=login_first`,
    })
    res.end()
  }

  const serverRes = await fetch(`${API_BASE_URL}/pages/${params['uuid']}`)
  const page = await serverRes.json()

  if (page.detail === 'Not found.') {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      providers: await providers(context),
      page: page,
    },
  }
}
