import { Avatar, AvatarBadge, Text, useColorModeValue } from '@chakra-ui/react'

const InfoAvatar = ({ image }) => {
  return (
    <Avatar
      my="2"
      size="2xl"
      src={image}
      border="5px solid"
      borderStartColor={useColorModeValue('gray.300', 'gray.700')}
      borderEndColor={useColorModeValue('gray.300', 'gray.700')}
      borderTopColor={useColorModeValue('gray.300', 'gray.700')}
      borderBottomColor={useColorModeValue('gray.300', 'gray.700')}
    >
      <AvatarBadge boxSize={9} borderWidth={4} bg="gray.900">
        <Text fontSize="1rem" color="white">
          👋
        </Text>
      </AvatarBadge>
    </Avatar>
  )
}

export default InfoAvatar
