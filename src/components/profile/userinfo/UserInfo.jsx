import { Flex, VStack, Text, HStack, Tooltip, Button } from '@chakra-ui/react'
import {
  IoLogoFacebook,
  IoLogoGithub,
  IoLogoTwitter,
  IoLogoDribbble,
} from 'react-icons/io'
import InfoAvatar from './InfoAvatar'
import React from 'react'
import { mappingTech } from '../utils'
import { useSession } from 'next-auth/client'
import InfoNameAndTitle from './InfoNameAndTitle'
import InfoStack from './InfoStack'
function UserInfo({ profile }) {
  const { name, username, image, technologies, title } = profile
  const [session, loading] = useSession()

  return (
    <VStack p="5" w="full" h="full" spacing="5">
      <Flex h="full" w="full" direction="column" align="center" py="5">
        <InfoAvatar image={image} />
        <InfoNameAndTitle name={name} username={username} title={title} />

        <HStack spacing={5} mt="1">
          {linkList.map((item) => {
            return <StackIcon item={item} key={item.id} />
          })}
        </HStack>
        <VStack>
          <Text mt="6">My stack</Text>
          <InfoStack technologies={technologies} />
        </VStack>
      </Flex>
      <VStack h="full" w="full">
        {/* <Button
          w="full"
          type="submit"
          bg={'blue.400'}
          color={'white'}
          _hover={{
            bg: 'blue.500',
          }}
        >
          Agregar currículum
        </Button> */}
      </VStack>
    </VStack>
  )
}

const StackIcon = (props) => {
  return (
    <a target="_blank" href={props.item.url}>
      <Tooltip label={props.item.label} placement="bottom" cursor="pointer">
        <span>{props.item.icon}</span>
      </Tooltip>
    </a>
  )
}

export default UserInfo

const linkList = [
  {
    id: 'facebook',
    label: 'Facebook',
    icon: <IoLogoFacebook />,
    url: '',
  },
  {
    id: 'github',
    label: 'Github',
    icon: <IoLogoGithub />,
    url: '',
  },
  {
    id: 'twitter',
    label: 'Twitter',
    icon: <IoLogoTwitter />,
    url: '',
  },
  {
    id: 'dribbble',
    label: 'Dribbble',
    icon: <IoLogoDribbble />,
    url: '',
  },
]
