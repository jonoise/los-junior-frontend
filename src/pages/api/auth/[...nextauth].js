import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import {
    API_BASE_URL
} from '../../../constants'

export default (req, res) => NextAuth(req, res, {
    providers: [
        // Providers.Facebook({
        //   clientId: process.env.FACEBOOK_ID,
        //   clientSecret: process.env.FACEBOOK_SECRET
        // }),
        // Providers.Google({
        //   clientId: process.env.GOOGLE_ID,
        //   clientSecret: process.env.GOOGLE_SECRET
        // })
        Providers.GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        })
    ],

    callbacks: {
        async signIn(user, account, profile) {
            try {
                // Defining the githubUser object
                let githubUser = {
                    id: profile.id,
                    username: profile.login,
                    name: profile.name,
                    image: user.image,
                    access_token: account.access_token
                }

                const res = await fetch(`https://api.github.com/user/emails`, {
                    headers: {
                        "Authorization": `token ${account.access_token}`,
                        "accept": "application/vnd.github.v3+json"
                    }
                })
                const data = await res.json()
                const email = data[0].email
                githubUser = {
                    ...githubUser,
                    email: email
                }

                const fetchURL = `${API_BASE_URL}/accounts/callback/github/`
                const tokenRes = await fetch(fetchURL, {
                    method: 'POST',
                    body: JSON.stringify(githubUser),
                    headers: {
                        "content-type": "application/json",
                        "accept": "application/json"
                    }
                })
                const backend_data = await tokenRes.json()
                const {
                    id,
                    tokens
                } = backend_data
                user.profile = githubUser
                user.profile.id = id
                user.profile.refreshToken = tokens.refresh
                user.profile.accessToken = tokens.access
                return true
            } catch (error) {
                console.log("Sign in error: ", error)
            }
        },
        async jwt(token, user, account, profile) {
            if (user) {
                token = {
                    ...user.profile
                }
            }
            return token
        },
        async session(session, token) {
            session.user.id = token.id
            session.user.image = token.image
            session.user.username = token.username
            session.token = {
                access: token.accessToken,
                refresh: token.refreshToken
            }
            return session
        },
        async redirect(url, baseUrl) {
            return Promise.resolve('/?message=fgrGrkn24hsDbC')

        }
    }
})