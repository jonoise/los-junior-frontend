import React from 'react'
import { Container } from '@chakra-ui/react'
import Navbar from '../../navbar/NavApp'
import SinglePostHeader from './SinglePostHeader'
import SinglePostBody from './SinglePostBody'
import Actions from './actions/ActionsApp'
import HeadApp from './header/HeadApp'
function SinglePost({ post }) {
  const { id, author, title, content, slug, comments, abstract, publish_date } =
    post
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
        <Actions post_id={id} />
      </Container>
    </>
  )
}

export default SinglePost
