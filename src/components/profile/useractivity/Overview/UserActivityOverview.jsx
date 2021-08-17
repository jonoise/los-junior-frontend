import { Flex, VStack, Text } from '@chakra-ui/react'
import CountBox from './CountBox'
import ListDisplay from './ListDisplay'
import TagSearchDisplay from './TagSearchDisplay'

const UserActivityOverview = ({ profile }) => {
  const { pagesCount, postsCount, postsTopFive, tagsMostUsed } = profile
  return (
    <Flex minH="70vh" w="full" direction={{ base: 'column', lg: 'row' }}>
      {/* POST COUNTER */}
      <VStack w={{ base: '100%', lg: '33%' }} minH="full" py="3" px="1">
        <CountBox
          title={'Posts Counter'}
          count={postsCount}
          description={'Posts publicados.'}
        />
        <TagSearchDisplay
          title={'Temas destacados 🌟'}
          list={tagsMostUsed}
          blogSearch={true}
        />
      </VStack>

      {/* PAGES COUNTER */}
      <VStack w={{ base: '100%', lg: '33%' }} minH="full" py="3" px="1">
        <CountBox
          title={'Pages Counter'}
          count={pagesCount}
          description={'Páginas creadas.'}
        />
      </VStack>

      {/* TAGS COUNTER */}
      <VStack w={{ base: '100%', lg: '33%' }} minH="full" py="3" px="1">
        <ListDisplay title={'Post más gustados'} list={postsTopFive} />
      </VStack>
    </Flex>
  )
}

export default UserActivityOverview
