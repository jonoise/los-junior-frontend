import { Box, Button, Flex, Text, useColorModeValue } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/client'
import { postIsLiked, fetchPostLikes } from './searchLike'
import Heart from './LikeHeart'
import HeartOffline from './LikeHearOffline'

function App({ post_id }) {
  const [likes, setLikes] = useState(null)
  const [isLiked, setIsLiked] = useState(null)
  const [likesNumber, setLikesNumber] = useState(0)
  const [session] = useSession()

  useEffect(() => {
    fetchPostLikes(post_id, setLikes, setLikesNumber)
  }, [post_id])

  useEffect(() => {
    const username = session && session.user.username
    if (username && likes) {
      const postLiked = postIsLiked(likes, username)
      setIsLiked(postLiked)
    }
  }, [session, likes])

  return (
    <>
      <Flex align="center">
        <Button
          bg={useColorModeValue('#EDF2F7', '#2D3748')}
          color={useColorModeValue('gray.900', 'white')}
        >
          <Text>{likesNumber}</Text>
        </Button>
        <Box
          w="0"
          h="0"
          borderTop="10px solid transparent"
          borderBottom="10px solid transparent"
          borderLeft={`10px solid ${useColorModeValue('#EDF2F7', '#2D3748')}`}
        />
        {!session ? (
          <HeartOffline />
        ) : (
          <>
            <Heart
              post_id={post_id}
              session={session}
              setLikes={setLikes}
              setLikesNumber={setLikesNumber}
              isLiked={isLiked}
            />
          </>
        )}
      </Flex>
    </>
  )
}

export default App
