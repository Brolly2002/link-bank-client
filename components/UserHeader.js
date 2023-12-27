import React from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';

// https://cdn-icons-png.flaticon.com/128/4140/4140048.png

const UserHeader = ({data}) => {

  const {name, role, avatar, handle, links} = data;
  console.log(handle);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('LinkTreeToken');
    router.push('/login');
  };

  return (
    <>
        <header className='flex flex-row justify-between items-center'>
            <div className='flex flex-col md:flex-row p-5'>
              <Link href={`/edit/links/${handle}`}>
                <button className='inline-flex w-full md:w-auto px-5 py-3 text-purple-500 font-bold hover:text-purple-700 hover:bg-purple-100 rounded-md mb-3 border-2 border-purple-500'>
                  <img src='/svg/url.svg' className='w-6 mr-3'/>
                  Edit Links
                </button>
              </Link>
              <Link href={`/edit/profile/${handle}`}>
                <button className='inline-flex w-full md:w-auto px-5 py-3 text-red-500 font-bold hover:text-red-700 hover:bg-red-100 rounded-md mb-3 border-2 border-red-500 md:ml-4'>
                  <img src='/svg/user.svg' className='w-6 mr-3'/>
                  Edit Profile
                </button>
              </Link>
            </div>
            <Link href={`/${handle}`}>
              <div className='flex flex-row'> 
                <div className='inline-flex mr-5 text-right items-center bg-gray-200 px-5 py-2 rounded-lg'>
                  <div className='text-xs md:text-md flex flex-col flex-wrap'>
                    <span className='font-bold'>{handle}</span>
                    <span>{role} Pack</span>
                  </div>
                  <div className='user-img'>
                    <img src={avatar} className='w-10 ml-5'/>
                  </div>
                </div>
                <img className = 'w-6 mr-5 cursor-pointer' src='/svg/notify.svg' alt='' />
                <img className = 'w-6 mr-5 cursor-pointer' src='/svg/logout.svg' alt='' onClick={handleLogout} />
              </div>
            </Link>
        </header>
    </>
  )
}

export default UserHeader