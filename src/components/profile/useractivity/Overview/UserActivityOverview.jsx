import { Flex, VStack, Text } from '@chakra-ui/react'
import CountBox from './CountBox'
import TopFive from './TopFive'

const UserActivityOverview = ({ profile }) => {
  const { pagesCount, postsCount, postsTopFive } = profile
  return (
    // MAIN FRAME
    <Flex minH="70vh" w="full" direction={{ base: 'column', lg: 'row' }}>
      {/* POST COUNTER */}
      <VStack w={{ base: '100%', lg: '25%' }} minH="full" py="3" px="1">
        <CountBox
          title={'Posts Counter'}
          count={postsCount}
          description={'Posts publicados.'}
        />
        <TopFive title={'Post más gustados'} top_five={postsTopFive} />
      </VStack>

      {/* PAGES COUNTER */}
      <VStack w={{ base: '100%', lg: '25%' }} minH="full" py="3" px="1">
        <CountBox
          title={'Pages Counter'}
          count={pagesCount}
          description={'Páginas publicadas.'}
        />
        <TopFive title={'Post más gustados'} top_five={postsTopFive} />
      </VStack>

      {/* POST COUNTER */}
      <VStack w={{ base: '100%', lg: '25%' }} minH="full" py="3" px="1">
        <CountBox
          title={'Pages Counter'}
          count={pagesCount}
          description={'Páginas publicadas.'}
        />
        <TopFive title={'Post más gustados'} top_five={postsTopFive} />
      </VStack>

      {/* POST COUNTER */}
      <VStack w={{ base: '100%', lg: '25%' }} minH="full" py="3" px="1">
        <CountBox
          title={'Pages Counter'}
          count={postsCount}
          description={'Páginas publicadas.'}
        />
        <TopFive title={'Post más gustados'} top_five={postsTopFive} />
      </VStack>
    </Flex>
  )
}

export default UserActivityOverview
