import React, { useContext, useState } from 'react'
import { GrSearch } from "react-icons/gr";
import { FaRegUser } from "react-icons/fa6";
import { IoCartOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify'
import { setUserDetails } from '../store/userSlice';

import ROLE from '../common/role';
import Context from '../context';

const Header = () => {
  const user = useSelector(state => state?.user?.user)
  const dispatch = useDispatch()
  const [menuDisplay, setMenuDisplay] = useState(false)
  const context = useContext(Context)
  const navigate = useNavigate()
  const searchInput = useLocation()
  const URLSearch = new URLSearchParams(searchInput?.search)
  const searchQuery = URLSearch.getAll("q")
  const [search, setSearch] = useState(searchQuery)

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: 'include'
    })

    const data = await fetchData.json()

    if (data.success) {
      dispatch(setUserDetails(null))
      navigate("/")
    }

    if (data.error) {
      toast.error(data.message)
    }

  }

  const handleSearch = (e) => {
    const { value } = e.target
    setSearch(value)

    if (value) {
      navigate(`/search?q=${value}`)
    } else {
      navigate("/search")
    }
  }
  return (
    <header className='h-16 border-b  fixed w-full z-40 px-2 bg-slate-900'>
      <div className=' h-full container mx-auto flex items-center px-4 justify-between'>
        <div className='flex' >
          <Link to="/" className='pl-3 flex items-center gap-3' >
            <div className='lg:flex font-bold lg:text-lg sm:text-sm  text-sm text-red-500'>Aadhya</div>
          </Link>
        </div>

        <div className='gap-2 hidden lg:flex'>
          <Link to="/" className='pl-3 flex items-center gap-3' >
            <div className='lg:flex font-normal text-xs  text-white'>Home</div>
          </Link>
          <Link to="/" className='pl-3 flex items-center gap-3' >
            <div className='lg:flex font-normal text-xs  text-white'>Product</div>
          </Link>
          <Link to="/" className='pl-3 flex items-center gap-3' >
            <div className='lg:flex font-normal text-xs  text-white'>Contact US</div>
          </Link>
          <Link to="/About" className='pl-3 flex items-center gap-3' >
            <div className='lg:flex font-normal text-xs  text-white'>About Us</div>
          </Link>
        </div>

        <div className='hidden lg:flex items-center w-full justify-between max-w-xs border border-neutral-300 rounded-full focus-within:shadow p-1 pl-3 bg-white'>
          <input type='text' placeholder='Search product here...' className='text-xs  w-full outline-none' onChange={handleSearch} value={search} />
          <div className='text-lg min-w-[20px] h-6 mr.5 p-1 bg-slate-500 flex items-center justify-center rounded-full text-white'>
            <GrSearch />
          </div>
        </div>


        <div className='flex items-center gap-7'>

          <div className='relative flex justify-center'>

            {
              user?._id && (
                <div className='text-lg cursor-pointer relative flex justify-center' onClick={() => setMenuDisplay(preve => !preve)}>
                  {
                    user?.profilePic ? (
                      <img src={user?.profilePic} className='w-8 h-8 rounded-full' alt={user?.name} />
                    ) : (
                      <FaRegUser className='text-sm text-white' />
                    )
                  }
                </div>
              )
            }


            {menuDisplay && (
              <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded'>
                <nav>
                  {user?.role === ROLE.ADMIN ? (
                    <Link
                      to="/admin-panel/all-products"
                      className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2'
                      onClick={() => setMenuDisplay(prev => !prev)}
                    >
                      Admin Panel
                    </Link>
                  ) : (
                    <div>
                      <Link
                        to="/order"
                        className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2'
                        onClick={() => setMenuDisplay(prev => !prev)}
                      >
                        Orders
                      </Link>
                      <Link
                        to="/order-history"
                        className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2'
                        onClick={() => setMenuDisplay(prev => !prev)}
                      >
                        Order History
                      </Link>
                    </div>
                  )}
                </nav>
              </div>
            )}



          </div>

          {
            user?._id && (
              <Link to={"/cart"} className='text-lg relative'>
                <span><IoCartOutline className='text-white' /></span>

                <div className='bg-white text-black w-4 h-4 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-2'>
                  <p className='text-sm'>{context?.cartProductCount || 0}</p>

                </div>
              </Link>
            )
          }



          <div>
            {
              user?._id ? (
                <button onClick={handleLogout} className='px-2 py-1 rounded  text-black font-semibold bg-slate-300 hover:bg-slate-700 hover:text-white  text-xs'>Logout</button>
              )
                : (
                  <Link to={"/login"} className='px-2 py-1 rounded  text-black font-semibold bg-slate-300 hover:bg-slate-700 hover:text-white  text-xs'>Login</Link>
                )
            }

          </div>

        </div>

      </div>
    </header>
  )
}

export default Header