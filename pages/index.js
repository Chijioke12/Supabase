import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Home() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const session = supabase.auth.getSession().then(r => {
      if (r?.data?.session) setUser(r.data.session.user)
    })
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => listener?.subscription?.unsubscribe?.()
  }, [])

  return (
    <div className="container">
      <h1>Next.js + Supabase Starter</h1>
      <div className="card">
        <p>This app includes email auth and avatar upload (Supabase Storage).</p>
        {!user && <p><Link href='/auth'><a>Sign up / Log in</a></Link></p>}
        {user && (
          <>
            <p>Signed in as <strong>{user.email}</strong></p>
            <p><Link href='/profile'><a>Edit profile</a></Link></p>
            <button onClick={async () => { await supabase.auth.signOut(); location.href='/' }}>Sign out</button>
          </>
        )}
      </div>
      <div className="card">
        <h3>Deploy</h3>
        <ol>
          <li>Upload this repo to GitHub using the web UI.</li>
          <li>Import repo to Vercel and set environment variables:</li>
        </ol>
        <pre>NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY</pre>
      </div>
    </div>
  )
}
