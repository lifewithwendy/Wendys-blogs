import { Button, TextInput } from 'flowbite-react';
import React from 'react';
import { useSelector } from 'react-redux';

export default function DashProfile() {
  const { currentUser } = useSelector(state => state.user);
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-6 text-center font-semibold text-3xl'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <div className="w-32 h-32 self-center cursor-pointer 
        shadow-md overflow-hidden rounded-full">
          <img src={currentUser.profilePicture} alt="User"
            className='rounded-full w-fill h-full object-cover border-8
            border-[lightgray] '   />
        </div>
          <TextInput 
            type='text' 
            id='username' 
            placeholder={currentUser.username }
          />
          <TextInput 
            type='email' 
            id='email' 
            placeholder={currentUser.email}
          />
          <TextInput 
            type='pasword' 
            id='password' 
            placeholder='***********'
          />
          <Button type ='submit' gradientDuoTone='purpleToBlue'>
            Update
          </Button>
      </form> 
      <div className="text-red-400 flex justify-between">
          <span claseName='cursor-pointer'>Delete Account</span>
          <span claseName='cursor-pointer'>Sign Out</span>
          {/* justify between keeps space between two components */}
      </div>
    </div>
  )
}
