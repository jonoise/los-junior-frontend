import { useEffect, useState } from 'react'
import {
  HStack,
  Container,
  Box,
  VStack,
  Flex,
  Text,
  Link,
} from '@chakra-ui/react'
import { API_BASE_URL } from '../../constants'
import Navbar from '../navbar/NavApp'
import BlogPost from './BlogPost'
import axios from 'axios'
import Paginator from '../paginator/PaginatorApp'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectPosts,
  selectPostsLoading,
  selectCurrentPaginatorPage,
  setPosts,
  setLoading,
} from './blogSlice'
import SearchField from './SearchField'

const BlogLayout = () => {
  const dispatch = useDispatch()
  const currentPaginatorPage = useSelector(selectCurrentPaginatorPage)
  const posts = useSelector(selectPosts)
  const loading = useSelector(selectPostsLoading)

  const fetchBlogPosts = async (currentPaginatorPage) => {
    const url = `${API_BASE_URL}/blog/posts/?page=${currentPaginatorPage}`
    const res = await axios.get(url, {
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
      },
    })
    const data = await res.data
    dispatch(setPosts(data))
    dispatch(setLoading(false))
  }

  useEffect(() => {
    window.scrollTo({
      behavior: 'smooth',
      top: 0,
      left: 0,
    })
    fetchBlogPosts(currentPaginatorPage)
  }, [currentPaginatorPage])

  return (
    <>
      <Navbar />
      <Container maxW="container.xl">
        <HStack minH="90vh" w="full" alignItems="flex-start">
          {/* POST LIST */}
          <Box minH="80vh" minW="30vh" flex={1}>
            {loading
              ? 'perate mijo'
              : posts.results.map((post) => (
                  <article key={post.id}>
                    <BlogPost post={post} />
                  </article>
                ))}
            {loading ? 'perate tantito' : <Paginator posts={posts} />}
          </Box>
          {/* SIDENAV */}
          <VStack
            pt={10}
            pr={10}
            minH="90vh"
            minW={{ base: '15rem', lg: '20rem', xl: '25rem' }}
            display={['none', 'none', 'flex']}
          >
            <SearchField />
            <Flex
              boxShadow="lg"
              p="6"
              w="full"
              alignItems="center"
              direction="column"
            >
              <Text fontWeight="bold" fontSize="xl" my={2} color="teal.300">
                Los más populares 😎
              </Text>
              <Flex
                wrap="wrap"
                maxW="15rem"
                minH="5rem"
                justifyContent="space-around"
                alignItems="center"
              >
                {popularTopics.map((topic) => (
                  <Box className="topic" key={topic} mx={3}>
                    <Link href={`/blog/tags/${topic}`}>
                      <Text cursor="pointer">{topic}</Text>
                    </Link>
                  </Box>
                ))}
              </Flex>
            </Flex>
          </VStack>
        </HStack>
      </Container>
    </>
  )
}

const popularTopics = [
  'python',
  'react',
  'nextjs',
  'django',
  'express',
  'nodejs',
]

export default BlogLayout
