import { HStack } from '@chakra-ui/react'
import { mappingTech } from '../utils'

const InfoStack = ({ technologies }) => {
  const techStack = mappingTech(technologies)
  return (
    <HStack spacing="6">
      {techStack
        ? techStack.map((tech) => {
            return <div key={tech.id}>{tech.icon}</div>
          })
        : ''}
    </HStack>
  )
}

export default InfoStack
