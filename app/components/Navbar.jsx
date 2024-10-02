'use client'
import React, { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const Navbar = () => {
  const [user, setUser] = useState(null)
  const [showPopup, setShowPopup] = useState(false)
  const supabase = createClientComponentClient()

  useEffect(() => {
    // Fetch the user data on component mount
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
    }

    fetchUser()

    // Set up an auth state listener to update user status on sign-in or sign-out
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
    })

    // Clean up the listener on component unmount
    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [supabase])

  return (
    <>
      <header className="bg-sky-50 py-6 border-b-2 border-gray-300">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between">
            <a href='/' className="text-2xl font-bold text-sky-800">MedConnect</a>
            <div className="flex flex-row items-center justify-center">
              {user ? (
                <>
                  <span className="text-sky-800 mr-4 font-semibold">Здравей, {user.user_metadata.full_name}</span>
                  <a href="./addpost" className='flex flex-row items-center justify-center bg-sky-800 text-white px-4 py-2 mr-3 rounded-full'>
                    <p className='mr-2'>Добави Обява</p>
                    <Plus />
                  </a>
                  <button
                    onClick={() => setShowPopup(true)}
                    className="bg-sky-800 text-white px-4 py-2 rounded-full"
                  >
                    Изход
                  </button>
                </>
              ) : (
                <>
                  <a href='/signup' className="text-sky-800 border border-sky-800 px-4 py-2 rounded-full mx-1">Регистрация</a>
                  <a href='/signin' className="bg-sky-800 text-white px-4 py-2 rounded-full mx-1">Вход</a>
                </>
              )}
            </div>
          </nav>
        </div>
      </header>

      {/* Popup for Sign Out Confirmation */}
      {showPopup && (
        <div className='absolute w-full h-full bg-gray-700/50 flex items-start justify-center'>
          <div className='w-1/3 text-black bg-white rounded-xl text-center p-6'>
            <h3 className="text-lg font-semibold mb-4">Излизане от профил</h3>
            <p className="mb-4">Сигурни ли сте, че искате да излезете?</p>
            <div className="flex justify-between">
              <button
                onClick={async () => {
                  await supabase.auth.signOut()
                  setUser(null)
                  setShowPopup(false) // Close popup after signing out
                }}
                className="bg-sky-800 text-white px-4 py-2 rounded-full"
              >
                Да, изход
              </button>
              <button
                onClick={() => setShowPopup(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded-full"
              >
                Не
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar
