import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Text,
  Avatar,
  HStack,
  useColorModeValue,
  Input,
} from '@chakra-ui/react'

import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { v4 as uuid_v4 } from 'uuid'
import axios from '../../../../lib/axios'

const NewPageModal = () => {
  const router = useRouter()
  const [pageTitle, setPageTitle] = useState('')
  const [session] = useSession()
  const { isOpen, onOpen, onClose } = useDisclosure()

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
      {session ? <MiniAvatar session={session} /> : ''}
      <Text>
        Empieza a llevar registro de tu aprendizaje y de cualquier actividad con
        una página:
      </Text>
      <Button
        onClick={onOpen}
        bg="green.400"
        _hover={{ bg: 'green.500' }}
        color="white"
      >
        Crear página 🤩
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Crear nueva página</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Dale un título a tu página"
              onChange={handleTitleChange}
              value={pageTitle}
            />
          </ModalBody>

          <ModalFooter>
            <Button onClick={createPage} colorScheme="blue" mr={3}>
              Crear
            </Button>
            <Button onClick={onClose} variant="ghost">
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default NewPageModal

const MiniAvatar = ({ session }) => {
  return (
    <HStack
      w="full"
      p="5"
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
