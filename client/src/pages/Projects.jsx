import React from 'react'
import CallToAction from '../components/CallToAction'
import { motion } from 'framer-motion'

export default function Projects() {
  return (
    <motion.div 
      className='min-h-screen max-w-2xl mx-auto flex justify-center items-center flex-col gap-6 p-3'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      >
      <h1 className='text-3xl font-semibold'>Projects</h1>
      <p className='text-md text-gray-500'>
        Wendy's Blog is a full-stack web application that allows users to create, read, update, and delete blog posts. The frontend is built with React.js and Tailwind CSS, and the backend is built with Node.js, Express.js, and MongoDB.
      </p>
      <CallToAction />
    </motion.div>
  )
}
 