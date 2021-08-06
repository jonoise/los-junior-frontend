import { Provider as NextAuthProvider } from 'next-auth/client'
import { Provider as ReduxProvider } from 'react-redux'
import { ChakraProvider } from '@chakra-ui/react'
import { store } from '../app/store'
import '../styles/globals.css'

const MyApp = ({ Component, pageProps }) => {
  return (
    <NextAuthProvider session={pageProps.session}>
      <ReduxProvider store={store}>
        <ChakraProvider>
          <Component {...pageProps} />{' '}
        </ChakraProvider>{' '}
      </ReduxProvider>{' '}
    </NextAuthProvider>
  )
}

export default MyApp
