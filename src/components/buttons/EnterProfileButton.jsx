import { useSession } from 'next-auth/client'
import { Button, Link } from '@chakra-ui/react'
import React from 'react'

function EnterProfileButton() {
  const [session, loading] = useSession()
  return (
    <>
      {!loading && !session && (
        <Button
          as={'a'}
          fontSize={'sm'}
          fontWeight={600}
          color={'white'}
          bg={'green.400'}
          href={'/login'}
          _hover={{
            bg: 'green.500',
          }}
        >
          Entrar
        </Button>
      )}
      {!loading && session && (
        <Link href={`/profile/${session.user.username}`}>
          <Button
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg={'green.400'}
            _hover={{
              bg: 'green.500',
            }}
          >
            Perfil
          </Button>
        </Link>
      )}
    </>
  )
}

export default EnterProfileButton
