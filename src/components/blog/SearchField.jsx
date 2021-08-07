import { Button, Flex, Input, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { API_BASE_URL } from '../../constants'
import { setLoading, setPosts, setCurrentPaginatorPage } from './blogSlice'
import { useDispatch } from 'react-redux'
const SearchField = () => {
  const dispatch = useDispatch()
  const [searchValue, setSearchValue] = useState()
  const searchFormSubmitHandler = async (e) => {
    e.preventDefault()
    dispatch(setLoading(true))
    if (searchValue.length < 1) {
      const res = await fetch(`${API_BASE_URL}/blog/posts/`, {
        method: 'GET',
      })
      const data = await res.json()
      dispatch(setCurrentPaginatorPage(1))
      dispatch(setPosts(data))
      dispatch(setLoading(false))
    } else {
      const res = await fetch(
        `${API_BASE_URL}/blog/search/?query=${searchValue}`,
        {
          method: 'GET',
        }
      )
      const data = await res.json()
      dispatch(setCurrentPaginatorPage(1))
      dispatch(setPosts(data))
      dispatch(setLoading(false))
    }
  }

  return (
    <Flex boxShadow="lg" p="6" w="full" alignItems="center" direction="column">
      <Text fontWeight="bold" fontSize="xl" my={2} color="teal.300">
        Busca un post 🤓
      </Text>
      <form onSubmit={searchFormSubmitHandler}>
        <Flex>
          <Input
            w="full"
            placeholder="Buscar"
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Button type="submit" right="0" zIndex="2">
            <FaSearch />
          </Button>
        </Flex>
      </form>
    </Flex>
  )
}

export default SearchField
