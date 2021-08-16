import { useEffect, useState } from 'react'
import { Container, Box, VStack, Flex } from '@chakra-ui/react'
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

import SearchField from './Sidebar/SearchField'
import MainLoading from '../loading/MainLoading'
import EmptyScreen from './EmptyScreen'
import PopularTopics from './Sidebar/PopularTopics'
import MostLiked from './Sidebar/MostLiked'
import Newsletter from './Sidebar/Newsletter'

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
        <Flex minH="90vh" w="full" direction={{ base: 'column', lg: 'row' }}>
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
            pt={{ base: 0, lg: 10 }}
            pr={{ base: 0, lg: 10 }}
            minH="90vh"
            minW={{ base: 'full', lg: '20rem', xl: '25rem' }}
          >
            <SearchField />
            <PopularTopics />
            <Newsletter />

            <MostLiked />
          </VStack>
        </Flex>
      </Container>
    </>
  )
}

export default BlogLayout
