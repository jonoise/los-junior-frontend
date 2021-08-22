import { ChevronDownIcon } from '@chakra-ui/icons'

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
  Input,
  useToast,
  Popover,
  PopoverTrigger,
  PopoverArrow,
  PopoverContent,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  HStack,
  Flex,
  FormHelperText,
} from '@chakra-ui/react'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import { v4 as uuid_v4 } from 'uuid'
import axios from '../../../../../lib/axios'
import { validateNewPage } from './validateNewPage'
import { selectEmojis } from './selectedEmojis'

const NewPageModal = () => {
  const router = useRouter()
  const newPageInit = {
    uuid: uuid_v4(),
    title: '',
    description: '',
    emoji: '📓',
    category: '',
    componentsIds: [],
    followers: [],
  }

  const toast = useToast()
  const [btnDisable, setBtnDisable] = useState(false)
  const [newPage, setNewPage] = useState(newPageInit)
  const [session] = useSession()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const createPage = async () => {
    const validation = validateNewPage(newPage)
    if (validation.isValid) {
      setBtnDisable(true)
      const res = await axios('POST', '/pages/', newPage, session)
      if (res.status === 201) {
        const uuid = res.data.uuid
        router.push(`/pages/${uuid}`)
      }
      toast({
        id: validation.title,
        title: 'Espera un segundo',
        description: 'Estamos creando tu página 😊',
        duration: 4000,
        status: 'success',
      })
      return
    }
    toast({
      id: validation.title,
      title: validation.title,
      description: validation.desc,
      duration: 4000,
      status: 'error',
    })
    return
  }

  return (
    <>
      <Button
        onClick={onOpen}
        bg="green.400"
        _hover={{ bg: 'green.500' }}
        color="white"
        w="full"
      >
        Crear página 🤩
      </Button>

      <Modal
        blockScrollOnMount={true}
        closeOnOverlayClick={btnDisable ? false : true}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Crear nueva página</ModalHeader>
          <ModalCloseButton disabled={btnDisable ? true : false} />
          <ModalBody>
            <InputTitle setNewPage={setNewPage} />
            <InputDescription setNewPage={setNewPage} />
            <InputCategories newPage={newPage} setNewPage={setNewPage} />
            <br />
            <InputEmoji newPage={newPage} setNewPage={setNewPage} />
          </ModalBody>

          <ModalFooter>
            <Button
              disabled={btnDisable ? true : false}
              onClick={createPage}
              colorScheme="blue"
              mr={3}
            >
              Crear
            </Button>
            <Button
              disabled={btnDisable ? true : false}
              onClick={onClose}
              variant="ghost"
            >
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default NewPageModal

const InputTitle = ({ setNewPage }) => {
  const handleTitleChange = (e) => {
    setNewPage((prev) => ({ ...prev, title: e.target.value }))
  }
  return <Input placeholder="Título" onChange={handleTitleChange} />
}

const InputDescription = ({ setNewPage }) => {
  const handleDescriptionChange = (e) => {
    setNewPage((prev) => ({ ...prev, description: e.target.value }))
  }
  return (
    <Flex pt="2">
      <Input
        placeholder="Descripción (opcional)"
        onChange={handleDescriptionChange}
      />
    </Flex>
  )
}

const InputEmoji = ({ newPage, setNewPage }) => {
  const { onOpen, onClose, isOpen } = useDisclosure()
  const firstFieldRef = useRef(null)

  const onEmojiSelection = (emoji) => {
    setNewPage((prev) => ({ ...prev, emoji: emoji }))
    onClose()
  }

  return (
    <Popover
      placement="bottom-start"
      isOpen={isOpen}
      initialFocusRef={firstFieldRef}
      onOpen={onOpen}
      onClose={onClose}
    >
      <PopoverTrigger>
        <Button mt="2">
          <HStack>
            <Text>Emoji</Text>
            <Text>
              {newPage.emoji} <ChevronDownIcon />
            </Text>
          </HStack>
        </Button>
      </PopoverTrigger>
      <PopoverContent w="330px">
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          <Flex w="full" flexWrap="wrap">
            {selectEmojis().map((emoji, index) => {
              return (
                <Flex
                  key={index}
                  cursor="pointer"
                  p="2"
                  _hover={{ bg: '#ffddee06' }}
                  onClick={() => onEmojiSelection(emoji)}
                >
                  <Text fontSize="20px">{emoji}</Text>
                </Flex>
              )
            })}
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

const InputCategories = ({ newPage, setNewPage }) => {
  const { onOpen, onClose, isOpen } = useDisclosure()
  const firstFieldRef = useRef(null)

  const onCategorySelection = (category) => {
    setNewPage((prev) => ({ ...prev, category: category }))
    onClose()
  }

  const categories = [
    'fullstack',
    'frontend',
    'backend',
    'javascript',
    'python',
    'react',
    'django',
    'apis',
    'databases',
    'deployment',
    'programación',
  ]
  return (
    <Popover
      placement="bottom-start"
      isOpen={isOpen}
      initialFocusRef={firstFieldRef}
      onOpen={onOpen}
      onClose={onClose}
    >
      <PopoverTrigger>
        <Button mt="2">
          <HStack>
            <Text>
              Categoría{' '}
              {newPage.category &&
                `: ${newPage.category.replace(/^\w/, (c) => c.toUpperCase())}`}
            </Text>
            <Text>
              <ChevronDownIcon />
            </Text>
          </HStack>
        </Button>
      </PopoverTrigger>
      <PopoverContent w="330px">
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader px="2">
          Elije la categoría que mejor se ajuste a tu página
        </PopoverHeader>
        <PopoverBody>
          <Flex w="full" flexWrap="wrap">
            {categories.map((category, index) => {
              return (
                <Flex
                  key={index}
                  cursor="pointer"
                  p="2"
                  align="center"
                  justify="center"
                  borderRadius="sm"
                  _hover={{ bg: '#ffddee06' }}
                  onClick={() => onCategorySelection(category)}
                >
                  <Text fontSize="16px">{category}</Text>
                </Flex>
              )
            })}
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
