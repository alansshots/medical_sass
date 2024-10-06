'use client'

import React, { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Plus, Menu, X, LogOut, UserPlus, LogIn } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
  const [user, setUser] = useState(null)
  const [showPopup, setShowPopup] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const supabase = createClientComponentClient()

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
    }

    fetchUser()

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [supabase])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <>
      <header className="bg-sky-50 py-4 border-b-2 border-gray-300 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-sky-800">
              UniklinikBG
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/posts" className="text-sky-800 hover:text-sky-600 transition-colors duration-200">
                Обяви
              </Link>
              {user ? (
                <>
                  <span className="text-sky-800 font-semibold">
                    Здравей, {user.user_metadata.full_name}
                  </span>
                  <Link
                    href="/addpost"
                    className="bg-sky-800 text-white px-4 py-2 rounded-full hover:bg-sky-700 transition-colors duration-200 flex items-center"
                  >
                    <Plus className="mr-1" size={18} />
                    Добави Обява
                  </Link>
                  <button
                    onClick={() => setShowPopup(true)}
                    className="bg-sky-800 text-white px-4 py-2 rounded-full hover:bg-sky-700 transition-colors duration-200 flex items-center"
                  >
                    <LogOut className="mr-1" size={18} />
                    Изход
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/signup"
                    className="text-sky-800 border border-sky-800 px-4 py-2 rounded-full hover:bg-sky-100 transition-colors duration-200 flex items-center"
                  >
                    <UserPlus className="mr-1" size={18} />
                    Регистрация
                  </Link>
                  <Link
                    href="/signin"
                    className="bg-sky-800 text-white px-4 py-2 rounded-full hover:bg-sky-700 transition-colors duration-200 flex items-center"
                  >
                    <LogIn className="mr-1" size={18} />
                    Вход
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-sky-800 focus:outline-none"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-sky-50 border-b-2 border-gray-300 fixed w-full z-50"
          >
            <div className="container mx-auto px-4 py-4">
              <Link
                href="/posts"
                className="block py-2 text-sky-800 hover:text-sky-600 transition-colors duration-200"
                onClick={toggleMenu}
              >
                Публикации
              </Link>
              {user ? (
                <>
                  <span className="block py-2 text-sky-800 font-semibold">
                    Здравей, {user.user_metadata.full_name}
                  </span>
                  <Link
                    href="/addpost"
                    className="block py-2 text-sky-800 hover:text-sky-600 transition-colors duration-200"
                    onClick={toggleMenu}
                  >
                    <span className="flex items-center">
                      <Plus className="mr-2" size={18} />
                      Добави Обява
                    </span>
                  </Link>
                  <button
                    onClick={() => {
                      setShowPopup(true)
                      toggleMenu()
                    }}
                    className="block w-full text-left py-2 text-sky-800 hover:text-sky-600 transition-colors duration-200"
                  >
                    <span className="flex items-center">
                      <LogOut className="mr-2" size={18} />
                      Изход
                    </span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/signup"
                    className="block py-2 text-sky-800 hover:text-sky-600 transition-colors duration-200"
                    onClick={toggleMenu}
                  >
                    <span className="flex items-center">
                      <UserPlus className="mr-2" size={18} />
                      Регистрация
                    </span>
                  </Link>
                  <Link
                    href="/signin"
                    className="block py-2 text-sky-800 hover:text-sky-600 transition-colors duration-200"
                    onClick={toggleMenu}
                  >
                    <span className="flex items-center">
                      <LogIn className="mr-2" size={18} />
                      Вход
                    </span>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sign Out Confirmation Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-700/50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 w-full max-w-md mx-4"
            >
              <h3 className="text-lg font-semibold mb-4 text-center">Излизане от профил</h3>
              <p className="mb-6 text-center">Сигурни ли сте, че искате да излезете?</p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={async () => {
                    await supabase.auth.signOut()
                    setUser(null)
                    setShowPopup(false)
                  }}
                  className="bg-sky-800 text-white px-4 py-2 rounded-full hover:bg-sky-700 transition-colors duration-200"
                >
                  Да, изход
                </button>
                <button
                  onClick={() => setShowPopup(false)}
                  className="bg-gray-300 text-black px-4 py-2 rounded-full hover:bg-gray-400 transition-colors duration-200"
                >
                  Не
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar