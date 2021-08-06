import { Button, Textarea, useColorModeValue, VStack } from '@chakra-ui/react'
import React from 'react'

function CommentInputDisable() {
  return (
    <>
      <VStack minH="2rem" align={'flex-start'}>
        <Textarea
          isDisabled
          minH="5em"
          w="full"
          border="1px solid"
          borderColor={useColorModeValue('black', 'gray.400')}
          placeholder="Necesitas iniciar sesión para comentar"
          _placeholder={{ color: useColorModeValue('red', 'gray.200') }}
        ></Textarea>
        <Button
          isDisabled
          bg={useColorModeValue('red', 'gray.600')}
          color={useColorModeValue('white', 'white')}
          _hover={{ color: 'white' }}
        >
          Enviar
        </Button>
      </VStack>
    </>
  )
}

export default CommentInputDisable
