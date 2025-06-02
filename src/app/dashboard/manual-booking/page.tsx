import {  Construction } from 'lucide-react'
import React from 'react'

const page = () => {
  return (
    <div>
         <div className="text-center  mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-100 rounded-full mb-6">
            <Construction className="w-10 h-10 text-orange-600" />
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">Manual Booking </h1>

          <span className="text-lg px-4 py-8 mb-8">
            🚧 Work in Progress
          </span>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto"> This feature will be available soon!
          </p>
        </div>
    </div>
  )
}

export default page
