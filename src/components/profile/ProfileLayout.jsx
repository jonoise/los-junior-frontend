import { Flex, Text } from '@chakra-ui/layout'
import Navbar from '../navbar/NavApp'
import UserActivity from './useractivity/UserActivity'
import UserInfo from './userinfo/UserInfo'
const ProfileLayout = ({ profile }) => {
  return (
    <>
      <Navbar />
      <Flex
        w="full"
        minH="90vh"
        p={{ base: 2, sm: 4, md: 5, '2xl': 10 }}
        direction={{ base: 'column', lg: 'row' }}
      >
        {/* SIDEBAR -> USERINFO */}
        <Flex
          minH="full"
          minW={{ base: 'full', sm: 'xs', xl: 'sm' }}
          maxW={{ base: 'full', lg: 'xs', xl: 'sm' }}
          direction="column"
        >
          <UserInfo profile={profile} />
        </Flex>

        {/* USER ACTIVITY */}
        <Flex w="full" minH="full">
          <UserActivity profile={profile} />
        </Flex>
      </Flex>
    </>
  )
}

export default ProfileLayout
