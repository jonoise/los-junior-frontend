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
const MainFrame = () => {
  return (
    <Stack h="full" w="full">
      {/* ACTIVITY */}
      <Flex h="full" w="full" direction="column">
        <Flex bg="beige" h="50%">
          <Text>PARARAPÁ</Text>
        </Flex>

        <Flex bg="firebrick" h="50%">
          <Text>PARARAPÁ</Text>
        </Flex>
      </Flex>
    </Stack>
  )
}

export default MainFrame
