import React, { useEffect,useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button, Spinner, Modal, Toast } from 'flowbite-react'
import CallToAction from '../components/CallToAction';
import CommentSection from '../components/CommentSection';
import PostCard from '../components/PostCard';
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux';
import { HiFire } from 'react-icons/hi';
import { Card } from "flowbite-react";


export default function PostPage() {
    const { currentUser } = useSelector(state => state.user);
    const { postSlug } = useParams();
    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState({});
    const [error, setError] = useState(false);
    const [recentPosts, setRecentPosts] = useState(null);
    const [showModel, setShowModel] = useState(true);
    const [mainAd, setMainAd] = useState('');
    const [Ad1, setAd1] = useState('');
    const [Ad2, setAd2] = useState('');
    const [cardList, setCardList] = useState([]);

    
  
    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/post/getposts/?slug=${postSlug}`);
                const data = await res.json();
                if (!res.ok) {
                    setLoading(false);
                    setError(true);
                    // console.log(data.message);
                    return;
                } else {
                    setPost(data.posts[0]);
                    setLoading(false);
                    setError(false);
                }
            } catch (error) {
                console.log(error.message);
                setLoading(false);
                setError(true);
            }
        }
        const fetchAds = async () => {
          try {
            const res = await fetch(`/api/ad/getAdToShow?priority=3&limit=1&user=${currentUser}`);
            const data = await res.json();
            setMainAd(data.ads)
            console.log(data.ads);
          } catch (error) {
            console.log(error.message);
          }
          
        }
        fetchAds();
        fetchPost();
        
    }, [postSlug]);

    useEffect(() => {
      const fetchRecentPosts = async () => {
        const res = await fetch('/api/post/getposts?limit=3');
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
          setError(true);
          return;
        } else {
          setRecentPosts(data.posts);
        }
        
      }
      fetchRecentPosts();
      } ,[] 
    )

    useEffect(() => {
      const fetchAds = async () => {
        try {
          const res1 = await fetch(`/api/ad/getAdToShow?priority=1&limit=1&user=${currentUser}`);
          const res2 = await fetch(`/api/ad/getAdToShow?priority=2&limit=2&user=${currentUser}`);
          const res = await fetch(`/api/ad/getAdToShow?priority=3&limit=2&user=${currentUser}`);
          const data = await res.json();
          const data1 = await res1.json();
          const data2 = await res2.json();
          setCardList([data.ads[0], data.ads[1],data1.ads[0]])
          setAd1(data1.ads[0])
          setAd2(data2.ads)
          console.log(cardList);
        } catch (error) {
          console.log(error.message);
        }
        
      }
      fetchAds();
      
    }, [1])


    if (loading) {
        return <div className='flex justify-center items-center min-h-screen'>
            <Spinner size='xl' />
        </div>
    }
  return (
    <motion.main 
      className='p-3 flex flex-col max-w-6xl sm:3xl mx-auto min-h-screen'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      >
      <h1 className='text-3xl mt-10 p-3 
      text-center font-serif max-w-2xl mx-auto lg:text-4xl'> 
        {post && post.title}
      </h1>
      <Link to={`/search?category=${post && post.category}`}
      className='self-center mt-5'>
        <Button color='gray' pill size='xs'>{post && post.category}</Button>
      </Link>
      <div className="rounded-12px">
        
      </div>
      <img 
        src={post && post.image} 
        alt={post && post.title}
        className='mt-10 p-3 max-h-[600px] w-full object-cover '
      />
      <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className='italic'>{post && Math.ceil(post.content.length/1000).toFixed(0)}
            mins read
        </span>
      </div>
      <div className='p-3 max-w-2xl mx-auto w-full post-content' 
        dangerouslySetInnerHTML={{__html: post && post.content}}>

      </div>
      <div className="max-w-4xl mx-auto w-full">
        <CallToAction />
      </div>

      {cardList && (
        <div className="mt-3 flex flex-row justify-center items-center space-x-4 overflow-x-auto">
        {cardList.map((card) => (
            <div key={card._id} className="flex-1">
                <Card className="h-full">
                    <a href={card.link}>
                        <img 
                            src={card.image} 
                            alt={card.title} 
                            className="h-full object-cover" />
                    </a>
                </Card>
            </div>
        ))}
        </div>
        )}
    <CommentSection postId={post._id}/>
      <div className="flex flex-col justify-center items-center mb-5">
        <h1 className='text-xl mt-5'> Recent Articles</h1>
        <div className="flex flex-wrap gap-5 mt-5 justify-center">
          {
            recentPosts && recentPosts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))
          }
        </div>
      </div>
      {showModel && mainAd[0] &&
        <Modal 
          show={showModel} 
          onClose={() => setShowModel(false)}
          popup
          size='lg'
          className='w-full h-full dark:bg-gray-900'
        >
          <Modal.Header />
          <a href={mainAd[0].link} target='_blank'>
            <Modal.Body>
              <div className="text-center">
                <img 
                  src={mainAd[0].image} 
                  alt={mainAd[0].title} 
                  className='w-full h-full object-cover rounded-md'
                  />
              </div>
            </Modal.Body>
          </a>
        </Modal>
      }
      {
        <div className="">
          {Ad2[0] &&
            <Toast className='fixed bottom-2 right-2'>
            <img 
                src={Ad2[0].image} 
                alt={Ad2[0].title} 
                className='w-full h-full object-cover rounded-md'
                />
              <Toast.Toggle className='absolute top-0 right-0 p-2 bg-gray-800 rounded-full text-white hover:bg-gray-700'/>
            </Toast>
          }
          {Ad2[1] &&
            <Toast className='fixed bottom-2 left-2'>
              <img 
                src={Ad2[1].image} 
                alt={Ad2[1].title} 
                className='w-full h-full object-cover rounded-md'
                />
              <Toast.Toggle className='absolute top-0 right-0 p-2 bg-gray-800 rounded-full text-white hover:bg-gray-700'/>
            </Toast>
          }
        </div>
      }
    
    
    </motion.main>
  )
}
