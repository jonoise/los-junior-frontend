import { Box, HStack, Text, Button, Link } from '@chakra-ui/react'
import { signOut, useSession } from 'next-auth/client'
import React from 'react'

function LogoutButton() {
  const [session, loading] = useSession()
  return (
    <>
      {!loading && !session && ''}
      {!loading && session && (
        <Box onClick={() => signOut()}>
          <Button
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
            <Text>Logout</Text>
          </Button>
        </Box>
      )}
    </>
  )
}

export default LogoutButton
