import React, { useState, useEffect, useRef } from 'react'
import { FaComment } from 'react-icons/fa'
import { API_BASE_URL } from '../../../../../constants'
import axios from 'axios'
import {
  Avatar,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  Input,
  Text,
  Textarea,
  useColorModeValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { useSession } from 'next-auth/client'
import Comment from './Comment'
import CommentInput from './CommentInput'
import CommentInputDisabled from './CommentInputDisable'

function CommentApp({ post_id }) {
  const [comments, setComments] = useState(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [session, loading] = useSession()
  const toggleCommentsRef = useRef()

  const fetchPostComments = async (post_id) => {
    const url = `${API_BASE_URL}/comments/?post_id=${post_id}`
    const res = await axios.get(url)
    const data = await res.data
    setComments(data)
  }

  useEffect(() => {
    fetchPostComments(post_id)
  }, [post_id])
  return (
    <>
      <Button onClick={onOpen} ref={toggleCommentsRef}>
        <FaComment />
      </Button>
      <Drawer
        size="md"
        isOpen={isOpen}
        placement={{ base: 'bottom' }}
        onClose={onClose}
        finalFocusRef={toggleCommentsRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Comentarios</DrawerHeader>

          <DrawerBody
            css={{
              '&::-webkit-scrollbar': {
                width: '4px',
              },
              '&::-webkit-scrollbar-track': {
                background: '#E2FA61',
                width: '6px',
                borderRadius: '24px',
              },
              '&::-webkit-scrollbar-thumb': {
                height: 'xs',
                background: '#171923',
                borderRadius: '24px',
              },
            }}
          >
            {session ? (
              <CommentInput setComments={setComments} post_id={post_id} />
            ) : (
              <CommentInputDisabled />
            )}

            {comments && (
              <VStack py="5">
                {comments.map((comment) => (
                  <Comment comment={comment} key={comment.uuid} />
                ))}
              </VStack>
            )}
          </DrawerBody>
          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default CommentApp