import { useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashPosts from '../components/DashPosts';
import DashUsers from '../components/DashUsers';
import DashComments from '../components/DashComments';
import DashboardComp from '../components/DashboardComp';
import { motion } from 'framer-motion'
import DashAds from '../components/DashAds';


export default function Dashboard() {
  const location = useLocation();
  const [tab,setTab] = useState('');
  useEffect(() => { 
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if(tabFromUrl){
      setTab(tabFromUrl);
    } 

  }, [location.search]);
  return (
    <motion.div 
      className='min-h-screen flex flex-col md:flex-row'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      >
      <div className="">
        {/* sidebar */}
        <DashSidebar />
      </div>
      {tab ==='profile' && <DashProfile />}
      {/* posts */}
      {tab ==='posts' && <DashPosts />}
      {/* Users */}
      {tab ==='users' && <DashUsers />}
      {/* Comments */}
      {tab ==='comments' && <DashComments />}
      {/* dashboard componet */}
      {tab ==='dash' && <DashboardComp />}
      {/* Advertisements */}
      {tab ==='ads' && <DashAds />}


    </motion.div>
  )
}
