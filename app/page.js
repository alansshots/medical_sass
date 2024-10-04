'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search, Users, Shield, Star, ChevronRight, ArrowRight } from 'lucide-react'

import LogoMUPleven from '../app/assets/images/Logo_MU_Pleven.png';
import LogoMUPlovdiv from '../app/assets/images/Logo_MU_Plovdiv.png';
import LogoMUSofia from '../app/assets/images/Logo_MU_Sofia.png';
import LogoMUSZ from '../app/assets/images/Logo_MU_SZ.png';
// import LogoMUVarn from '../app/assets/images/Logo_MU_Varna.png';

const universityLogos = {
  "Medical University - Pleven": LogoMUPleven,
  "Medical University - Plovdiv": LogoMUPlovdiv,
  "Medical University - Sofia": LogoMUSofia,
  "Medical University - SZ": LogoMUSZ,
  // "Medical University - Varna": LogoMUVarn,
};

const universities = [
  "Medical University - Pleven",
  "Medical University - Plovdiv",
  "Medical University - Sofia",
  "Medical University - SZ",
  // "Medical University - Varna"
];

const testimonials = [
  { name: "", role: "Student", quote: "MedConnect has been invaluable for my practical training.", rating: 5 },
  { name: "John Smith", role: "Patient", quote: "I received excellent care at an affordable price.", rating: 5 },
  { name: "Sarah Johnson", role: "Student", quote: "The supervision and real-world experience are unmatched.", rating: 4 },
]

export default function LandingPage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  return (
    <div className="min-h-screen bg-sky-50 font-sans">
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden py-10 md:py-32">
          <div className="container mx-auto px-6 relative z-10">
            <div className="md:w-2/3">
              <h1 className="text-4xl md:text-6xl font-bold text-sky-900 mb-6">
                Свързване на студенти и пациенти за дентална грижа под наблюдението на специалисти.
              </h1>
              <p className="text-xl text-sky-700 mb-8">
                UniklinikBG улеснява намирането на достъпна дентална и медицинска грижа, предоставяйки възможност на студенти да придобият опит. 
              </p>
              <div className="flex flex-row sm:flex-row ">
                <Link href="/posts" passHref>
                  <button className="bg-sky-600  mx-1 text-white px-8 py-3 rounded-full hover:bg-sky-700 transition-colors flex items-center justify-center">
                    Намери
                    <Search className="ml-2" size={20} />
                  </button>
                </Link>

                {/* Link for "Предложи" Button */}
                <Link href="/signup" passHref >
                  <button className="bg-white mx-1 text-sky-600 px-8 py-3 rounded-full hover:bg-sky-100 transition-colors flex items-center justify-center border border-sky-600">
                    Предложи
                    <Users className="ml-2" size={20} />
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-1/2 h-full bg-sky-200 rounded-bl-full z-0"></div>
        </section>

        {/* Why Us Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-sky-900 mb-12 text-center">UniklinikBG Предлага</h2>
            <div className="grid md:grid-cols-3 gap-12">
              {[
                { icon: Users, title: "Проверени студенти", description: "Всички студенти в латформата изучават дентална или хуманна медицина." },
                { icon: Shield, title: "Професионално наблюдение", description: "Всяка процедура се контролира от квалифицирани специалисти." },
                { icon: Star, title: "Достъпни здравни услуги", description: "Медицинско обслужване за част от обичайната цена." },
              ].map((feature, index) => (
                <motion.div 
                  key={index}
                  className="bg-sky-50 p-6 rounded-lg text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <div className="bg-sky-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="text-sky-800" size={32} />
                  </div>
                  <h3 className="text-xl font-semibold text-sky-800 mb-2">{feature.title}</h3>
                  <p className="text-sky-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials and Reviews Section */}
        {/* <section className="py-20 bg-sky-100">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-sky-900 mb-12 text-center">Отзиви от потребители</h2>
            <div className="relative">
              <div className="overflow-hidden">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col md:flex-row items-center"
                >
                  <div className="md:w-1/3 mb-6 md:mb-0">
                  </div>
                  <div className="md:w-2/3 md:pl-12">
                    <p className="text-xl text-sky-800 mb-4">"{testimonials[activeTestimonial].quote}"</p>
                    <p className="text-sky-600 font-semibold">{testimonials[activeTestimonial].name}</p>
                    <p className="text-sky-500">{testimonials[activeTestimonial].role}</p>
                    <div className="flex mt-2">
                      {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                        <Star key={i} className="text-yellow-400" size={20} />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
              <div className="flex justify-center mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-3 h-3 rounded-full mx-1 ${
                      index === activeTestimonial ? 'bg-sky-600' : 'bg-sky-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section> */}
              
        {/* Universities Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-sky-900 mb-12 text-center">Студенти от тези университети предлагат медицинска и денталнa грижа</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {universities.map((university, index) => (
                <motion.div
                  key={index}
                  className="bg-sky-50 p-6 rounded-lg flex items-center justify-center h-32"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Image
                    src={universityLogos[university]} 
                    alt={university} 
                    width={200}
                    height={100}
                    className="max-h-20 w-auto"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        {/* <section className="py-20 bg-sky-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-sky-900 mb-12 text-center">К</h2>
            <div className="relative">
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 border-l-2 border-sky-200"></div>
              {[
                { title: "Регистрирай се ", description: "Създай акаунт и предложи дентална или медицинска грижа." },
                { title: "Свържи се с Пациенти", description: "Свържи се с пациенти търсещи съответната грижа." },
                { title: "", description: "Match with the right student or patient for your needs." },
                { title: "Receive Care", description: "Get quality, supervised care at affordable rates." },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  className={`flex items-center mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                      <h3 className="text-xl font-semibold text-sky-800 mb-2">{step.title}</h3>
                      <p className="text-sky-600">{step.description}</p>
                    </div>
                  </div>
                  <div className="hidden md:block w-8 h-8 bg-sky-600 rounded-full border-4 border-white absolute left-1/2 transform -translate-x-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </section> */}

        {/* Call to Action */}
        {/* <section className="py-20 bg-sky-600 text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8">Присъединете се към UniklinikaBG днес и станете част от.</p>
            <motion.button
              className="bg-white text-sky-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-sky-100 transition-colors inline-flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Join Now
              <ArrowRight className="ml-2" size={20} />
            </motion.button>
          </div>
        </section> */}
      </main>

    </div>
  )
}