import { Box, Flex, Text } from '@chakra-ui/react'
import {
  setLoading,
  setPosts,
  setCurrentPaginatorPage,
  setSearching,
  setSearchQueryValue,
  selectCurrentPaginatorPage,
} from '../blogSlice'
import { useDispatch, useSelector } from 'react-redux'
import { API_BASE_URL } from '../../../constants'

const PopularTopics = () => {
  const dispatch = useDispatch()
  const currentPaginatorPage = useSelector(selectCurrentPaginatorPage)

  const searchPosts = async (topic) => {
    const urlParams = new URLSearchParams(window.location.search)
    const searchValue = urlParams.get('search') || ''
    dispatch(setSearching(true))
    dispatch(setLoading(true))
    dispatch(setSearchQueryValue(topic))
    window.history.replaceState(
      null,
      'Los Junior - Blog 🤓 - Searching',
      `/blog?search=${topic}`
    )
    const res = await fetch(
      `${API_BASE_URL}/blog/search/${topic}?page=${currentPaginatorPage}`,
      {
        method: 'GET',
      }
    )
    const data = await res.json()
    dispatch(setCurrentPaginatorPage(1))
    dispatch(setPosts(data))
    dispatch(setLoading(false))
  }

  return (
    <Flex boxShadow="lg" p="6" w="full" alignItems="center" direction="column">
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
        {popularTopicsList.map((topic) => (
          <Box
            className="topic"
            key={topic}
            mx={3}
            onClick={() => searchPosts(topic)}
            className="disableFocus"
          >
            <Text cursor="pointer">{topic}</Text>
          </Box>
        ))}
      </Flex>
    </Flex>
  )
}

export default PopularTopics

const popularTopicsList = [
  'python',
  'javascript',
  'nextjs',
  'django',
  'react',
  'nodejs',
]
