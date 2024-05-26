import { Link } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import { useEffect,useState } from 'react';
import PostCard from '../components/PostCard';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Card } from "flowbite-react";


export default function Home() {
  const [posts, setPosts] = useState([]);
  const [cardList, setCardList] = useState([]);
  const { currentUser } = useSelector(state => state.user);

  useEffect(() => {
    const fetchPostAds = async () => {
      try {
        const res = await fetch('/api/post/getposts?limit=9');
        const res1 = await fetch(`/api/ad/getAdToShow?priority=1&limit=1&user=${currentUser}`);
        const res2 = await fetch(`/api/ad/getAdToShow?priority=2&limit=1&user=${currentUser}`);
        const res3 = await fetch(`/api/ad/getAdToShow?priority=3&limit=1&user=${currentUser}`);
        const data =  await res.json();
        const data1 = await res1.json();
        const data2 = await res2.json();
        const data3 = await res3.json();
        if (res.ok) {
          setPosts(data.posts);
        }
        if (res1.ok || res2.ok || res3.ok) {
          setCardList([data1.ads[0], data2.ads[0], data3.ads[0]]);
        }
      } catch (error) {
        console.log(error.message);
      }
      
    }
    fetchPostAds();
  },[]
)  
return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="felx flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-3xl mb-4 font-bold lg:text-6xl">Wellcome to my blog</h1>
        <p className="text-gray-500 text-xs">Here you will find veriety of articles and tutorials on toppics
          such as web development, software engineering, and programming languages.
        </p>
        <Link to='/search' className="text-xs sm:text-sm text-teal-500 font-bold hover:underline">
          View all posts
        </Link>
      </div>

      <div className="p-3 bg-amber-100 dark:bg-slate-700">
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
      <div className="max-w-6px mx-auto flex flex-col gap-8 py-7">
        {posts && posts.length > 0 && (
            <div className="flec flex-col gap-6 py-7">
              <h2 className='text-2xl mb-4 font-semibold text-center'>Recent Posts</h2>
              <div className="flex flex-wrap justify-center gap-5">
                {posts.map((post) => (
                  <PostCard key={post._id} post={post} />
                )
                )}
              </div>
            <div className="flex justify-center">
              <Link to='/search' className="text-lg text-teal-500 hover:underline ">
                <button color='gray' className='text-sm font-semibold' pill="true" size='xs'>View all posts</button>
              </Link> 
            </div>
            </div>
        )
        }
      </div>
    </motion.div>
  )
}
