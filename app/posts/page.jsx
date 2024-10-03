'use client'

import React, { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'// Import Supabase client
import { Filter, MapPin, Calendar, Clock, ChevronDown, Phone, Mail, Facebook, X, University, Activity } from 'lucide-react'
import Link from 'next/link';

export default function PostingsPage() {
  const [postings, setPostings] = useState([])
  const [selectedType, setSelectedType] = useState("Всички")
  const [selectedCity, setSelectedCity] = useState("Всички")
  const [selectedSchool, setSelectedSchool] = useState("Всички")
  const [selectedPosting, setSelectedPosting] = useState(null)
  const supabase = createClientComponentClient()

  // Fetch data from Supabase
  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')  // Adjust fields as necessary

      if (error) {
        console.error('Error fetching data:', error)
      } else {
        setPostings(data)
      }
    }

    fetchPosts()
  }, [])

  const filteredPostings = postings.filter(posting => 
    (selectedType === "Всички" || posting.type === selectedType) &&
    (selectedCity === "Всички" || posting.city === selectedCity) &&
    (selectedSchool === "Всички" || posting.school === selectedSchool)
  )

  const cities = ["Всички", ...new Set(postings.map(posting => posting.city))]
  const schools = ["Всички", ...new Set(postings.map(posting => posting.school))]

  return (
    <div className="min-h-screen bg-sky-50">

      <main className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Activity size={20} className="text-sky-800" />
            <select
              className="pl-4 pr-8 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 appearance-none text-gray-700"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="Всички">Всички</option>
              <option value="Дентална Медицина">Дентална Медицина</option>
              <option value="Хуманна Медицина">Хуманна Медицина</option>
            </select>
            <ChevronDown size={20} className="text-gray-400 -ml-8 pointer-events-none" />
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={20} className="text-sky-800" />
            <select
              className="pl-4 pr-8 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 appearance-none text-gray-700"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            <ChevronDown size={20} className="text-gray-400 -ml-8 pointer-events-none" />
          </div>
          <div className="flex items-center gap-2">
            <University size={20} className="text-sky-800" />
            <select
              className="pl-4 pr-8 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 appearance-none text-gray-700"
              value={selectedSchool}
              onChange={(e) => setSelectedSchool(e.target.value)}
            >
              {schools.map(school => (
                <option key={school} value={school}>{school}</option>
              ))}
            </select>
            <ChevronDown size={20} className="text-gray-400 -ml-8 pointer-events-none" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPostings.map(posting => (
            <div key={posting.id} className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold text-sky-900 mb-2">{posting.title}</h2>
              <p className="text-sky-800 mb-4">{posting.type}</p>
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin size={16} className="mr-2" />
                <span>{posting.location}</span>
              </div>
              <div className="flex items-center text-gray-600 mb-2">
                <Calendar size={16} className="mr-2" />
                <span>Публикувано: {new Date(posting.created_at).toLocaleDateString('bg-BG')}</span>
              </div>
              <div className='flex flex-row justify-start items-center border-t-2 border-gray-200'>
                {/* <img src={'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2091&q=80'} alt={posting.provider} 
                className="w-10 h-10 rounded-full mt-4 mr-2" /> */}
                <div className="pt-4">
                    <p className="text-sm text-gray-600">{posting.name}</p>
                    <p className="text-sm text-gray-600">{posting.university}</p>
                </div>
              </div>
              <Link href={`/posts/${posting.id}`} passHref>
                <button 
                  className="mt-4 w-full bg-sky-800 text-white py-2 px-4 rounded-full hover:bg-sky-700 transition-colors"
                >
                  Виж повече
                </button>
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
