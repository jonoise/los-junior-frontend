import {
  Flex,
  Stack,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react'
import UserActivityOverview from './Overview/UserActivityOverview'
const UserActivity = ({ profile }) => {
  return (
    <Tabs w="full">
      <TabList>
        <Tab className="disableFocus">Overview</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <UserActivityOverview profile={profile} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default UserActivity
