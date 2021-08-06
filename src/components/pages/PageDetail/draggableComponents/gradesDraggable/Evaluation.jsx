import { Flex, HStack, Text, Td, Tr } from '@chakra-ui/react'
import { useEffect } from 'react'

const Evaluation = ({ evaluation }) => {
  const { title, dueDate, points, percentage, maxPercentage } = evaluation

  return (
    <>
      <Tr>
        <Td>{title}</Td>
        <Td>{dueDate}</Td>
        <Td isNumeric>{points || 'Sin nota'}</Td>
        <Td isNumeric>{percentage || maxPercentage}</Td>
      </Tr>
    </>
  )
}

export default Evaluation
