import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Search, Calendar, Clipboard, Star, Stethoscope, UserCheck, Shield, ChevronRight } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">

      <main>
        <section className="py-20 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2091&q=80')" }}>
          <div className="container mx-auto px-4 text-center">
            <div className="bg-white bg-opacity-90 p-8 rounded-3xl inline-block">
              <h1 className="text-4xl font-bold text-sky-900 mb-6">
                Свързване на студенти и пациенти за контролирана медицинска грижа
              </h1>
              <p className="text-xl text-sky-800 mb-8 max-w-3xl mx-auto">
                MedConnect предлага платформа, на която студентите по медицина и дентална медицина могат да предоставят
                достъпни услуги под професионален надзор на пациенти в нужда.
              </p>
              <div className="space-x-4">
                <Link href={'/posts'}>
                  <button className="bg-sky-800 text-white text-lg py-3 px-6 rounded-full inline-flex items-center">
                    Намери
                    <ChevronRight className="ml-2" size={20} />
                  </button>
                </Link>
                {/* <Link> */}
                  <button className="border border-sky-800 text-sky-800 text-lg py-3 px-6 rounded-full inline-flex items-center">
                    Предложи
                    <ChevronRight className="ml-2" size={20} />
                  </button>
                {/* </Link> */}
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-sky-900 mb-8 text-center">Студенти от тези университети използват платформата</h2>
            <div className="flex flex-wrap justify-center items-center gap-8">
              {[1, 2, 3, 4, 5].map((num) => (
                <div key={num} className="bg-sky-50 p-4 rounded-2xl shadow-md">
                  <Image src={`/placeholder.svg?text=School ${num}`} alt={`Лого на Медицинско Училище ${num}`} width={120} height={60} className="rounded-xl" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-sky-900 mb-12 text-center">Защо да изберете MedConnect?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { Icon: Stethoscope, title: "Контролирана грижа", description: "Всички процедури се извършват под наблюдението на лицензирани професионалисти, гарантиращи качество и безопасност." },
                { Icon: UserCheck, title: "Проверени студенти", description: "Всички студенти са преминали през строг процес на проверка и квалификация." },
                { Icon: Shield, title: "Достъпни цени", description: "Достъп до качествени медицински и дентални услуги на по-ниски цени." },
              ].map((feature, index) => (
                <div key={index} className="bg-white shadow-lg rounded-3xl p-6 text-center">
                  <div className="mb-4 text-sky-800">
                    <feature.Icon size={48} className="mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold text-sky-900 mb-2">{feature.title}</h3>
                  <p className="text-sky-800">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-sky-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-sky-900 mb-12 text-center">Как работи платформата?</h2>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-sky-200 rounded-full"></div>
              {[
                { Icon: Search, title: "Търсене на услуги", description: "Прегледайте наличните медицински и дентални услуги, предлагани от проверени студенти." },
                { Icon: Calendar, title: "Запазване на час", description: "Изберете удобно време и запазете час при студента." },
                { Icon: Clipboard, title: "Получаване на грижа", description: "Посетете клиниката и получете качествена грижа под наблюдение." },
                { Icon: Star, title: "Оценка на услугата", description: "Споделете обратна връзка, за да помогнете за подобряване на услугите." },
              ].map((step, index) => (
                <div key={index} className={`flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <h3 className="text-xl font-semibold text-sky-900 mb-2">{step.title}</h3>
                    <p className="text-sky-800">{step.description}</p>
                  </div>
                  <div className="w-12 h-12 bg-sky-800 rounded-full flex items-center justify-center z-10 text-white">
                    <step.Icon size={24} />
                  </div>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pl-8' : 'pr-8'}`}>
                    <Image 
                      src={`https://source.unsplash.com/featured/?${step.title.toLowerCase().replace(/\s/g, '')}`} 
                      alt={step.title} 
                      width={300} 
                      height={200} 
                      className="rounded-2xl shadow-md object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
