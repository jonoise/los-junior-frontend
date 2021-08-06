import React from 'react'
import { FaGithub } from 'react-icons/fa'
import { signIn } from 'next-auth/client'
import { Box, HStack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'

function GithubButton() {
  const { pathname } = useRouter()
  return (
    <>
      <Box onClick={() => signIn('github')}>
        <HStack
          py="1rem"
          borderRadius="md"
          cursor="pointer"
          bg={'green.400'}
          color={'white'}
          justify="center"
          transition=".3s"
          _hover={{
            bg: 'green.500',
          }}
        >
          {pathname === '/register' ? (
            <Text>Registrarme con Github</Text>
          ) : (
            <Text>Entra con Github</Text>
          )}
          <FaGithub />
        </HStack>
      </Box>
    </>
  )
}

export default GithubButton
