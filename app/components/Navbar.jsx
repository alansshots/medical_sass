import React from 'react'

const Navbar = () => {
  return (
    <header className="bg-sky-50 py-6 border-b-2 border-gray-300">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between">
            <a href='/' className="text-2xl font-bold text-sky-800">MedConnect</a>
            <div className="space-x-4">
              {/* <button className="text-sky-800 hover:bg-sky-100 px-4 py-2 rounded-full">За Нас</button>
              <button className="text-sky-800 hover:bg-sky-100 px-4 py-2 rounded-full">Услуги</button>
              <button className="text-sky-800 hover:bg-sky-100 px-4 py-2 rounded-full">Контакт</button> */}
              <button className="text-sky-800 border border-sky-800 px-4 py-2 rounded-full">Регистрация</button>
              <button className="bg-sky-800 text-white px-4 py-2 rounded-full">Вход</button>
            </div>
          </nav>
        </div>
      </header>
  )
}

export default Navbar