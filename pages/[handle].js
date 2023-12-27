import { LinkTree } from '../components/LinkTree';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Link from 'next/link';
import SocialTree from '../components/SocialTree';
import ShareButton from '../components/ShareButton';

const Handle = () => {
  
  const router = useRouter();
  const [data, setData] = useState({});
  const [userFound, setUserFound] = useState(false);

  const [social, setSocial] = useState({
    facebook: '',
    twitter: '',
    instagram: '',
    youtube: '',
    linkedin: '',
    github: ''
  })

  useEffect(() => {
    if(router.query?.handle){
      fetch(`https://link-bank-server.onrender.com/get/${router.query.handle}`)
      .then(res=>res.json())
      .then(data=>{
        if(data.status === 'error') return toast.error(data.error);
        if(data.status === 'success') {
          setData(data.userData);
          setSocial(data.socials);
          setUserFound(true);
        }

      })
      .catch(err => {
        console.log(err);
      })
    }
  }, [router.query])


  if(!userFound) {
    return(
      <div className='flex justify-center items-center h-screen'>
          <div className='not-found px-3'>
            <h1 className='font-bold text-lg'> User not found 🙁 </h1>
            <p> If you're looking for a page, double check the spelling.</p>
            Create Your own <Link className='bg-indigo-600 px-2 ml-2 text-white hover:bg-indigo-400 transition-all duration-500' href='/apply'> Link-bank</Link>
          </div>
      </div>
    ) 
  }

  return (
    <div>
        <ShareButton />
        <LinkTree data={data}/>
        <SocialTree social={social}/>
    </div>
  )
}

export default Handle;