import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-sky-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 UniklinikBG. Всички права запазени.</p>
          <div className="mt-4 space-x-4">
            <a href='/' className="text-white hover:underline">Privacy Policy</a>
            <a href='/' className="text-white hover:underline">Terms of Service</a>
            <a href='/' className="text-white hover:underline">Contact Us</a>
          </div>
        </div>
      </footer>
  )
}

export default Footer
