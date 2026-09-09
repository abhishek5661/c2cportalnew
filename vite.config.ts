import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

function githubOAuthPlugin(mode: string): Plugin {
  const env = loadEnv(mode, process.cwd(), '')
  const githubClientId = env.VITE_GITHUB_CLIENT_ID
  const githubClientSecret = env.GITHUB_CLIENT_SECRET
  const linkedinClientId = env.VITE_LINKEDIN_CLIENT_ID
  const linkedinClientSecret = env.LINKEDIN_CLIENT_SECRET

  return {
    name: 'github-oauth-callback',
    configureServer(server) {
      server.middlewares.use('/api/auth/github/callback', async (request, response) => {
        const requestUrl = new URL(request.url || '/', 'http://localhost')
        const code = requestUrl.searchParams.get('code')
        const error = requestUrl.searchParams.get('error')
        const frontendUrl = '/onboarding/accounts'

        if (error || !code || !githubClientId || !githubClientSecret) {
          response.statusCode = 302
          response.setHeader('Location', `${frontendUrl}?provider=github&error=oauth_failed`)
          response.end()
          return
        }

        try {
          const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
            method: 'POST',
            headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({
              client_id: githubClientId,
              client_secret: githubClientSecret,
              code,
              redirect_uri: 'http://localhost:5174/api/auth/github/callback',
            }),
          })
          const token = await tokenResponse.json() as { access_token?: string }
          if (!token.access_token) throw new Error('GitHub token exchange failed')

          const headers = {
            Authorization: `Bearer ${token.access_token}`,
            Accept: 'application/vnd.github+json',
          }
          const [profileResponse, repositoriesResponse] = await Promise.all([
            fetch('https://api.github.com/user', { headers }),
            fetch('https://api.github.com/user/repos?per_page=100&sort=updated', { headers }),
          ])
          const profile = await profileResponse.json() as {
            login?: string
            name?: string
            avatar_url?: string
            followers?: number
          }
          const repositories = await repositoriesResponse.json() as Array<{ stargazers_count?: number }>
          const data = {
            username: profile.login || 'github-user',
            name: profile.name || profile.login || 'GitHub user',
            avatar: profile.avatar_url || '',
            repositories: repositories.length,
            followers: profile.followers || 0,
            stars: repositories.reduce((total, repository) => total + (repository.stargazers_count || 0), 0),
          }
          const encodedData = Buffer.from(JSON.stringify(data), 'utf8').toString('base64url')
          response.statusCode = 302
          response.setHeader('Location', `${frontendUrl}?provider=github&github_data=${encodedData}`)
          response.end()
        } catch {
          response.statusCode = 302
          response.setHeader('Location', `${frontendUrl}?provider=github&error=oauth_failed`)
          response.end()
        }
      })

      server.middlewares.use('/api/auth/linkedin/callback', async (request, response) => {
        const requestUrl = new URL(request.url || '/', 'http://localhost')
        const code = requestUrl.searchParams.get('code')
        const error = requestUrl.searchParams.get('error')
        const frontendUrl = '/onboarding/accounts'

        if (error || !code || !linkedinClientId || !linkedinClientSecret) {
          response.statusCode = 302
          response.setHeader('Location', `${frontendUrl}?provider=linkedin&error=oauth_failed`)
          response.end()
          return
        }

        try {
          const tokenResponse = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
              grant_type: 'authorization_code',
              code,
              client_id: linkedinClientId,
              client_secret: linkedinClientSecret,
              redirect_uri: 'http://localhost:5174/api/auth/linkedin/callback',
            }),
          })
          const token = await tokenResponse.json() as { access_token?: string }
          if (!token.access_token) throw new Error('LinkedIn token exchange failed')

          const profileResponse = await fetch('https://api.linkedin.com/v2/userinfo', {
            headers: { Authorization: `Bearer ${token.access_token}` },
          })
          const profile = await profileResponse.json() as {
            sub?: string
            name?: string
            email?: string
            picture?: string
          }
          if (!profile.sub) throw new Error('LinkedIn profile lookup failed')
          const data = {
            username: profile.email || profile.sub,
            name: profile.name || profile.email || 'LinkedIn user',
            email: profile.email || '',
            avatar: profile.picture || '',
          }
          const encodedData = Buffer.from(JSON.stringify(data), 'utf8').toString('base64url')
          response.statusCode = 302
          response.setHeader('Location', `${frontendUrl}?provider=linkedin&linkedin_data=${encodedData}`)
          response.end()
        } catch {
          response.statusCode = 302
          response.setHeader('Location', `${frontendUrl}?provider=linkedin&error=oauth_failed`)
          response.end()
        }
      })
    },
  }
}

export default defineConfig(({ mode }) => ({
  plugins: [react(), githubOAuthPlugin(mode)],
}))
