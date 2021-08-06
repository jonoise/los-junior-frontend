import { Button, Container, Flex, Input, Stack } from '@chakra-ui/react'
import { useState } from 'react'
import { v4 as uuid_v4 } from 'uuid'
import axios from '../../../../lib/axios'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'

const PageAuthApp = () => {
  const [session] = useSession()
  const router = useRouter()
  const [pageTitle, setPageTitle] = useState('')

  const handleTitleChange = (e) => {
    setPageTitle(e.target.value)
  }

  const createPage = async () => {
    const newPage = {
      uuid: uuid_v4(),
      title: pageTitle,
      componentsIds: [],
    }

    const res = await axios('POST', '/pages/', newPage, session)
    if (res.status === 201) {
      const uuid = res.data.uuid
      router.push(`/pages/${uuid}`)
    }
  }

  return (
    <>
      <Container minW="container.xl">
        <Flex w="100%" justify="center">
          <Stack w="50%">
            <Input
              placeholder="Dale un título a tu página"
              onChange={handleTitleChange}
              value={pageTitle}
            />
            <Button onClick={createPage}>Crear</Button>
          </Stack>
        </Flex>
      </Container>
    </>
  )
}

export default PageAuthApp
