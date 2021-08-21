import React from 'react'
import { Container, Flex } from '@chakra-ui/react'
import Navbar from '../../navbar/NavApp'
import SinglePostHeader from './SinglePostHeader'
import SinglePostBody from './SinglePostBody'
import Actions from '../../actions/ActionsApp'
import HeadApp from './header/HeadApp'
function SinglePost({ post }) {
  const { id, author, title, content, abstract, type_of } = post
  return (
    <>
      <HeadApp post={post} />
      <Navbar />

      <Container
        maxW="container.md"
        minH="90vh"
        py="2rem"
        className="POST-BODY"
        key={id}
      >
        <SinglePostHeader title={title} author={author} />
        <SinglePostBody abstract={abstract} content={content} />

        {/* POST ACTIONS */}
        <Flex
          position={['inherit', 'inherit', 'fixed']}
          bottom={['0', '0', '3rem']}
          right={['0', '0', '5rem', '5rem', '7rem']}
        >
          <Actions object_id={id} type_of={type_of} />
        </Flex>
      </Container>
    </>
  )
}

export default SinglePost
