import React from 'react'
import SinglePost from '../../../components/blog/PostDetail/SinglePost'
import { API_BASE_URL } from '../../../constants'
function SinglePostApp(props) {
  return <SinglePost post={props.post} />
}

// ⦿ With this function we get a single post from Backend.
// ⦿ It is run at build time.
// ⦿ We can catch the params (in this case "slug", because thats the name of the file in brackets).
// ⦿ We get the slug from the params object.
export const getStaticProps = async ({ params }) => {
  const r = await fetch(`${API_BASE_URL}/blog/posts/${params.slug}`)
  const post = await r.json()

  if (post.detail === 'Not found.') {
    return {
      notFound: true,
    }
  }

  return {
    props: { post },
    revalidate: 15,
  }
}

export const getStaticPaths = async () => {
  const r = await fetch(`${API_BASE_URL}/blog/posts/next`)
  const posts = await r.json()
  const paths = posts.map((post) => ({
    params: {
      slug: post.slug,
    },
  }))
  return {
    paths,
    fallback: 'blocking',
  }
}

export default SinglePostApp
