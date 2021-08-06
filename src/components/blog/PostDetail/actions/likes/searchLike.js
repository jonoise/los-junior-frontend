import axios from 'axios'
import {
    API_BASE_URL
} from '../../../../../constants'


export const fetchPostLikes = async (post_id, setLikes, setLikesNumber) => {
    const res = await axios.get(`${API_BASE_URL}/likes/?post_id=${post_id}`, {
        headers: {
            'content-type': 'application/json',
            accept: 'application/json',
        },
    })
    const likes = await res.data

    setLikes(likes)
    setLikesNumber(likes.length)
}

export const postIsLiked = (likes, username) => {
    let isActive = false
    for (let i = 0; i < likes.length; i++) {
        if (likes[i]['owner']['username'] === username) {
            isActive = true
            return isActive
        }
    }
    return isActive
}