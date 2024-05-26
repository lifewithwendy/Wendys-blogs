import { Button, Select, TextInput, Card } from "flowbite-react";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PostCard from "../components/PostCard";
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';


export default function Search() {
    const [sidebarData, setSidebarData] = useState({
        searchTerm: '',
        sort: 'desc',	 
        category: 'uncategorized',   
    });
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const [cardList, setCardList] = useState([]);
    const { currentUser } = useSelector(state => state.user);
    console.log(sidebarData);

    const handleShowMore = async () => {
        const numberOfPosts = posts.length;
        const startIndex = numberOfPosts;
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('startIndex', startIndex);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/post/getposts?${searchQuery}`);
        if(!res.ok){
            return;
        }else {
            const data = await res.json();
            setPosts([...posts, ...data.posts]);
            if(data.posts.length === 9){
                setShowMore(true);
            }else{
                setShowMore(false);
            }
        }
    }

    const handleChange = (e) => {
        if(e.target.id === 'searchTerm'){
            setSidebarData({
                ...sidebarData,
                searchTerm: e.target.value
            });
        }
        if(e.target.id === 'sort'){
            const order = e.target.value || 'desc';
            setSidebarData({
                ...sidebarData,
                sort: order,
            });
        }
        if(e.target.id === 'category'){
            const category = e.target.value || 'uncategorized';
            setSidebarData({
                ...sidebarData,
                category,
            });
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', sidebarData.searchTerm);
        urlParams.set('sort', sidebarData.sort);
        urlParams.set('category', sidebarData.category);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    }
    
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const sortFromUrl = urlParams.get('sort');
        const categoryFromUrl = urlParams.get('category');
        if(searchTermFromUrl||sortFromUrl||categoryFromUrl){
            setSidebarData({
                ...sidebarData,
                searchTerm: searchTermFromUrl,
                sort: sortFromUrl,
                category: categoryFromUrl

            });
        }

        const fetchPosts = async () => {
            setLoading(true)
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/post/getposts?${searchQuery}`);
            if(!res.ok){
                setLoading(false);
                return;
            }else{
                const data = await res.json();
                setPosts(data.posts);
                setLoading(false);
                if(data.posts.length === 9){
                    setShowMore(true);
                }
            }
        }
        fetchPosts();
    },[location.search])

    useEffect(() => {
        const fetchAds = async () => {
          try {
            const res1 = await fetch(`/api/ad/getAdToShow?priority=1&limit=1&user=${currentUser}`);
            const res2 = await fetch(`/api/ad/getAdToShow?priority=2&limit=1&user=${currentUser}`);
            const res3 = await fetch(`/api/ad/getAdToShow?priority=3&limit=1&user=${currentUser}`);
            const data1 = await res1.json();
            const data2 = await res2.json();
            const data3 = await res3.json();
            if (res1.ok || res2.ok || res3.ok) {
              setCardList([data1.ads[0], data2.ads[0], data3.ads[0]]);
            }
          } catch (error) {
            console.log(error.message);
          }
          
        }
        fetchAds();
      },[]
    )  

  return (
    <motion.div 
        className="flex flex-col md:flex-row"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
      <div className="p-7 border-b md:border-r md:min-h-screen border-gray-500">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div className="flex items-center gap-2">
                <label className="whitespace-nowrap font-semibold"> Search Term: </label>
                <TextInput
                    placeholder="Search...."
                    id= 'searchTerm'
                    type="text"
                    value={sidebarData.searchTerm}
                    onChange={ handleChange }
                >
                </TextInput>
            </div>
            <div className="flex items-center gap-2">
                <label className="font-semibold"> Sort By: </label>
                <Select 
                    className="" 
                    value={sidebarData.sort || 'desc'}
                    onChange={ handleChange }
                    id='sort'
                >
                    <option value="desc">Latest</option>
                    <option value="asc">Oldest</option>
                </Select>
            </div>
            <div className="flex items-center gap-2">
                <label className="font-semibold"> Category: </label>
                <Select 
                    className="" 
                    value={sidebarData.category}
                    onChange={ handleChange }
                    id='category'
                >
                    <option value="uncategorized">uncategorized</option>
                    <option value="react.js">React.js</option>
                    <option value="next.js">Next.js</option>
                    <option value="javascript">JavaScript</option>
                </Select>
            </div>
            <Button type="submit" gradientDuoTone='greenToBlue' outline> 
                Apply Filters 
            </Button>
        </form>
      </div>
      <div className="w-full">
        <h1 className="text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5">Post Results:</h1>
        <div className="p-7 flex flex-wrap gap-4">
        {!loading && posts.length === 0 && (
        <p className="text-xl text-gray-500">No Posts Found</p>
        )}
        {loading && (
        <p className="text-xl text-gray-500">Loading....</p>
        )}
        {!loading && posts && posts.map((post) => (
            <PostCard key={post._id} post={post} />
        ))}
        {showMore && (
            <button onClick={handleShowMore} className="text-teal-500 text-lg hover:underline p-7 w-full">
                Show More
            </button>
        )}
        </div>
        {cardList && (
        <div className="mt-3 flex flex-wrap justify-center items-center space-x-4 overflow-x-auto">
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
      </div>
    </motion.div>
  )
}
