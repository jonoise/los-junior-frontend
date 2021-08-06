import { selectPage, updateComponent } from '../../../../../app/pageSlice'
import { useSelector } from 'react-redux'
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Td,
  Tr,
  Th,
  TableCaption,
  Text,
  Flex,
} from '@chakra-ui/react'
import ComponentHandler from '../handler/ComponentHandler'
import Evaluation from './Evaluation'
import { HStack, Stack, VStack } from '@chakra-ui/react'

function GradeDraggable({ id, provided }) {
  const page = useSelector(selectPage)
  const gradeComponent = page.components[id]
  return (
    <>
      <Flex {...provided.draggableProps} ref={provided.innerRef} mb="2.5rem">
        {/* HANDLER/CRUD */}
        <ComponentHandler id={id} provided={provided} />
        {/* GRADE COMPONEN */}
        <Flex px="5" w="full" h="full" direction="column">
          <Text fontSize="2xl" fontWeight="bold" mb="5">
            Calificaciones: {gradeComponent.course}
          </Text>
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th>Evaluación</Th>
                <Th>Fecha Límite</Th>
                <Th>Nota</Th>
                <Th>Porcentaje</Th>
              </Tr>
            </Thead>
            <Tbody>
              {gradeComponent.evaluationsIds.map((eval_ID) => {
                const evaluation = gradeComponent.evaluations[eval_ID]
                return (
                  <Evaluation evaluation={evaluation} key={evaluation.id} />
                )
              })}
              <Tr>
                <Th borderRight="none" bg="#bdf3de">
                  Porcentaje final
                </Th>
                <Th bg="#bdf3de" borderRight="none" borderLeft="none"></Th>
                <Th bg="#bdf3de" borderRight="none" borderLeft="none"></Th>
                <Th bg="#bdf3de" borderLeft="none" isNumeric>
                  <Text fontWeight="bold" fontSize="x-large" color="green.800">
                    {gradeComponent.grade}
                  </Text>
                </Th>
              </Tr>
            </Tbody>
          </Table>
        </Flex>
      </Flex>
    </>
  )
}

export default GradeDraggable
