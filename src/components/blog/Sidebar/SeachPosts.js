import {
    setLoading,
    setPosts,
    setCurrentPaginatorPage,
    setSearching,
    setSearchQueryValue,
    selectCurrentPaginatorPage,
} from './blogSlice'
import {
    useDispatch,
    useSelector
} from 'react-redux'
import {
    API_BASE_URL
} from '../../constants'

const SeachPosts = async (topic) => {
    const dispatch = useDispatch()
    const currentPaginatorPage = useSelector(selectCurrentPaginatorPage)

    const urlParams = new URLSearchParams(window.location.search)
    const searchValue = urlParams.get('search') || ''
    dispatch(setSearching(true))
    dispatch(setLoading(true))
    dispatch(setSearchQueryValue(topic))
    window.history.replaceState(
        null,
        'Los Junior - Blog 🤓 - Searching',
        `/blog?search=${topic}`
    )
    const res = await fetch(
        `${API_BASE_URL}/blog/search/${topic}?page=${currentPaginatorPage}`, {
            method: 'GET',
        }
    )
    const data = await res.json()
    dispatch(setCurrentPaginatorPage(1))
    dispatch(setPosts(data))
    dispatch(setLoading(false))
    return
}

export default SeachPosts