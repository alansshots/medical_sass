'use client'
import React, { useState } from 'react'
import { Mail, Lock, Eye, EyeOff, School, User } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const universities = [
  "Медицински Университет - Пловдив",
  "Медицински университет - София",
  "Медицински университет - Варна",
  "Медицински университет - Плевен",
  "Тракийски университет - Стара Загора (Медицински факултет)",
  "Университет проф.д-р Асен Златаров - Бургас (Медицински факултет)",
]

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [university, setUniversity] = useState('')
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const supabase = createClientComponentClient()
  const router = useRouter();


  const handleSignUp = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (!fullName || !email || !password || !university) {
      setError('Моля, попълнете всички полета.')
      return
    }

    if (password.length < 6) {
      setError('Паролата трябва да бъде поне 6 символа.')
      return
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            university: university,
          },
        },
      })

      if (error) throw error
      setSuccess('Регистрацията е успешна! Mоля влезте в профила си.')
      setTimeout(() => {
        router.push('/signin');
      }, 3000);

    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="min-h-screen bg-sky-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-sky-900">Създайте вашия акаунт</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSignUp}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="full-name" className="sr-only">Пълно име</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-sky-500" />
                </div>
                <input
                  id="full-name"
                  name="full-name"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                  placeholder="Пълно име"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">Имейл адрес</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-sky-500" />
                </div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                  placeholder="Имейл адрес"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Парола</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-sky-500" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                  placeholder="Парола"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-sky-500 focus:outline-none"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="university" className="sr-only">Университет</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <School className="h-5 w-5 text-sky-500" />
                </div>
                <select
                  id="university"
                  name="university"
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                >
                  <option value="">Изберете университет</option>
                  {universities.map((uni, index) => (
                    <option key={index} value={uni}>{uni}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
          {success && <p className="text-sm text-green-600">{success}</p>}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            >
              Регистрирайте се
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Вече имате акаунт?{' '}
            <Link href="/signin" className="font-medium text-sky-600 hover:text-sky-500">
              Вход
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
