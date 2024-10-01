'use client'
import React, { useState } from 'react'
import { Filter, MapPin, Calendar, Clock, ChevronDown, Phone, Mail, Facebook, X, University, Activity } from 'lucide-react'

// Mock data for postings
const mockPostings = [
  { id: 1, title: "Dental Cleaning", type: "Dental", city: "New York", location: "New York, NY", date: "2023-07-15", time: "10:00 AM", provider: "John Doe", school: "NYU Dental School", description: "Professional dental cleaning service provided by supervised dental students.", phone: "+1 (555) 123-4567", email: "john.doe@nyu.edu", facebook: "facebook.com/johndoe" },
  { id: 2, title: "General Check-up", type: "Medical", city: "Los Angeles", location: "Los Angeles, CA", date: "2023-07-16", time: "2:00 PM", provider: "Jane Smith", school: "UCLA Medical School", description: "Comprehensive general health check-up conducted by medical students under supervision.", phone: "+1 (555) 987-6543", email: "jane.smith@ucla.edu", facebook: "facebook.com/janesmith" },
  { id: 3, title: "Eye Examination", type: "Medical", city: "Chicago", location: "Chicago, IL", date: "2023-07-17", time: "11:30 AM", provider: "Mike Johnson", school: "UIC College of Medicine", description: "Thorough eye examination performed by ophthalmology students with professional oversight.", phone: "+1 (555) 246-8135", email: "mike.johnson@uic.edu", facebook: "facebook.com/mikejohnson" },
  { id: 4, title: "Teeth Whitening", type: "Dental", city: "Houston", location: "Houston, TX", date: "2023-07-18", time: "3:00 PM", provider: "Sarah Brown", school: "UT School of Dentistry", description: "Professional teeth whitening service offered by dental students under faculty supervision.", phone: "+1 (555) 369-2580", email: "sarah.brown@ut.edu", facebook: "facebook.com/sarahbrown" },
  { id: 5, title: "Blood Pressure Check", type: "Medical", city: "Phoenix", location: "Phoenix, AZ", date: "2023-07-19", time: "9:00 AM", provider: "Chris Lee", school: "UA College of Medicine", description: "Quick and accurate blood pressure check provided by medical students.", phone: "+1 (555) 159-7531", email: "chris.lee@ua.edu", facebook: "facebook.com/chrislee" },
]

export default function PostingsPage() {
  const [selectedType, setSelectedType] = useState("All")
  const [selectedCity, setSelectedCity] = useState("All")
  const [selectedSchool, setSelectedSchool] = useState("All")
  const [selectedPosting, setSelectedPosting] = useState(null)

  const filteredPostings = mockPostings.filter(posting => 
    (selectedType === "All" || posting.type === selectedType) &&
    (selectedCity === "All" || posting.city === selectedCity) &&
    (selectedSchool === "All" || posting.school === selectedSchool)
  )

  const cities = ["All", ...new Set(mockPostings.map(posting => posting.city))]
  const schools = ["All", ...new Set(mockPostings.map(posting => posting.school))]

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
              <option value="All">All Types</option>
              <option value="Dental">Dental</option>
              <option value="Medical">Medical</option>
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
              <p className="text-sky-800 mb-4">{posting.type} Service</p>
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin size={16} className="mr-2" />
                <span>{posting.location}</span>
              </div>
              <div className="flex items-center text-gray-600 mb-2">
                <Calendar size={16} className="mr-2" />
                <span>{posting.date}</span>
              </div>
              <div className="flex items-center text-gray-600 mb-4">
                <Clock size={16} className="mr-2" />
                <span>{posting.time}</span>
              </div>
              <div className='flex flex-row justify-start items-center border-t-2 border-gray-200'>
                <img src={'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2091&q=80'} alt={posting.provider} 
                className="w-10 h-10 rounded-full mt-4 mr-1" />
                <div className="pt-4">
                    <p className="text-sm text-gray-600">Provider: {posting.provider}</p>
                    <p className="text-sm text-gray-600">School: {posting.school}</p>
                </div>
              </div>
              <button 
                className="mt-4 w-full bg-sky-800 text-white py-2 px-4 rounded-full hover:bg-sky-700 transition-colors"
                onClick={() => setSelectedPosting(posting)}
              >
                Book Appointment
              </button>
            </div>
          ))}
        </div>
      </main>

      {selectedPosting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-sky-900">{selectedPosting.title}</h2>
              <button 
                onClick={() => setSelectedPosting(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <p className="text-sky-800 mb-4">{selectedPosting.type} Service</p>
            <p className="text-gray-700 mb-4">{selectedPosting.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="font-semibold text-sky-900 mb-2">Appointment Details</h3>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin size={16} className="mr-2" />
                  <span>{selectedPosting.location}</span>
                </div>
                <div className="flex items-center text-gray-600 mb-2">
                  <Calendar size={16} className="mr-2" />
                  <span>{selectedPosting.date}</span>
                </div>
                <div className="flex items-center text-gray-600 mb-2">
                  <Clock size={16} className="mr-2" />
                  <span>{selectedPosting.time}</span>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-sky-900 mb-2">Provider Information</h3>
                <p className="text-gray-600 mb-1">Provider: {selectedPosting.provider}</p>
                <p className="text-gray-600 mb-1">School: {selectedPosting.school}</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-sky-900 mb-2">Contact Information</h3>
              <div className="flex items-center text-gray-600 mb-2">
                <Phone size={16} className="mr-2" />
                <span>{selectedPosting.phone}</span>
              </div>
              <div className="flex items-center text-gray-600 mb-2">
                <Mail size={16} className="mr-2" />
                <span>{selectedPosting.email}</span>
              </div>
              <div className="flex items-center text-gray-600 mb-2">
                <Facebook size={16} className="mr-2" />
                <span>{selectedPosting.facebook}</span>
              </div>
            </div>
            <button className="mt-6 w-full bg-sky-800 text-white py-2 px-4 rounded-full hover:bg-sky-700 transition-colors">
              Confirm Booking
            </button>
          </div>
        </div>
      )}
    </div>
  )
}