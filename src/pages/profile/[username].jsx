import React from 'react'
import ProfileLayout from '../../components/profile/ProfileLayout'
import { API_BASE_URL } from '../../constants'

function Profile({ profile }) {
  return (
    <>
      <ProfileLayout profile={profile} />
    </>
  )
}

export default Profile

export const getServerSideProps = async ({ params }) => {
  try {
    const r = await fetch(`${API_BASE_URL}/accounts/${params.username}`)
    const profile = await r.json()

    if (profile.detail === 'Not found.') {
      return {
        notFound: true,
      }
    }
    return {
      props: { profile },
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}
