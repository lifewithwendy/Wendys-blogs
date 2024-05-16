import { Link } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import { useEffect,useState } from 'react';
import PostCard from '../components/PostCard';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch('/api/post/getposts?limit=9');
        const data =  await res.json();
        if (res.ok) {
          setPosts(data.posts);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchPost();
  },[]
)  
return (
    <div>
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

      <div className="max-w-6px mx-auto flex flex-col gap-8 py-7">
        {posts && posts.length > 0 && (
            <div className="flec flex-col gap-6 py-7">
              <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
              <div className="flex flex-wrap justify-center gap-5">
                {posts.map((post) => (
                  <PostCard key={post._id} post={post} />
                )
                )}
              </div>
            <Link to='/search' className="text-lg text-teal-500 hover:underline text-center">
              <button color='gray' pill size='xs'>View all posts</button>
            </Link> 
            </div>
        )
        }
      </div>
    </div>
  )
}
