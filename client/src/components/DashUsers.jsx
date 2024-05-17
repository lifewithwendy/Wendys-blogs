import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Table, Modal, Button  } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { set } from 'mongoose';
import { motion } from 'framer-motion';

export default function DashUsers() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModel, setShowModel ] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState('');
  // console.log(users);
  
  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
      const data = await res.json();
      setUsers((prev) => [...prev, ...data.users]);
      if(data.users.length < 9){
        setShowMore(false);
      }    
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`/api/user/delete/${userIdToDelete}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if(res.ok){
        setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
        setShowModel(false);
      } else {
        console.log(data.message)
      }
      
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers`);
        const data = await res.json();
        if(res.ok){
          setUsers(data.users);
          if(data.users.length < 9){
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    if(currentUser.isAdmin){ 
      fetchUsers(); 
    }
  	}, [currentUser._id])

  return (
    <div className='table-auto w-full overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 
    scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {
        currentUser.isAdmin && users.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            >
            <Table hoverable className='shadow-md '>
              <Table.Head>
                <Table.HeadCell>Date Created</Table.HeadCell>
                <Table.HeadCell>User Image</Table.HeadCell>
                <Table.HeadCell>Username</Table.HeadCell>
                <Table.HeadCell>Email</Table.HeadCell>
                <Table.HeadCell>Admin</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>
              </Table.Head>
              {
                users.map((user) => (
                  <Table.Body className='divide-y' key={user._id}>
                    <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                      <Table.Cell>
                        {new Date(user.createdAt).toLocaleDateString()}
                      </Table.Cell>
                      <Table.Cell>
                          <img 
                            src={user.profilePicture} 
                            alt={user.username} 
                            className='w-10 h-10 object-cover bg-grey-500 rounded-full'
                          />
                        
                      </Table.Cell>
                      <Table.Cell>
                          {user.username}                        
                      </Table.Cell>
                      <Table.Cell>
                        {user.email}
                      </Table.Cell>
                      <Table.Cell>
                        {user.isAdmin ? <FaCheck className='text-green-500'/> : <FaTimes className='text-red-500'/>}
                      </Table.Cell>
                      <Table.Cell>
                        <span onClick={ () => {
                          setShowModel(true);
                          setUserIdToDelete(user._id);
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
          <p>You have no users yet!</p>
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
                Are you sure you want to delete this User ?
              </h3>
              <div className="flex justify-center gap-6">
                <Button color='failure' onClick={ handleDeleteUser }>
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
