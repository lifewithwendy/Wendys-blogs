import { HiUser,HiArrowSmRight, HiDocument, HiDocumentText } from 'react-icons/hi';
import { Sidebar } from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice';


export default function DashSidebar() {
    const location = useLocation();
    const [tab,setTab] = useState('');
    const dispatch = useDispatch();
    const { currentUser } = useSelector(state => state.user);

    const handleSignout = async () => { 
        try {
          const res = await fetch('/api/user/signout', {
            method: 'POST'
          });
          const data = await res.json();
          if (!res.ok){
            console.log(data.message);
          } else {
            dispatch(signoutSuccess());
          }
        } catch (error) {
          console.log(error.message);
        }   
      }
    
    useEffect(() => { 
      const urlParams = new URLSearchParams(location.search);
      const tabFromUrl = urlParams.get('tab');
      if(tabFromUrl){
        setTab(tabFromUrl);
      } 
    }, [location.search]);
  return (
      <Sidebar className='w-full md:w-56'>
        <Sidebar.Items>
            <Sidebar.ItemGroup className='flex flex-col gap-1'>
                <Link to='/dashboard?tab=profile'>
                    <Sidebar.Item 
                        active={tab === 'profile'}
                        icon={ HiUser } 
                        label={currentUser.isAdmin ? 'Admin' : 'User'} 
                        labelColor='dark' 
                        as ='div'
                    >
                        Profile
                    </Sidebar.Item>
                </Link>
                {
                  currentUser.isAdmin && (
                    <Link to='/dashboard?tab=posts'>
                        <Sidebar.Item 
                            active={tab === 'posts'}
                            icon={ HiDocumentText } 
                            labelColor='dark' 
                            as ='div'
                        >
                            Posts
                        </Sidebar.Item>
                    </Link>
                  )
                }
                <Sidebar.Item 
                    icon={ HiArrowSmRight } 
                    className='cursor-pointer' 
                    onClick={handleSignout}
                >
                    Sign Out
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
  )
}
