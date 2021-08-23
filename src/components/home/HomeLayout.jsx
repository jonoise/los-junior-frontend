import { useSession } from 'next-auth/client'
import Loading from '../loading/MainLoading'
import Navbar from '../navbar/NavApp'
import Footer from '../footer/FooterLayout'
import HomeAnonymous from './HomeAnonymous/HomeAnonApp'
import HomeAuthenticated from './HomeAuthenticated/HomeAuthApp'

const HomeLayout = () => {
  const [session, loading] = useSession()
  return (
    <>
      <Navbar />
      {!loading && !session && <HomeAnonymous />}
      {/* {!loading && session && <HomeAuthenticated />} */}
      {!loading && session && <HomeAnonymous />}
      {loading && <Loading />}
      <Footer />
    </>
  )
}

export default HomeLayout
