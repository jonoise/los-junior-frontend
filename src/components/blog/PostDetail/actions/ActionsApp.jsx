import { Flex } from '@chakra-ui/react'
import CommentsApp from './comments/CommentApp'
import LikesApp from './likes/LikeApp'

function ActionsApp({ post_id }) {
  return (
    <>
      <Flex
        position={['inherit', 'inherit', 'fixed']}
        bottom={['0', '0', '3rem']}
        right={['0', '0', '5rem', '5rem', '7rem']}
        justify={[
          'space-between',
          'space-between',
          'space-between',
          'flex-start',
        ]}
      >
        <LikesApp post_id={post_id} />
        <CommentsApp post_id={post_id} />
      </Flex>
    </>
  )
}

export default ActionsApp
