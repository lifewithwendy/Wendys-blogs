import { Button } from 'flowbite-react'
import React,{useEffect} from 'react'


export default function Subscribe() {
  useEffect(() => {
    try {
      const fetchAd = async () => {
          const res = await fetch(`/api/sub/create`);
          const data = await res.json();
          if(!res.ok) {
              console.log(data.message);
              return;
          } 
          if(res.ok) {
              
          }
      }
      fetchAd();


  } catch (error) {
      console.log(error);
  }
  },[])
  return (
    <div className='h-screen flex items-center justify-center'>
      <Button 
        className='h-'
        >
        Subscribe
      </Button>
    </div>
  )
}
