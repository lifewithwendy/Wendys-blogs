import React from 'react'
import {motion} from 'framer-motion'

export default function About() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='min-h-screen flex item-center justify center'  
      >
      <div className="max-w-2xl mx-auto p-3 text-center">
        <div className="">
          <h1 className="text-3xl font-semibold text-center">About Wendy's Blog</h1>
          <div className="text-md text-gray-500 flex flex-col gap-6">
            <p className="">
              Wendy's Blog is a full-stack web application that allows users to create, read, update, and delete blog posts. The frontend is built with React.js and Tailwind CSS, and the backend is built with Node.js, Express.js, and MongoDB.
            </p>
            <p className="">
              Wendy's Blog is a full-stack web application that allows users to create, read, update, and delete blog posts. The frontend is built with React.js and Tailwind CSS, and the backend is built with Node.js, Express.js, and MongoDB.
            </p>
            <p className="">
              Wendy's Blog is a full-stack web application that allows users to create, read, update, and delete blog posts. The frontend is built with React.js and Tailwind CSS, and the backend is built with Node.js, Express.js, and MongoDB.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
