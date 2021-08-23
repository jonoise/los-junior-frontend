import { Provider as NextAuthProvider } from 'next-auth/client'
import { Provider as ReduxProvider } from 'react-redux'
import { ChakraProvider } from '@chakra-ui/react'
import { store } from '../app/store'
import '../styles/globals.css'
import { customChakraTheme } from './../theme/chakra'

const MyApp = ({ Component, pageProps }) => {
  return (
    <NextAuthProvider session={pageProps.session}>
      <ReduxProvider store={store}>
        <ChakraProvider theme={customChakraTheme}>
          <Component {...pageProps} />{' '}
        </ChakraProvider>{' '}
      </ReduxProvider>{' '}
    </NextAuthProvider>
  )
}

export default MyApp
