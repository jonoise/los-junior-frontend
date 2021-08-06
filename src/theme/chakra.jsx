import { theme, extendTheme } from '@chakra-ui/react'

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

export const customChakraTheme = extendTheme({
  config,
})
