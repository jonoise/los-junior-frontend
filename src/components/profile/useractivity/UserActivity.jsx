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
        <Tab className="disableFocus">Páginas</Tab>
        <Tab className="disableFocus">Posts</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <UserActivityOverview profile={profile} />
        </TabPanel>
        <TabPanel>
          <p>two!</p>
        </TabPanel>
        <TabPanel>
          <p>three!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default UserActivity
