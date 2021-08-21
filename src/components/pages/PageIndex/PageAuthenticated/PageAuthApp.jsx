import { Button, Container, Flex, Input, Stack } from '@chakra-ui/react'
import { useState } from 'react'
import { API_BASE_URL } from '../../../../constants'
import { useEffect } from 'react'
import NewPageModal from './NewPageModal'
import PagesList from './PagesList'

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
        <Stack w={{ base: 'full', lg: '30%' }} p="5">
          <NewPageModal />
          {pagesLoading ? '' : <PagesList pages={pages} />}
        </Stack>
        <Stack flex={{ base: '100%', lg: '1' }} p="5"></Stack>
      </Flex>
    </>
  )
}

export default PageAuthApp
