import { useSession } from 'next-auth/client'
import Loading from '../loading/MainLoading'
import Navbar from '../navbar/NavApp'
import HomeAnonymous from './HomeAnonymous/HomeAnonApp'
import HomeAuthenticated from './HomeAuthenticated/HomeAuthApp'

const HomeLayout = () => {
  const [session, loading] = useSession()
  return (
    <>
      <Navbar />
      {!loading && !session && <HomeAnonymous />}
      {!loading && session && <HomeAuthenticated />}
      {loading && <Loading />}
    </>
  )
}

export default HomeLayout
