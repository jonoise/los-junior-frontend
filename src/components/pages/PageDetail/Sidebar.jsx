import {
  Button,
  Flex,
  Text,
  VStack,
  Tooltip,
  Box,
  Image,
  Divider,
  Stack,
} from '@chakra-ui/react'
import React from 'react'
import { FaGraduationCap, FaQuestion } from 'react-icons/fa'
import MarkdownModal from './modals/MarkdownModal'
import TodoModal from './modals/TodoModal'
import GradesModal from './modals/GradesModal'

function Sidebar() {
  return (
    <VStack w="full" alignItems="center">
      <SidebarTop />
      <SidebarBody />
    </VStack>
  )
}

export default Sidebar

const SidebarTop = () => {
  return (
    <Stack transition=".2s ease">
      <Tooltip hasArrow placement="right" label="Hecho con 💗 by Los Junior.">
        <Image
          w="30px"
          src="https://user-images.githubusercontent.com/71573508/123221377-1eab8800-d48c-11eb-8a76-34a07a4ae62c.png"
        />
      </Tooltip>
      <Box borderBottom="1px solid" color="black" borderColor="#a5a5a5"></Box>
    </Stack>
  )
}

const SidebarBody = () => {
  return (
    <VStack w="full">
      <MarkdownModal />

      <TodoModal />

      <GradesModal />
      <Tooltip hasArrow label="Quiz" bg="white" color="black" placement="right">
        <Button p="0" m="0" size="sm" className="disableFocus">
          <FaQuestion />
        </Button>
      </Tooltip>
    </VStack>
  )
}
