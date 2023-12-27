import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import UserHeaderr from '@/components/UserHeaderr';

const handle = () => {
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
    
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [avatar, setAvatar] = useState('https://cdn-icons-png.flaticon.com/128/4140/4140048.png');

    const handleSocial = (e) => {
      setSocial({
        ...social,
        [e.target.id]: e.target.value
      })
    }

    useEffect(() => {
      if(router.query?.handle){
        fetch(`http://localhost:8080/get/${router.query.handle}`)
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

    const saveProfile = e =>{
      e.preventDefault();
      fetch(`http://localhost:8080/save/profile`,{
          method: 'POST',
          headers: {
              'Content-type': 'application/json'
          },
          body: JSON.stringify({
              tokenMail: localStorage.getItem('LinkTreeToken'),
              name: name,
              bio: bio,
              avatar: avatar
          })
      }).then(res=>res.json())
      .then(data=>{
          if(data.status==='error') return toast.error(data.error);
          toast.success('Profile saved successfully')
      })
    }

    const saveSocials = (e) => {
      e.preventDefault();
      fetch(`http://localhost:8080/save/socials`,{
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                tokenMail: localStorage.getItem('LinkTreeToken'),
                socials: social
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.status==='error') return toast.error(data.error);
            toast.success('Socials saved successfully')
        })
    }

    useEffect(()=>{
      if(!localStorage.getItem('LinkTreeToken')) return router.push('/login');
      fetch(`http://localhost:8080/load/socials`,{
          method: 'POST',
          headers: {
              'Content-type': 'application/json'
          },
          body: JSON.stringify({
              tokenMail: localStorage.getItem('LinkTreeToken')
          })
      }).then(res=>res.json())
      .then(data=>{
          if(data.status==="error") return toast.error(data.error);
          setSocial(data.socials)
      })
  }, [])

  return (
    <>
      <div>
        <UserHeaderr data={data} social={social}/>
        <main>
            <section>
              <div>
                <h4 className='font-bold text-center mb-5 '>
                  Edit Profile
                </h4>
                <div>
                  <form  onSubmit={saveProfile} className='flex flex-col justify-center items-center'>
                    <span className='flex flex-row mb-3 w-11/12 m-auto  shadow-md border-2 px-3 py-2 rounded-md focus:outline-none'>
                      <img className='w-6 mr-2' src='/svg/user.svg'/>
                      <input value={name} onChange={e=>setName(e.target.value)} className='focus:outline-none w-full' type='text' placeholder='Set a Name' required />
                    </span>
                    <span className='flex flex-row mb-3 w-11/12 m-auto shadow-md border-2 px-3 py-2 rounded-md focus:outline-none'>
                      <img className='w-6 mr-2 bg-gray-100' src='/svg/bio.svg'/>
                      <input value={bio} onChange={e=>setBio(e.target.value)} className='focus:outline-none w-full' type='text' placeholder='Enter a bio' required />
                    </span>
                    <span className='flex flex-row mb-3 w-11/12 m-auto shadow-md border-2 px-3 py-2 rounded-md focus:outline-none'>
                      <img className='w-6 mr-2' src='/svg/user.svg'/>
                      <input value={avatar} onChange={e=>setAvatar(e.target.value)} className='focus:outline-none w-full' type='text' placeholder='Enter image link' required />
                      <img className = 'w-10 rounded-full border-2 border-white shadow-md' src={avatar}></img>
                    </span>
                    <input className='bg-green-500 w-32 px-4 py-2 rounded-md border-2 border-green-800 shadow-md cursor-pointer text-white' type='submit' value='save profile' />
                  </form>
                </div>
              </div>
              <div className='mt-14'>
                <h4 className='font-bold text-center mb-5 '>
                  Edit Socials
                </h4>
                <div>
                  <form onSubmit={saveSocials} className='flex flex-col justify-center items-center'>
                    <span className='flex flex-row mb-3 w-11/12 m-auto  shadow-md border-2 px-3 py-2 rounded-md focus:outline-none'>
                      <img className='w-6 mr-2' src='/svg/facebook.svg'/>
                      <input id='facebook' value={social.facebook} onChange={handleSocial} className='focus:outline-none w-full' type='text' placeholder='Enter Facebook ID' required />
                    </span>
                    <span className='flex flex-row mb-3 w-11/12 m-auto shadow-md border-2 px-3 py-2 rounded-md focus:outline-none'>
                      <img className='w-6 mr-2 bg-gray-100' src='/svg/twitter.svg'/>
                      <input id='twitter' value={social.twitter} onChange={handleSocial} className='focus:outline-none w-full' type='text' placeholder='Enter Twitter ID' required />
                    </span>
                    <span className='flex flex-row mb-3 w-11/12 m-auto shadow-md border-2 px-3 py-2 rounded-md focus:outline-none'>
                      <img className='w-6 mr-2' src='/svg/instagram.svg'/>
                      <input id='instagram' value={social.instagram} onChange={handleSocial} className='focus:outline-none w-full' type='text' placeholder='Enter Instagram ID' required />
                    </span>
                    <span className='flex flex-row mb-3 w-11/12 m-auto shadow-md border-2 px-3 py-2 rounded-md focus:outline-none'>
                      <img className='w-6 mr-2' src='/svg/youtube.svg'/>
                      <input id='youtube' value={social.youtube} onChange={handleSocial} className='focus:outline-none w-full' type='text' placeholder='Enter Youtube ID @' required />
                    </span>
                    <span className='flex flex-row mb-3 w-11/12 m-auto shadow-md border-2 px-3 py-2 rounded-md focus:outline-none'>
                      <img className='w-6 mr-2' src='/svg/linkedin.svg'/>
                      <input id='linkedin' value={social.linkedin} onChange={handleSocial} className='focus:outline-none w-full' type='text' placeholder='Enter Linkedin ID' required />
                    </span>
                    <span className='flex flex-row mb-3 w-11/12 m-auto shadow-md border-2 px-3 py-2 rounded-md focus:outline-none'>
                      <img className='w-6 mr-2' src='/svg/github.svg'/>
                      <input id='github' value={social.github} onChange={handleSocial} className='focus:outline-none w-full' type='text' placeholder='Enter Github ID' required />
                    </span>
                    <input className='bg-green-500 w-32 px-4 py-2 mb-4 rounded-md border-2 border-green-800 shadow-md cursor-pointer text-white' type='submit' value='save Socials' />
                  </form>
                </div>
              </div>
            </section>
        </main>
      </div>
    </>
  )
}

export default handle