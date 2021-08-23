import { theme, extendTheme } from '@chakra-ui/react'

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

export const customChakraTheme = extendTheme({
  config,
})
