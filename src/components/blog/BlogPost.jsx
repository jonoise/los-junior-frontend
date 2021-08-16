import React from 'react'
import {
  Flex,
  Box,
  chakra,
  useColorModeValue,
  Image,
  Link,
  Text,
  HStack,
  Avatar,
} from '@chakra-ui/react'
import dateStringify from '../../lib/dateStringify'
import BlogPostTag from './BlogPostTag'
function BlogPost({ post }) {
  return (
    <Flex
      p={[5, 5, 10]}
      w="full"
      alignItems="center"
      justifyContent="center"
      direction="column"
    >
      <Box
        px={8}
        py={4}
        rounded="lg"
        shadow="lg"
        bg={useColorModeValue('white', 'gray.800')}
        minW="full"
        maxW="2xl"
      >
        <Flex
          justifyContent="space-between"
          alignItems={['', 'center']}
          flexDirection={['column', 'row']}
        >
          <chakra.span
            fontSize="sm"
            color={useColorModeValue('gray.600', 'gray.400')}
          >
            Publicado el {dateStringify(post.published_date)}
          </chakra.span>
          <HStack>
            {post.tags.map((tag) => (
              <BlogPostTag tag={tag} key={tag} />
            ))}
          </HStack>
        </Flex>

        <Box mt={2}>
          <Link
            href={`/blog/post/${post.slug}`}
            color={useColorModeValue('gray.700', 'white')}
            fontWeight="700"
            className="disableFocus"
            _hover={{
              color: useColorModeValue('gray.600', 'gray.200'),
              textDecor: 'underline',
            }}
          >
            <Text fontSize="2xl">{post.title}</Text>
          </Link>
          <chakra.p mt={2} color={useColorModeValue('gray.600', 'gray.300')}>
            {post.abstract}
          </chakra.p>
        </Box>

        <Flex justifyContent="space-between" alignItems="center" mt={4}>
          <Link href={`/blog/post/${post.slug}`}>Leer +</Link>

          <Flex alignItems="center">
            <Avatar
              mx={4}
              w={8}
              h={8}
              fit="cover"
              display={['none', 'inherit']}
              src={post.author.image}
              alt="Post author profile image"
              name={post.author.name}
            />
            <Link
              href={`/profile/${post.author.username}`}
              color={useColorModeValue('gray.700', 'gray.200')}
              fontWeight="700"
              cursor="pointer"
            >
              {post.author.name ? post.author.name : post.author.username}
            </Link>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  )
}

export default BlogPost
