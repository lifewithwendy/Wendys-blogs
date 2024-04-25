import { Navbar, Button, TextInput, Avatar, Dropdown } from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector,useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice.js';

export default function Header() {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const {currentUser} = useSelector(state => state.user);
  const { theme } = useSelector(state => state.theme);
  return (
    <Navbar className="border-b-2">       
      <Link to='/' className="self-center whitespace-nowrap text-sm 
      sm:text-xl font-semibold dark:text-white">
        <span className="px-4 py-2 bg-gradient-to-r from-indigo-500
         via-purple-500 to-pink-500 rounded-lg text-white">
            wendy's
        </span>
         Blog
      </Link>

      <form>
        <TextInput
          type="text"
          placeholder='Search...'
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline" 
        />
      </form>

      <Button className="w-12 h-10 lg:hidden" color='grey' pill>
        <AiOutlineSearch />
      </Button>

      <div className="flex gap-4 md:order-2">

        <Button 
          className="w-12 h-10 hidden sm:inline" 
          color='gray' 
          pill 
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === 'dark' ? <FaSun /> : <FaMoon />}
        </Button>

        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label = {
              <Avatar 
                alt='user'
                img={currentUser.profilePicture}
                rounded
              />
            }
            >
            <Dropdown.Header>
              <span className='block text-sm'>@{currentUser.username }</span>
              <span className='block text-sm font-medium truncate'>@{currentUser.email }</span>
            </Dropdown.Header>
            <Link to='/dashboard?tab=profile'>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item>Sign Out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to='/sign-in'>
            <Button gradientDuoTone='purpleToBlue' outline>
                Sign In
            </Button>
          </Link>
        )}
        
        {/* Creates the hamburger on smaller screens */}
        <Navbar.Toggle /> 

      </div>

       <Navbar.Collapse>
             {/* as={'div'} eliminates double a tags coming from Link and Navbar.Link */}
            <Link to='/'>
              <Navbar.Link active={path ==="/"} as={'div'}>
                Home
              </Navbar.Link>
            </Link>

            <Link to='/about'>
              <Navbar.Link active={path ==="/about"} as={'div'}>
                      About
              </Navbar.Link>
            </Link>

            <Link to='/project'>
              <Navbar.Link active={path ==="/project"} as={'div'}>   
                Project
              </Navbar.Link>
            </Link>
            
        </Navbar.Collapse>
    </Navbar>
  )
}
