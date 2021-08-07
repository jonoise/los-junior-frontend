import {
  Button,
  Text,
  Textarea,
  useColorModeValue,
  VStack,
  useToast,
} from '@chakra-ui/react'
import { useSession } from 'next-auth/client'
import { useState } from 'react'
import { v4 as uuid_v4 } from 'uuid'
import axios from '../../../../../lib/axios'

function CommentInput({ post_id, setComments }) {
  const [content, setContent] = useState('')
  const [session] = useSession()
  const [disableSubmit, setDisableSumit] = useState(false)
  const toast = useToast()
  const handleSubmit = async (e) => {
    if (content.length === 0) {
      toast({
        id: 'commentInput',
        status: 'error',
        title: 'Rellena la caja de comentarios.',
        description: 'No puedes enviar comentarios vacíos.',
        duration: 4000,
      })
      return false
    }

    setDisableSumit(true)
    const uuid = uuid_v4()
    const newComment = Object.freeze({
      uuid,
      post_id,
      content: content.trim(),
    })
    const comment = await axios('POST', '/comments/', newComment, session)
    console.log('COMMENT #1: ', comment)
    setComments((prev) => {
      const newState = [comment.data, ...prev]
      return newState
    })
    setContent('')
    setDisableSumit(false)
  }

  const handleChange = (e) => {
    setContent(e.target.value)
  }

  return (
    <>
      <VStack minH="1rem" align={'flex-start'}>
        <Textarea
          value={content}
          onChange={handleChange}
          borderWidth="1px"
          borderColor={useColorModeValue('blue.300', 'gray.200')}
          h="full"
          w="full"
          maxH="full"
          placeholder="Agrega un comentario..."
          _placeholder={{ color: useColorModeValue('gray.500', 'yellow.100') }}
        ></Textarea>
        <Button
          disabled={disableSubmit}
          onClick={handleSubmit}
          fontSize={'sm'}
          fontWeight={600}
          color={'white'}
          bg={'green.400'}
          _hover={{
            bg: 'green.500',
          }}
        >
          Enviar
        </Button>
      </VStack>
    </>
  )
}

export default CommentInput
