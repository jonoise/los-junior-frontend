import GenericHead from '../components/generichead/GenericHead'
import HomeLayout from '../components/home/HomeLayout'
export default function Home() {
  return (
    <>
      <GenericHead
        title={'Home 🏡 - Bienvenido a Los Junior.'}
        description="Únete a Los Junior. Toma el camino del aprendiz, conviértete en desarrollador de software y hazte un nombre en la comunidad mientras aprendes cosas nuevas."
        type="home"
        url="https://losjunior.co"
        image="https://user-images.githubusercontent.com/71573508/128595157-8d8bec29-8bf0-426a-aaf6-8ff1e1428cdf.png"
      />
      <HomeLayout />
    </>
  )
}

export const getStaticPros = async () => {}
