import { Box, Flex, Link, Text, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { API_BASE_URL } from '../../../constants'

const MostLiked = () => {
  const [mostLikedPosts, setMostLikedPosts] = useState([])

  useEffect(() => {
    const fetchMostLiked = async () => {
      const res = await fetch(`${API_BASE_URL}/blog/posts/most-liked/`)
      const data = await res.json()
      setMostLikedPosts(data)
    }
    fetchMostLiked()
  }, [])

  return (
    <>
      <Flex
        boxShadow="lg"
        p="6"
        w="full"
        alignItems="center"
        direction="column"
      >
        <Text fontWeight="bold" fontSize="xl" my={2} color="teal.300">
          Los más gustados 😍
        </Text>
        <VStack direction="column" maxW="15rem" minH="5rem" align="flex-start">
          {mostLikedPosts.map((post) => {
            return (
              <Link href={`blog/post/${post.slug}`} key={post.id}>
                <Text fontSize="xs">{`♦ ${post.title}`}</Text>
              </Link>
            )
          })}
        </VStack>
      </Flex>
    </>
  )
}

export default MostLiked
