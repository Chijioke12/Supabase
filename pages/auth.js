import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useRouter } from 'next/router'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()

  async function signUp() {
    setMessage('Creating account...')
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) setMessage(error.message)
    else setMessage('Check your email for a confirmation link.')
  }

  async function signIn() {
    setMessage('Signing in...')
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setMessage(error.message)
    else router.push('/')
  }

  return (
    <div className="container">
      <h1>Sign up / Log in</h1>
      <div className="card">
        <label>Email</label>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" />
        <label>Password</label>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="password" />
        <div style={{display:'flex',gap:8,marginTop:8}}>
          <button onClick={signIn}>Log in</button>
          <button onClick={signUp}>Sign up</button>
        </div>
        {message && <p>{message}</p>}
      </div>
    </div>
  )
}
