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
  selectSearching,
  setPosts,
  setLoading,
  selectSearchQueryValue,
} from './blogSlice'
import SearchField from './SearchField'
import MainLoading from '../loading/MainLoading'
import EmptyScreen from './EmptyScreen'

const BlogLayout = () => {
  const dispatch = useDispatch()
  const currentPaginatorPage = useSelector(selectCurrentPaginatorPage)
  const posts = useSelector(selectPosts)
  const loading = useSelector(selectPostsLoading)
  const isSearching = useSelector(selectSearching)
  const search_query = useSelector(selectSearchQueryValue)

  const fetchBlogPosts = async (currentPaginatorPage, search_query) => {
    const url = isSearching
      ? `${API_BASE_URL}/blog/search/${search_query}?page=${currentPaginatorPage}`
      : `${API_BASE_URL}/blog/posts/?page=${currentPaginatorPage}`
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
    fetchBlogPosts(currentPaginatorPage, search_query)
  }, [currentPaginatorPage])

  return (
    <>
      <Navbar />
      <Container maxW="container.xl">
        <HStack minH="90vh" w="full" alignItems="flex-start">
          {/* POST LIST */}
          <Box minH="80vh" minW="30vh" flex={1}>
            {loading ? (
              <MainLoading />
            ) : posts.results.length > 0 ? (
              posts.results.map((post) => (
                <article key={post.id}>
                  <BlogPost post={post} />
                </article>
              ))
            ) : (
              <EmptyScreen />
            )}
            {loading ? '' : <Paginator posts={posts} />}
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
                    <Link href={`/blog/?search=${topic}`}>
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
  'javascript',
  'nextjs',
  'django',
  'react',
  'nodejs',
]

export default BlogLayout
