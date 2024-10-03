'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MapPin, User, School, Phone, Mail, Facebook } from 'lucide-react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const schoolOptions = [
  "Медицински Университет - Пловдив",
  "Медицински университет - София",
  "Медицински университет - Варна",
  "Медицински университет - Плевен",
  "Тракийски университет - Стара Загора (Медицински факултет)",
  "Университет проф.д-р Асен Златаров - Бургас (Медицински факултет)",
]

export default function CreatePost() {
  const supabase = createClientComponentClient()
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    description: '',
    location: '',
    city: '',
    provider: '',
    school: '',
    phone: '',
    email: '',
    facebook: ''
  })

  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    setSuccessMessage('')
    setErrorMessage('')

    const { data, error } = await supabase
      .from('posts')
      .insert([
        {
          title: formData.title,
          type: formData.type,
          location: formData.location,
          university: formData.school,
          name: formData.provider,
          description: formData.description,
          phone: formData.phone,
          facebook: formData.facebook,
          email: formData.email
        }
      ])

    if (error) {
      setErrorMessage('Възникна грешка при създаването на обявата. Моля, опитайте отново.')
    } else {
      setSuccessMessage('Обявата е създадена успешно!')
      setFormData({
        title: '',
        type: '',
        description: '',
        location: '',
        city: '',
        provider: '',
        school: '',
        phone: '',
        email: '',
        facebook: ''
      })
      setTimeout(() => {
        router.push('/posts');
      }, 3000);
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-sky-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-sky-900 text-center mb-8">Създайте Нова Обява</h1>
        
        {successMessage && <p className="text-green-600 text-center mb-4">{successMessage}</p>}
        {errorMessage && <p className="text-red-600 text-center mb-4">{errorMessage}</p>}

        <form className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-sky-700 text-sm font-bold mb-2" htmlFor="title">
              Заглавие
            </label>
            <input
              className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              placeholder="Въведете заглавие"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sky-700 text-sm font-bold mb-2" htmlFor="type">
              Тип
            </label>
            <select
              className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="">Изберете тип</option>
              <option value="Дентална Медицина">Дентална Медицина</option>
              <option value="Хуманна Медицина">Хуманна Медицина</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sky-700 text-sm font-bold mb-2" htmlFor="description">
              Описание
            </label>
            <textarea
              className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              placeholder="Въведете описание"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sky-700 text-sm font-bold mb-2" htmlFor="location">
              Локация
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-2 text-sky-500" size={20} />
              <input
                className="shadow appearance-none border rounded-full w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="location"
                type="text"
                placeholder="Въведете локация (град / адрес)"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sky-700 text-sm font-bold mb-2" htmlFor="provider">
              Име
            </label>
            <div className="relative">
              <User className="absolute left-3 top-2 text-sky-500" size={20} />
              <input
                className="shadow appearance-none border rounded-full w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="provider"
                type="text"
                placeholder="Въведете вашето пълно име"
                name="provider"
                value={formData.provider}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sky-700 text-sm font-bold mb-2" htmlFor="school">
              Университет
            </label>
            <div className="relative">
              <School className="absolute left-3 top-2 text-sky-500" size={20} />
              <select
                className="shadow appearance-none border rounded-full w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="school"
                name="school"
                value={formData.school}
                onChange={handleChange}
                required
              >
                <option value="">Изберете университет</option>
                {schoolOptions.map((school, index) => (
                  <option key={index} value={school}>{school}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sky-700 text-sm font-bold mb-2" htmlFor="phone">
              Телефон
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-2 text-sky-500" size={20} />
              <input
                className="shadow appearance-none border rounded-full w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="phone"
                type="tel"
                placeholder="Въведете телефонен номер"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sky-700 text-sm font-bold mb-2" htmlFor="email">
              Имейл
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2 text-sky-500" size={20} />
              <input
                className="shadow appearance-none border rounded-full w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Въведете валиден имейл"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-sky-700 text-sm font-bold mb-2" htmlFor="facebook">
              Facebook
            </label>
            <div className="relative">
              <Facebook className="absolute left-3 top-2 text-sky-500" size={20} />
              <input
                className="shadow appearance-none border rounded-full w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="facebook"
                type="text"
                placeholder="Въведете URL на Facebook профил"
                name="facebook"
                value={formData.facebook}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => setIsModalOpen(true)}
            >
              Създайте Обява
            </button>
          </div>
        </form>
            
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center text-black bg-gray-600 bg-opacity-50">
            <div className="bg-white p-8 rounded shadow-md text-center">
              <h3 className="text-lg font-semibold mb-4">Потвърдете публикацията</h3>
              <p>Сигурни ли сте, че искате да публикувате?</p>
              <div className="mt-6 flex justify-center space-x-4">
                <button
                  onClick={handleSubmit}
                  className="bg-sky-600 text-white py-2 px-4 rounded-md"
                >
                  {loading ? 'Зареждане...' : 'Да'}
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-red-600 text-white py-2 px-4 rounded-md"
                >
                  Не
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
