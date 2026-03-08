'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createPartnerClient } from '@/lib/partners/supabase/client'

export default function AuthCallbackPage() {
  const router = useRouter()
  const supabase = createPartnerClient()

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Handle hash fragment (implicit flow) — #access_token=...
        const hash = window.location.hash
        if (hash && hash.includes('access_token')) {
          const params = new URLSearchParams(hash.substring(1))
          const access_token = params.get('access_token')
          const refresh_token = params.get('refresh_token')

          if (access_token && refresh_token) {
            const { error } = await supabase.auth.setSession({
              access_token,
              refresh_token
            })
            if (error) {
              router.replace('/partners?error=auth_failed')
              return
            }
            router.replace('/partners/dashboard')
            return
          }
        }

        // Handle PKCE flow — ?code=...
        const code = new URLSearchParams(window.location.search).get('code')
        if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code)
          if (error) {
            router.replace('/partners?error=auth_failed')
            return
          }
          router.replace('/partners/dashboard')
          return
        }

        // Handle error in hash
        const hashParams = new URLSearchParams(window.location.hash.substring(1))
        const error = hashParams.get('error_description')
        if (error) {
          router.replace(`/partners?error=${encodeURIComponent(error)}`)
          return
        }

        router.replace('/partners?error=auth_failed')
      } catch {
        router.replace('/partners?error=auth_failed')
      }
    }

    handleCallback()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f4f6f9'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '4px solid #ff5e00',
          borderTopColor: 'transparent',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
          margin: '0 auto 16px'
        }} />
        <p style={{ color: '#102a4c', fontWeight: 600 }}>Verifying your account...</p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}
