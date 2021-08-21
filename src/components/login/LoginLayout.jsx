import React from 'react'
import Navbar from '../navbar/NavApp'
import Footer from '../footer/FooterLayout'
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
      <Footer />
    </>
  )
}

export default LoginLayout
