import { Button } from '@chakra-ui/react'
import React from 'react'
import { FaHeart } from 'react-icons/fa'
import axios from '../../../lib/axios'

function LikeHeart({
  object_id,
  setLikes,
  setLikesNumber,
  session,
  isLiked,
  type_of,
}) {
  const performUnlike = async (object_id) => {
    // Sacamos el like de la lista de likes filtrando por owner.username
    setLikes((prev) => {
      return prev.filter(
        (like) => like.owner.username !== session.user.username
      )
    })
    // Disminuir el número de likes por 1
    setLikesNumber((prev) => {
      return prev - 1
    })

    // Old Like es el object_id
    const oldLike = {
      object_id,
    }

    try {
      await axios('DELETE', '/likes/', oldLike, session)
    } catch (err) {
      console.error(err)
    }
  }

  const performLike = async (object_id, setLikes, setLikesNumber, type_of) => {
    setLikes((prev) => {
      // Inserted serialized form of the like object to the current likes state (the state is an array)
      return [...prev, { owner: { username: session.user.username } }]
    })

    setLikesNumber((prev) => {
      return prev + 1
    })

    const newLike = {
      object_id,
    }

    try {
      const res = await axios('POST', '/likes/', newLike, session)

      const data = await res.data
      console.log('server response: ', data)
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <>
      {isLiked ? (
        <Button mr="2" onClick={() => performUnlike(object_id)}>
          <FaHeart color="red" />
        </Button>
      ) : (
        <Button
          mr="2"
          onClick={() => performLike(object_id, setLikes, setLikesNumber)}
        >
          <FaHeart />
        </Button>
      )}
    </>
  )
}

export default LikeHeart
