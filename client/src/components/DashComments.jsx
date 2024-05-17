import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Table, Modal, Button  } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { set } from 'mongoose';
import { motion } from 'framer-motion';

export default function DashComments() {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModel, setShowModel ] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState('');
  // console.log(users);
  
  const handleShowMore = async () => {
    const startIndex = comments.length;
    try {
      const res = await fetch(`/api/comment/getComments?startIndex=${startIndex}`);
      const data = await res.json();
      setComments((prev) => [...prev, ...data.comments]);
      if(data.comments.length < 9){
        setShowMore(false);
      }    
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeleteComment = async () => {
    setShowModel(false);
    try {
      const res = await fetch(`/api/comment/deleteComment/${commentIdToDelete}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if(res.ok){
        setComments((prev) => prev.filter((comment) => comment._id !== commentIdToDelete));
        setShowModel(false);
      } else {
        console.log(data.message)
      }
      
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const res = await fetch(`/api/comment/getcomments`);
        const data = await res.json();
        if(res.ok){
          setComments(data.comments);
          if(data.comments.length < 9){
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    if(currentUser.isAdmin){ 
        fetchComment(); 
    }
  	}, [currentUser._id])

  return (
    <div className='table-auto w-full overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 
    scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {
        currentUser.isAdmin && comments.length > 0 ? (
          <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          >
            <Table hoverable className='shadow-md '>
              <Table.Head>
                <Table.HeadCell>Date Created</Table.HeadCell>
                <Table.HeadCell>comment content</Table.HeadCell>
                <Table.HeadCell>Number of likes</Table.HeadCell>
                <Table.HeadCell>Post Id</Table.HeadCell>
                <Table.HeadCell>User Id</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>
              </Table.Head>
              {
                comments.map((comment) => (
                  <Table.Body className='divide-y' key={comment._id}>
                    <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                      <Table.Cell>
                        {new Date(comment.updatedAt).toLocaleDateString()}
                      </Table.Cell>
                      <Table.Cell>
                          {comment.content}
                      </Table.Cell>
                      <Table.Cell>
                          {comment.numberOfLikes}                        
                      </Table.Cell>
                      <Table.Cell>
                        {comment.postId}
                      </Table.Cell>
                      <Table.Cell>
                        {comment.userId}
                      </Table.Cell>
                      <Table.Cell>
                        <span onClick={ () => {
                          setShowModel(true);
                          setCommentIdToDelete(comment._id);
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
          <p>You have no comments yet!</p>
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
                Are you sure you want to delete this comment ?
              </h3>
              <div className="flex justify-center gap-6">
                <Button color='failure' onClick={ handleDeleteComment }>
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
