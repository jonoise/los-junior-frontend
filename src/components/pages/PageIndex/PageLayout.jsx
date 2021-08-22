import { useSession } from 'next-auth/client'
import Loading from '../../loading/MainLoading'
import Navbar from '../../navbar/NavApp'
import PageAnonymous from './PageAnonymous/PageAnonApp'
import PageAuthenticated from './PageAuthenticated/PageAuthApp'
import Footer from '../../footer/FooterLayout'

const PageLayout = () => {
  const [session, loading] = useSession()

  return (
    <>
      <Navbar />
      {loading && <Loading />}
      {!loading && !session && <PageAnonymous />}
      {!loading && session && <PageAuthenticated session={session} />}
      <Footer />
    </>
  )
}

export default PageLayout
