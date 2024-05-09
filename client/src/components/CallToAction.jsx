import { Button } from 'flowbite-react'
import React from 'react'

export default function CallToAction() {
  return (
    <div className='flex flex-col sm:flex-row  p-3 border border-teal-500 
    justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
      <div className="flex-1 justify-center flex flex-col">
        <h2 className='text-2xl'>
            Want to learn more about javascript?
        </h2>
        <p className='text-gray-500 my-2'>
            Subscribe to our newsletter for weekly updates on the latest 
        javascript tutorials, tips and tricks.
        </p>
        <Button gradientDuoTone='greenToBlue' outline className='rounded-tr-none rounded-bl-none'>
            <a href="https://www.100jsprojects.com" target='_blank' rel='noopener noreferrer'>
                Subscribe
            </a>
        </Button>
      </div>
      <div className="p-7 flex-1">
        <img src="https://th.bing.com/th/id/OIP.BzhVS09D8I76dd86UUU48gHaDH?w=307&h=146&c=7&r=0&o=5&dpr=1.3&pid=1.7" 
        alt="" />
      </div>
    </div>
  )
}
