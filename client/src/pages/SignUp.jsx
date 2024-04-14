import { Button, Label } from 'flowbite-react';
import React from 'react';
import { Link } from 'react-router-dom';

export default function SignUp() {
  return (
    <div className='min-h-screen mt-20'>
      <div className="flex p-3 max-w-3xl mx-auto flex-col  md:flex-row  md:items-center gap-5">
        {/* Left side */}
        <div className="flex-1">
          <Link to='/' className="font-bold dark:text-white text-4xl ">
            <span className="px-4 py-2 bg-gradient-to-r from-indigo-500
                via-purple-500 to-pink-500 rounded-lg text-white">
                wendy's
            </span>
          Blog
          </Link>
          <p className='text-sm mt-5'>
            This is a test project to learn React!  This is a test project to learn React! This is a test project to learn React!
          </p>

        </div>
        {/* Right side */}
        <div className="flex-1">
          <div className="">
            <form className='flex flex-col gap-4'>

              <div className="">
                <Label className="text-sm">Your Username</Label>
                <input 
                  type="text" 
                  className="w-full p-2 border border-gray-300 rounded-md" 
                  placeholder="Username"
                  id='username'
                />
              </div>

              <div className="">
              <Label className="text-sm">Your Email</Label>
                <input 
                  type="text" 
                  className="w-full p-2 border border-gray-300 rounded-md" 
                  placeholder="Name@company.com"
                  id='username'
                />
              </div>

              <div className="">
              <Label className="text-sm">Your password</Label>
                <input 
                  type="text" 
                  className="w-full p-2 border border-gray-300 rounded-md" 
                  placeholder="Password"
                  id='username'
                />
              </div>

              <Button gradientDuoTone='purpleToPink' type='submit' className=''>
                Sign Up
              </Button>

            </form>
            <div className="flex gap-2 text-sm ">
              <span className="text-sm">Already have an account?</span>
              <Link to='/sign-in' className='text-blue-500'> 
              Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
