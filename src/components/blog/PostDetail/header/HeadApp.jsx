import React from 'react'
import Head from 'next/head'
import { LOGO_URL } from '../../../../constants'

function HeadApp(props) {
  const { title, thumbnail, abstract, slug } = props.post
  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href={`${LOGO_URL}`} />
      <meta property="og:title" content={title} />
      <meta property="og:type" content="article" />
      <meta
        property="og:url"
        content={`https://losjunior.co/blog/post/${slug}`}
      />

      <meta property="og:description" content={abstract} />
      <meta
        property="og:image"
        content="https://user-images.githubusercontent.com/71573508/130300903-ffa07af8-98fd-47cb-9f98-66b10afcedcf.png"
      />
    </Head>
  )
}

export default HeadApp
