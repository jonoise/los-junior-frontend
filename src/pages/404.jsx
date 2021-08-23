import { Link, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import Navbar from '../components/navbar/NavApp'
function error404() {
  return (
    <div>
      <Navbar />
      <div className="loadingContainer">
        <header className="loadingHeader">
          <img
            src="https://user-images.githubusercontent.com/71573508/123221377-1eab8800-d48c-11eb-8a76-34a07a4ae62c.png"
            className="loadingLogo"
            alt="logo"
          />
          <p>404! Nos hemos perdido🤖</p> <br />
          <p>
            Lo mejor será buscar un{' '}
            <Link href="/" color={useColorModeValue('red.400', 'teal.400')}>
              camino de regreso.
            </Link>{' '}
          </p>
        </header>
      </div>
    </div>
  )
}

export default error404
