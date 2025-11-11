import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Profile() {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState({ full_name: '', avatar_url: '' })
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession()
      const user = session?.user
      if (!user) return
      setUser(user)
      const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      if (data) setProfile(data)
    })()
  }, [])

  async function saveProfile() {
    if (!user) return
    await supabase.from('profiles').upsert({ id: user.id, full_name: profile.full_name, avatar_url: profile.avatar_url, updated_at: new Date() })
    alert('Saved')
  }

  async function uploadAvatar(e) {
    try {
      setUploading(true)
      const file = e.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${user.id}.${fileExt}`
      const { data, error } = await supabase.storage.from('avatars').upload(fileName, file, { upsert: true })
      if (error) throw error
      const { data: publicUrlData } = supabase.storage.from('avatars').getPublicUrl(fileName)
      setProfile(prev => ({ ...prev, avatar_url: publicUrlData.publicUrl }))
      setUploading(false)
    } catch (error) {
      alert(error.message)
      setUploading(false)
    }
  }

  if (!user) return <div className="container"><p>Please sign in first. <a href="/auth">Auth</a></p></div>

  return (
    <div className="container">
      <h1>Profile</h1>
      <div className="card">
        <label>Full name</label>
        <input value={profile.full_name || ''} onChange={e=>setProfile({...profile, full_name: e.target.value})} />
        <label>Avatar</label>
        {profile.avatar_url && <div><img src={profile.avatar_url} alt="avatar" style={{width:96,height:96,borderRadius:12}}/></div>}
        <input type="file" onChange={uploadAvatar} />
        {uploading ? <p>Uploading…</p> : <button onClick={saveProfile}>Save profile</button>}
      </div>
    </div>
  )
}
