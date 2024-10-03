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
  const [formErrors, setFormErrors] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const validateForm = () => {
    const errors = {}
    // Required field validations
    if (!formData.title) errors.title = 'Заглавието е задължително.'
    if (!formData.type) errors.type = 'Типът е задължителен.'
    if (!formData.description) errors.description = 'Описание е задължително.'
    if (!formData.location) errors.location = 'Локацията е задължителна.'
    if (!formData.provider) errors.provider = 'Името е задължително.'
    if (!formData.school) errors.school = 'Университетът е задължителен.'
    if (!formData.phone) errors.phone = 'Телефонният номер е задължителен.'
    if (!formData.email) errors.email = 'Имейлът е задължителен.'
    // Email format validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Въведете валиден имейл.'
    }
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0 // returns true if no errors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    setSuccessMessage('')
    setErrorMessage('')
    
    if (!validateForm()) {
      setLoading(false)
      return // Stop submission if there are validation errors
    }

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
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-sky-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-sky-900 text-center mb-8">Създайте Нова Обява</h1>
        
        {successMessage && <p className="text-green-600 text-center mb-4">{successMessage}</p>}
        {errorMessage && <p className="text-red-600 text-center mb-4">{errorMessage}</p>}

        <form className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sky-700 text-sm font-bold mb-2" htmlFor="title">
              Заглавие
            </label>
            <input
              className={`shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formErrors.title ? 'border-red-500' : ''}`}
              id="title"
              type="text"
              placeholder="Въведете заглавие"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
            {formErrors.title && <p className="text-red-500 text-xs italic">{formErrors.title}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sky-700 text-sm font-bold mb-2" htmlFor="type">
              Тип
            </label>
            <select
              className={`shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formErrors.type ? 'border-red-500' : ''}`}
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
            {formErrors.type && <p className="text-red-500 text-xs italic">{formErrors.type}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sky-700 text-sm font-bold mb-2" htmlFor="description">
              Описание
            </label>
            <textarea
              className={`shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formErrors.description ? 'border-red-500' : ''}`}
              id="description"
              placeholder="Въведете описание"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              required
            />
            {formErrors.description && <p className="text-red-500 text-xs italic">{formErrors.description}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sky-700 text-sm font-bold mb-2" htmlFor="location">
              Локация
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-2 text-sky-500" size={20} />
              <input
                className={`shadow appearance-none border rounded-full w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formErrors.location ? 'border-red-500' : ''}`}
                id="location"
                type="text"
                placeholder="Въведете локация (град / адрес)"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
              {formErrors.location && <p className="text-red-500 text-xs italic">{formErrors.location}</p>}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sky-700 text-sm font-bold mb-2" htmlFor="provider">
              Име
            </label>
            <div className="relative">
              <User className="absolute left-3 top-2 text-sky-500" size={20} />
              <input
                className={`shadow appearance-none border rounded-full w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formErrors.provider ? 'border-red-500' : ''}`}
                id="provider"
                type="text"
                placeholder="Въведете вашето пълно име"
                name="provider"
                value={formData.provider}
                onChange={handleChange}
                required
              />
              {formErrors.provider && <p className="text-red-500 text-xs italic">{formErrors.provider}</p>}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sky-700 text-sm font-bold mb-2" htmlFor="school">
              Университет
            </label>
            <select
              className={`shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formErrors.school ? 'border-red-500' : ''}`}
              id="school"
              name="school"
              value={formData.school}
              onChange={handleChange}
              required
            >
              <option value="">Изберете университет</option>
              {schoolOptions.map((school) => (
                <option key={school} value={school}>
                  {school}
                </option>
              ))}
            </select>
            {formErrors.school && <p className="text-red-500 text-xs italic">{formErrors.school}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sky-700 text-sm font-bold mb-2" htmlFor="phone">
              Телефон
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-2 text-sky-500" size={20} />
              <input
                className={`shadow appearance-none border rounded-full w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formErrors.phone ? 'border-red-500' : ''}`}
                id="phone"
                type="text"
                placeholder="Въведете телефонен номер"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              {formErrors.phone && <p className="text-red-500 text-xs italic">{formErrors.phone}</p>}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sky-700 text-sm font-bold mb-2" htmlFor="email">
              Имейл
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2 text-sky-500" size={20} />
              <input
                className={`shadow appearance-none border rounded-full w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formErrors.email ? 'border-red-500' : ''}`}
                id="email"
                type="email"
                placeholder="Въведете вашия имейл"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {formErrors.email && <p className="text-red-500 text-xs italic">{formErrors.email}</p>}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sky-700 text-sm font-bold mb-2" htmlFor="facebook">
              Facebook (по желание)
            </label>
            <div className="relative">
              <Facebook className="absolute left-3 top-2 text-sky-500" size={20} />
              <input
                className="shadow appearance-none border rounded-full w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="facebook"
                type="text"
                placeholder="Въведете вашия Facebook профил"
                name="facebook"
                value={formData.facebook}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className={`bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? 'Създаване...' : 'Създаване на обява'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
