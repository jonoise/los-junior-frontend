import {
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
  Tooltip,
} from '@chakra-ui/react'
import { FaRegQuestionCircle } from 'react-icons/fa'

function ShowTotalPercentageRow({ grade }) {
  return (
    <HStack id="tasks" align="center">
      {/* --> DUMMY INPUT <-- */}
      <InputGroup size="sm" opacity="0">
        <InputLeftAddon children={<FaRegQuestionCircle />} />
        <Input
          placeholder="Agrega una evaluación"
          name={`title`}
          opacity="0"
          _hover={{ cursor: 'default' }}
        />
      </InputGroup>

      {/* --> DUMMY INPUT <-- */}
      <InputGroup size="sm" opacity="0">
        <InputLeftAddon children={<FaRegQuestionCircle />} opacity="0" />
      </InputGroup>

      {/* --> PERCENTAGE INPUT <-- */}
      <InputGroup size="sm">
        <Flex
          p="3"
          align="center"
          justify="space-between"
          w="full"
          h="2rem"
          border="1px solid"
          borderColor="#E5EAEF"
          borderRadius="sm"
        >
          <Text>Porcentaje total:</Text> {grade || 0}
        </Flex>
      </InputGroup>

      {/* --> DUMMY INPUT <-- */}
      <InputGroup size="sm" opacity="0">
        <InputLeftAddon children={<FaRegQuestionCircle />} />
        <Input
          placeholder="Nota de la evaluación."
          name={`-points`}
          type="number"
          opacity="0"
          _hover={{ cursor: 'default' }}
        />
      </InputGroup>
    </HStack>
  )
}

export default ShowTotalPercentageRow
