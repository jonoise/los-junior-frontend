import React from 'react'
import { chakra, Flex, useColorModeValue } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectCurrentPaginatorPage,
  setCurrentPaginatorPage,
} from '../blog/blogSlice'

const PaginatorApp = ({ posts }) => {
  // ACTUAL VALUES IN THE PAGINATOR
  const { total, per_page, page_num, prev, next } = posts.paginator

  const totalPages = (total, per_page) => {
    const totalPages = Math.ceil(total / per_page)
    const newPages = totalPages < 5 ? totalPages : 5
    const pages = []
    for (let i = 0; i < newPages; i++) {
      pages.push(i + 1)
    }
    if (length > 5) {
    }
    return pages
  }

  return (
    <Flex p={50} w="full" alignItems="center" justifyContent="center">
      {/* IF NOT POSTS, it DOES NOT display the paginator */}
      {posts.results.length < 1 ? (
        ''
      ) : (
        <Flex>
          {prev ? (
            <PagButton dis={false}>ant</PagButton>
          ) : (
            <PagButton disabled dis={true}>
              ant
            </PagButton>
          )}
          {totalPages(total, per_page).map((page) =>
            page == page_num ? (
              <PagButton active key={page}>
                {page}
              </PagButton>
            ) : (
              <PagButton key={page}>{page}</PagButton>
            )
          )}
          {next && page_num < 5 ? (
            <PagButton dis={false}>sig</PagButton>
          ) : (
            <PagButton disabled dis={true}>
              sig
            </PagButton>
          )}
        </Flex>
      )}
    </Flex>
  )
}

const PagButton = (props) => {
  const dispatch = useDispatch()
  const currentPage = useSelector(selectCurrentPaginatorPage)
  const activeStyle = {
    bg: useColorModeValue('gray.600', 'gray.500'),
    color: useColorModeValue('white', 'gray.200'),
  }

  const handleClick = (selectedPage) => {
    if (selectedPage === 'sig') {
      dispatch(setCurrentPaginatorPage(currentPage + 1))
      return
    }
    if (selectedPage === 'ant') {
      dispatch(setCurrentPaginatorPage(currentPage - 1))
      return
    }
    dispatch(setCurrentPaginatorPage(selectedPage))
  }

  return (
    <chakra.button
      mx={1}
      px={[2, 4]}
      py={[1, 2]}
      onClick={() => handleClick(props.children)}
      rounded="md"
      disabled={props.dis}
      bg={useColorModeValue('gray.300', 'gray.800')}
      color={useColorModeValue('gray.700', 'gray.200')}
      opacity={props.disabled && 0.6}
      _hover={!props.disabled && activeStyle}
      cursor={props.disabled && 'not-allowed'}
      {...(props.active && activeStyle)}
    >
      {props.children}
    </chakra.button>
  )
}

export default PaginatorApp
