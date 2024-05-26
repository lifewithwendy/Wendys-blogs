import { Button, Table } from 'flowbite-react';
import React from 'react'
import { useState, useEffect } from 'react';
import { HiAnnotation, HiArrowNarrowUp, HiDocumentText, HiOutlineUserGroup } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'

export default function DashboardComp() {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const { currentUser } = useSelector(state => state.user);
  const [ads, setAds] = useState([]);
  const [totalAds, setTotalAds] = useState(0);
  const [lastMonthAds, setLastMonthAds] = useState(0);
  useEffect(()=> {
    try {
     const fetchUsers = async () => {
          const res = await fetch('/api/user/getusers?limit=5');
          const data = await res.json();
          if(res.ok){
            setUsers(data.users);
            setTotalUsers(data.totalUsers);
            setLastMonthUsers(data.lastMonthUsers);
        }
      }
      const fetchPosts = async () => {
        const res = await fetch('/api/post/getposts?limit=5');
        const data = await res.json();
        if(res.ok){
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setLastMonthPosts(data.lastMonthPosts);
        }
      }
      const fetchComments = async () => {
        const res = await fetch('/api/comment/getComments?limit=5');
        const data = await res.json();
        if(res.ok){
          setComments(data.comments);
          setTotalComments(data.totalComments);
          setLastMonthComments(data.lastMonthComments);
        }
      }
      const fetchAds = async () => {
        const res = await fetch('/api/ad/getAds?limit=5');
        const data = await res.json();
        console.log(data);
        if(res.ok){
          setAds(data.ads);
          setTotalAds(data.totalAds);
          setLastMonthAds(data.lastMonthAds);
        }
      }
      if(currentUser.isAdmin){
        fetchUsers();
        fetchPosts();
        fetchComments();
        fetchAds();
      }
      } catch (error) {
        console.log(error.message);
      }
    
  }, [currentUser])
  return (
    <motion.div 
      className='p-3 md:mx-auto justify-center '
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      >
      <div className="flex flex-wrap lg:flex-row gap-3 w-full">
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 w-full md:w-full lg:w-60 rounded-md shadow-md">
          <div className="flex justify-between">
            <div className="">
              <h3>TOTAL USERS</h3>
              <p>{totalUsers}</p>
            </div> 
            <HiOutlineUserGroup className='bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg'/>
          </div>
          <div className="flex gap-2 text-sm">
              <span className='text-green-500 flex items-center'>
                <HiArrowNarrowUp />
                {lastMonthUsers}
              </span>
              <div className="text-gray-500">Last month</div>
            </div>
        </div>

        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 w-full md:w-full lg:w-60 rounded-md shadow-md">
          <div className="flex justify-between">
            <div className="">
              <h3>TOTAL POSTS</h3>
              <p>{totalPosts}</p>
            </div> 
            <HiDocumentText className='bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg'/>
          </div>
          <div className="flex gap-2 text-sm">
              <span className='text-green-500 flex items-center'>
                <HiArrowNarrowUp />
                {lastMonthPosts}
              </span>
              <div className="text-gray-500">Last month</div>
            </div>
        </div>

        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 w-full md:w-full lg:w-60 rounded-md shadow-md">
          <div className="flex justify-between">
            <div className="">
              <h3>TOTAL COMMENTS</h3>
              <p>{totalComments}</p>
            </div> 
            <HiAnnotation className='bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg'/>
          </div>
          <div className="flex gap-2 text-sm">
              <span className='text-green-500 flex items-center'>
                <HiArrowNarrowUp />
                {lastMonthComments}
              </span>
              <div className="text-gray-500">Last month</div>
            </div>
        </div>
        
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 w-full md:w-full lg:w-60 rounded-md shadow-md">
          <div className="flex justify-between">
            <div className="">
              <h3>TOTAL ADVERTISEMENTS</h3>
              <p>{totalAds}</p>
            </div> 
            <HiAnnotation className='bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg'/>
          </div>
          <div className="flex gap-2 text-sm">
              <span className='text-green-500 flex items-center'>
                <HiArrowNarrowUp />
                {lastMonthAds}
              </span>
              <div className="text-gray-500">Last month</div>
            </div>
        </div>
      </div>

      <div className="flex-wrap gap-4 py-3 mx-auto justify-center">
        <div className="flex flex-col m-3 md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className='text-center p-2'>Recent Users</h1>
            <Button gradientDuoTone='greenToBlue' outline>
              <Link to='/dashboard?tab=users'>
                View All
              </Link>
            </Button>
          </div>
          <Table className='' hoverable>
            <Table.Head>
              <Table.HeadCell>User Images</Table.HeadCell>
              <Table.HeadCell>Usernames</Table.HeadCell>
            </Table.Head>
              {users && users.map((user) =>{
                return (
                  <Table.Body key={user._id} className='divide-y'>
                    <Table.Row className='bg-white dark:bg-gray-800 dark:border-gray-700'>
                      <Table.Cell>
                        <img 
                          src={user.profilePicture} 
                          alt={user.username} 
                          className='w-10 h-10 rounded-full bg-gray-500 object-cover'/>
                      </Table.Cell>
                      <Table.Cell>
                        {user.username}
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                )
              })
            }
          </Table>
        </div>

        <div className="flex flex-col m-3 md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className='text-center p-2'>Recent Posts</h1>
            <Button gradientDuoTone='greenToBlue' outline>
              <Link to='/dashboard?tab=posts'>
                View All
              </Link>
            </Button>
          </div>
          <Table className='' hoverable>
            <Table.Head>
              <Table.HeadCell>Post Images</Table.HeadCell>
              <Table.HeadCell>Post title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
            </Table.Head>
              {posts && posts.map((Post) =>{
                return (
                  <Table.Body key={Post._id} className='divide-y'>
                    <Table.Row className='bg-white dark:bg-gray-800 dark:border-gray-700'>
                      <Table.Cell>
                        <img 
                          src={Post.image} 
                          alt={Post.slug} 
                          className='w-14 h-10 rounded-md bg-gray-500 object-cover'/>
                      </Table.Cell>
                      <Table.Cell className='w-96'>
                        {Post.title}
                      </Table.Cell>
                      <Table.Cell className='w-5'>
                        {Post.category}
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                )
              })
            }
          </Table>
        </div>

        <div className="flex flex-col m-3 md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className='text-center p-2'>Recent comments</h1>
            <Button gradientDuoTone='greenToBlue' outline>
              <Link to='/dashboard?tab=comments'>
                View All
              </Link>
            </Button>
          </div>
          <Table className='' hoverable>
            <Table.Head>
              <Table.HeadCell>comment content</Table.HeadCell>
              <Table.HeadCell>likes</Table.HeadCell>
            </Table.Head>
              {comments && comments.map((comment) =>{
                return (
                  <Table.Body key={comment._id} className='divide-y'>
                    <Table.Row className='bg-white dark:bg-gray-800 dark:border-gray-700'>
                      <Table.Cell className='w-96'>
                        <p className='line-clamp-2'>
                          {comment.content}
                        </p>
                      </Table.Cell>
                      <Table.Cell>
                        {comment.likes.length}
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                )
              })
            }
          </Table>
        </div>

        <div className="flex flex-col m-3 md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className='text-center p-2'>Recent Advertisments</h1>
            <Button gradientDuoTone='greenToBlue' outline>
              <Link to='/dashboard?tab=ads'>
                View All
              </Link>
            </Button>
          </div>
          <Table className='' hoverable>
            <Table.Head>
              <Table.HeadCell>Advertisement</Table.HeadCell>
              <Table.HeadCell>Title</Table.HeadCell>

              <Table.HeadCell>Views</Table.HeadCell>
            </Table.Head>
              {ads && ads.map((ad) =>{
                return (
                  <Table.Body key={ad._id} className='divide-y'>
                    <Table.Row className='bg-white dark:bg-gray-800 dark:border-gray-700'>
                      <Table.Cell className='w-96'>
                        <p className='line-clamp-2'>
                        <img 
                          src={ad.image} 
                          alt={ad.link} 
                          className='w-14 h-10 rounded-md bg-gray-500 object-cover'/>
                        </p>
                      </Table.Cell>
                      <Table.Cell>
                        {ad.title}
                      </Table.Cell>
                      <Table.Cell>
                        {ad.views.length}
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                )
              })
            }
          </Table>
        </div>
      </div>
    </motion.div>

    
  
    
  )
}
