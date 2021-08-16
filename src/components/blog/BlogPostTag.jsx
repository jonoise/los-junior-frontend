import {
  setLoading,
  setPosts,
  setCurrentPaginatorPage,
  setSearching,
  setSearchQueryValue,
  selectCurrentPaginatorPage,
} from './blogSlice'
import { useDispatch, useSelector } from 'react-redux'
import { API_BASE_URL } from '../../constants'
import { Text } from '@chakra-ui/react'

const BlogPostTag = ({ tag }) => {
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
    <Text
      px={3}
      py={1}
      cursor="pointer"
      bg="gray.600"
      color="gray.100"
      fontSize={['10px', 'sm']}
      fontWeight="700"
      rounded="md"
      _hover={{ bg: 'gray.500' }}
      key={tag}
      onClick={() => searchPosts(tag)}
    >
      {tag}
    </Text>
  )
}

export default BlogPostTag
