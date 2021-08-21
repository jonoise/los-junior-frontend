import { Box, Flex, Link, Text, useColorModeValue } from '@chakra-ui/react'
import { useSession } from 'next-auth/client'

const NoComments = () => {
  const [session] = useSession()
  return (
    <Flex w="full" direction="column" justify="center" align="flex-start">
      <Box my="1">
        <Text color={useColorModeValue('#2a2a2aae', '#d3d3d3af')}>
          Aún nadie a comentado este post.
        </Text>
      </Box>
      {session ? (
        <Text
          color={useColorModeValue('#2a2a2aae', '#d3d3d3af')}
          fontSize="small"
        >
          Sé el primero en hacerlo.
        </Text>
      ) : (
        <Text
          color={useColorModeValue('#2a2a2aae', '#d3d3d3af')}
          fontSize="small"
        >
          <Link href="/login" color={useColorModeValue('blue.500', 'red.500')}>
            Entra con tu cuenta
          </Link>{' '}
          y sé el primero en comentar.
        </Text>
      )}
    </Flex>
  )
}

export default NoComments
