import { Button, Flex, Input, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { API_BASE_URL } from '../../constants'
import {
  setLoading,
  setPosts,
  setCurrentPaginatorPage,
  setSearching,
  setSearchQueryValue,
  selectCurrentPaginatorPage,
} from './blogSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'

const SearchField = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const currentPaginatorPage = useSelector(selectCurrentPaginatorPage)

  const searchFormSubmitHandler = async (e) => {
    e.preventDefault()
    const urlParams = new URLSearchParams(window.location.search)
    const searchValue = urlParams.get('search') || ''

    dispatch(setSearching(true))
    dispatch(setLoading(true))

    if (searchValue.length < 1) {
      const res = await fetch(`${API_BASE_URL}/blog/posts/`, {
        method: 'GET',
      })
      const data = await res.json()
      dispatch(setSearching(false))
      dispatch(setCurrentPaginatorPage(1))
      dispatch(setPosts(data))
      dispatch(setLoading(false))
    } else {
      const res = await fetch(
        `${API_BASE_URL}/blog/search/${searchValue}?page=${currentPaginatorPage}`,
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

  const handleSearchChange = (e) => {
    console.log(e.target.value)
    dispatch(setSearchQueryValue(e.target.value))

    if (e.target.value.length < 1) {
      window.history.replaceState(
        null,
        'Los Junior - Blog 🤓 - Searching',
        `/blog/`
      )
    } else {
      window.history.pushState(
        null,
        'Los Junior - Blog 🤓 - Searching',
        `/blog?search=${e.target.value}`
      )
    }
  }

  return (
    <Flex boxShadow="lg" p="6" w="full" alignItems="center" direction="column">
      <Text fontWeight="bold" fontSize="xl" my={2} color="teal.300">
        Busca un post 🤓
      </Text>
      <form onSubmit={searchFormSubmitHandler}>
        <Flex>
          <Input w="full" placeholder="Buscar" onChange={handleSearchChange} />
          <Button type="submit" right="0" zIndex="2">
            <FaSearch />
          </Button>
        </Flex>
      </form>
    </Flex>
  )
}

export default SearchField
