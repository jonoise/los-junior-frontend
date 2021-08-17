import { Flex, Text, useColorModeValue } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { setSearching, setSearchQueryValue } from '../../../blog/blogSlice'
import { useRouter } from 'next/router'

const ListDisplay = (props) => {
  const { title, list, blogSearch } = props
  return (
    <Flex
      direction="column"
      w="full"
      h="full"
      justify="center"
      align="center"
      p="2"
      border="1px solid"
    >
      <Text>{title}</Text>
      {list.map((obj) => {
        return (
          <SingleObjectInline obj={obj} key={obj.id} blogSearch={blogSearch} />
        )
      })}
    </Flex>
  )
}

export default ListDisplay

const SingleObjectInline = ({ obj, blogSearch }) => {
  const dispatch = useDispatch()
  const router = useRouter()

  const setSearchToTrue = (search_query) => {
    dispatch(setSearching(true))
    dispatch(setSearchQueryValue(search_query))
    router.push(`${obj.url}`)
  }

  const passSearchBlog = () => {
    return
  }

  return (
    <Flex
      onClick={blogSearch ? () => setSearchToTrue(obj.title) : passSearchBlog}
      px="2"
      py="1"
      bg={useColorModeValue('gray.200', 'gray.900')}
      borderRadius="4"
      cursor="pointer"
      w="full"
      my="1"
      transition=".4s all"
      _hover={{
        bg: useColorModeValue('gray.400', 'gray.700'),
      }}
    >
      <Text p="-0.5" fontSize={{ base: 'xs', md: 'xx-small' }}>
        {obj.title}
      </Text>
    </Flex>
  )
}
