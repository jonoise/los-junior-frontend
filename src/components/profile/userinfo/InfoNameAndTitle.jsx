import { Text } from '@chakra-ui/react'
import { useSession } from 'next-auth/client'

const InfoName = ({ name, username, title }) => {
  const [session, loading] = useSession()
  return (
    <>
      <Text>{name ? name : username}</Text>
      <Text as="i" color="gray.500">
        {title}
      </Text>
    </>
  )
}

export default InfoName
