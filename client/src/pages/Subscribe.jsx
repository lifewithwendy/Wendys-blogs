import { Button } from 'flowbite-react'
import React,{ useEffect, useState, } from 'react'
import { useSelector } from 'react-redux'


export default function Subscribe() {
  const { currentUser } = useSelector(state => state.user);
  useEffect(() => {
    const getsubs = async () => {
      const res = await fetch('/api/sub/makepayment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId : currentUser._id,        
          type: '1',
        }),
      });
      const data = await res.json();
      if(!res.ok) {
        console.log(res.error)
      }
      if(res.ok) {
        console.log(data)
        // navigate(`/home`);
      }
    }
    try {
      getsubs();
  } catch (error) {
      console.log(error);
  }
  },[])
  return (
    <div className='h-screen flex items-center justify-center'>
      <Button 
        className=''
        >
        Subscribe
      </Button>
    </div>
  )
}
