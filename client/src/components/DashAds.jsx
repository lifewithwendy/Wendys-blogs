import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Table, Modal, Button  } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { set } from 'mongoose';
import { motion } from 'framer-motion';

export default function DashAds() {
  const { currentUser } = useSelector((state) => state.user);
  const [ads, setAds] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModel, setShowModel ] = useState(false);
  const [adIdToDelete, setAdIdToDelete] = useState('');
  // console.log(users);
  
  const handleShowMore = async () => {
    const startIndex = ads.length;
    try {
      const res = await fetch(`/api/ad/getAds?startIndex=${startIndex}`);
      const data = await res.json();
      setAds((prev) => [...prev, ...data.ads]);
      if(data.ads.length < 9){
        setShowMore(false);
      }    
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeleteAd= async () => {
    setShowModel(false);
    try {
      const res = await fetch(`/api/ad/delete/${adIdToDelete}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if(res.ok){
        setAds((prev) => prev.filter((ad) => ad._id !== adIdToDelete));
        setShowModel(false);
      } else {
        console.log(data.message)
      }
      
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const res = await fetch(`/api/ad/getAds`);
        const data = await res.json();
        if(res.ok){
          setAds(data.ads);
          if(data.ads.length < 9){
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    if(currentUser.isAdmin){ 
        fetchAd(); 
    }
  	}, [currentUser._id])

  return (
    <div className='table-auto w-full overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 
    scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {
        currentUser.isAdmin && ads.length > 0 ? (
          <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          >
            <Table hoverable className='shadow-md '>
              <Table.Head>
                <Table.HeadCell>Date Created</Table.HeadCell>
                <Table.HeadCell>image</Table.HeadCell>
                <Table.HeadCell>title</Table.HeadCell>
                <Table.HeadCell>view count</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>
              </Table.Head>
              {
                ads.map((ad) => (
                  <Table.Body className='divide-y' key={ad._id}>
                    <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                      <Table.Cell>
                        {new Date(ad.createdAt).toLocaleDateString()}
                      </Table.Cell>
                      <Table.Cell>
                      <img 
                            src={ad.image} 
                            alt={ad.title} 
                            className='w-20 h-10 object-cover bg-grey-500 rounded'
                          />
                      </Table.Cell>
                      <Table.Cell>
                          {ad.title}                        
                      </Table.Cell>
                      <Table.Cell>
                        {ad.views.length}
                      </Table.Cell>
                      <Table.Cell>
                        <span onClick={ () => {
                          setShowModel(true);
                          setAdIdToDelete(ad._id);
                        }}
                          className='font-medium text-grey-900 text-red-500 hover:underline curser-pointer'
                        >
                          Delete
                        </span>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                ))
              }

            </Table>{
              showMore && (
                <button onClick={ handleShowMore }className='w-full text-teal-500 self-center text-sm py-7'>
                  Show More
                </button>
              )
            }
          </motion.div>
        ) : (
          <p>You have no ads yet!</p>
        )
      }
      <Modal 
        show={showModel} 
        onClose={() => setShowModel(false)}
        popup
        size='md'
      >
      <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle 
              className='h-16 w-16 text-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
              <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                Are you sure you want to delete this ad ?
              </h3>
              <div className="flex justify-center gap-6">
                <Button color='failure' onClick={ handleDeleteAd }>
                  Yes, I'm sure
                </Button>
                <Button color='gray' onClick={() =>setShowModel(false)}>
                  No, cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
      </Modal>
    </div>
  )
}
