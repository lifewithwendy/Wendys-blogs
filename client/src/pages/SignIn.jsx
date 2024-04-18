import {TextInput, Button, Label, Alert, Spinner } from 'flowbite-react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(false);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim()});
  };
  const handleSubmission = async (e) => {
    e.preventDefault();
    if ( !formData.email || !formData.password) {
      setErrorMessage('Please fill in all fields');
      return;
    }
    console.log(formData);

    try {
      setloading(true);
      setErrorMessage(null);

      const res= await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if(data.success === false){
        return setErrorMessage(data.message);
      }
      setloading(false);
      if (res.ok) {
        navigate('/home');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setloading(false);
    }
  }

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
            You can sign in to your account using your email and password or Google.
          </p>

        </div>
        {/* Right side */}
        <div className="flex-1">
          <div className="">
            <form className='flex  flex-col  gap-2' onSubmit={handleSubmission}>

              <div className="">
              <Label className="text-sm">Your Email</Label>
                <TextInput 
                  type="email" 
                  className="w-full p-2 border-0 border-gray-300 rounded-md" 
                  placeholder="Name@company.com"
                  id='email'
                  onChange={handleChange}
                />
              </div>

              <div className="">
              <Label className="text-sm">Your password</Label>
                <TextInput 
                  type="password" 
                  className="w-full p-2 border-0 border-gray-300 rounded-md" 
                  placeholder="**********"
                  id='password'
                  onChange={handleChange}
                />
              </div>

              <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
                
                {
                  loading ? (
                    <>
                    <Spinner size='sm' />
                    <span className="pl-3">Loading...</span>
                    </>
                ) : (
                  'Sign In'
                )}
              </Button>

            </form>
            <div className="flex gap-2 text-sm mt-2">
              <span className="text-sm">Dont have a account?</span>
              <Link to='/signup' className='text-blue-500'> 
              Sign Up
              </Link>
            </div>
            {
              errorMessage && (
                <Alert className="mt-2" color='failure'>
                  {errorMessage}
                </Alert>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}
