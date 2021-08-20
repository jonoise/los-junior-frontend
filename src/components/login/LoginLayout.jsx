import React from 'react'
import Navbar from '../navbar/NavApp'
import LoginForm from './LoginForm'
import LoginInfo from './LoginInfo'

function LoginLayout() {
  return (
    <>
      <Navbar />
      <section id="login-form">
        <LoginForm />
      </section>
      <section id="login-info">
        <LoginInfo />
      </section>
    </>
  )
}

export default LoginLayout
