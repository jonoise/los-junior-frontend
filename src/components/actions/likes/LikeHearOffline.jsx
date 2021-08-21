import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Flex,
  Image,
  Heading,
  Text,
  Stack,
  Link,
  useColorModeValue,
} from '@chakra-ui/react'
import { FaHeart } from 'react-icons/fa'
const LikeHearOffline = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button mr="2" onClick={onOpen}>
        <FaHeart />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="5xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton className="disableFocus" />
          <ModalBody>
            <Flex direction={['column', 'column', 'row']}>
              <Image
                src="https://user-images.githubusercontent.com/71573508/128612088-be69febd-9da7-4a47-ad17-9ac06e1f8610.png"
                alt="Like Heart Login Invitation"
                w={{ sm: '100%', lg: '50%' }}
                borderRadius="10px"
              />
              <Stack
                w="full"
                h="full"
                py="5"
                px={{ sm: '5', lg: '10' }}
                direction="column"
              >
                <Heading>Debes iniciar sesión 😵</Heading>
                <Text color={useColorModeValue('black', 'aqua')}>
                  Ingresa con tu cuenta para dar like.
                </Text>
                <Text>
                  Para crearte una cuenta con nosotros sólo necesitarás ingresar
                  con tus credenciales de Github.
                </Text>
                <Text fontSize="sm">
                  - Crea tu cuenta{' '}
                  <Link className="disableFocus" href="/login" color="blue.500">
                    aquí
                  </Link>
                  .
                </Text>
                <Text fontSize="sm">
                  - Para más info dirígete a{' '}
                  <Link className="disableFocus" href="/faqs" color="blue.500">
                    FAQS
                  </Link>
                  .
                </Text>
              </Stack>
            </Flex>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default LikeHearOffline
