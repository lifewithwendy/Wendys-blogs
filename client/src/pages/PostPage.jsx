import React, { useEffect,useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button, Spinner } from 'flowbite-react'
import CallToAction from '../components/CallToAction';
import CommentSection from '../components/CommentSection';
import PostCard from '../components/PostCard';
import { motion } from 'framer-motion'

export default function PostPage() {
    const { postSlug } = useParams();
    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState({});
    const [error, setError] = useState(false);
    const [recentPosts, setRecentPosts] = useState(null);
    
    // console.log(post);
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
        <Button color='gray' pill="true" size='xs'>{post && post.category}</Button>
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
    </motion.main>
  )
}
