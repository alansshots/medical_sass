import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-sky-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 MedConnect. Всички права запазени.</p>
          <div className="mt-4 space-x-4">
            <button className="text-white hover:underline">Privacy Policy</button>
            <button className="text-white hover:underline">Terms of Service</button>
            <button className="text-white hover:underline">Contact Us</button>
          </div>
        </div>
      </footer>
  )
}

export default Footer
