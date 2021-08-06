import React from 'react'
import { Button, useColorMode } from '@chakra-ui/react'
import { FaMoon, FaSun } from 'react-icons/fa'

function ThemeButton() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <header>
      <Button onClick={toggleColorMode}>
        {colorMode === 'light' ? <FaMoon /> : <FaSun />}
      </Button>
    </header>
  )
}

export default ThemeButton
