import LoginLayout from '../components/login/LoginLayout'
import GenericHead from '../components/generichead/GenericHead'
function Login() {
  return (
    <>
      <GenericHead
        title={'Únete a Los Junior 🤩 - Haz login.'}
        description="Únete a Los Junior. Toma el camino del aprendiz, conviértete en desarrollador de software y hazte un nombre en la comunidad mientras aprendes cosas nuevas."
        type="login"
        url="https://losjunior.co/login/"
        image="https://user-images.githubusercontent.com/71573508/128595157-8d8bec29-8bf0-426a-aaf6-8ff1e1428cdf.png"
      />
      <LoginLayout />
    </>
  )
}

export default Login
