import { Flex } from '@chakra-ui/react'
import CommentsApp from './comments/CommentApp'
import LikesApp from './likes/LikeApp'

function ActionsApp({ object_id, type_of }) {
  return (
    <>
      <Flex
        justify={[
          'space-between',
          'space-between',
          'space-between',
          'flex-start',
        ]}
      >
        <LikesApp object_id={object_id} type_of={type_of} />
        <CommentsApp object_id={object_id} type_of={type_of} />
      </Flex>
    </>
  )
}

export default ActionsApp
