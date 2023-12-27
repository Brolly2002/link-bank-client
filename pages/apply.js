import React, { useState } from 'react'
import styles from '../styles/apply.module.css'
import {toast} from 'react-toastify';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Apply = () => {
  const [category, setCategory] = useState('');
  const [handle, setHandle] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);

  };

  const handleRegister = (e) => {
    e.preventDefault();
    if(!category) return toast.error('Add a category');
    // backend part
    fetch('http://localhost:8080/api/register', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        handle,
        email,
        password,
        category
      })
    }).then(res => res.json())
    .then(data=>{
      if(data.status==='success') {
        toast('you are registered')
        localStorage.setItem('LinkTreeToken', data.token)
        setSubmitted(true);
        router.push('/login');
      }
    })
    .catch(err=>{toast.error('Try a different username')})

  };

  return (
    <>
      <section className={styles.background + " min-h-screen flex justify-center items-center"}>
        <div className='main'>
          <div className='content bg-white border-2 px-4 py-8 rounded-2xl shado-lg'>
            <h1 className='text-2xl font-bold text-center'>Join the top 1% creators</h1>
            <p className='text-center'>
              Create Link-bank for your brand
            </p>
            <p className='text-center py-5 font-bold text-gray-500'>
              Start building your hub
            </p>
            <form onSubmit={handleRegister} className='flex flex-col gap-4 text-lg mt-0'>
              <span className='flex flex-row shadow-md border-2 px-3 py-2 rounded-md focus:outline-none'>
                <svg
                  // width="25px"
                  // height="25px"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className='mr-2 w-6'
                >
                  <path
                    d="M11 3.5H12M4.5 0.5H10.5C12.7091 0.5 14.5 2.29086 14.5 4.5V10.5C14.5 12.7091 12.7091 14.5 10.5 14.5H4.5C2.29086 14.5 0.5 12.7091 0.5 10.5V4.5C0.5 2.29086 2.29086 0.5 4.5 0.5ZM7.5 10.5C5.84315 10.5 4.5 9.15685 4.5 7.5C4.5 5.84315 5.84315 4.5 7.5 4.5C9.15685 4.5 10.5 5.84315 10.5 7.5C10.5 9.15685 9.15685 10.5 7.5 10.5Z"
                    stroke="gray"
                  />
                </svg>
                <input value={handle} onChange={e=>setHandle(e.target.value)} className='focus:outline-none' type='text' placeholder='Social Handle' required />
              </span>
              <input value={email} onChange={e=>setEmail(e.target.value)} className='shadow-md border-2 px-3 py-2 rounded-md focus:outline-none' type='email' placeholder='Enter Your email' required />
              <input value={password} onChange={e=>setPassword(e.target.value)} className='shadow-md border-2 px-3 py-2 rounded-md focus:outline-none' type='password' placeholder='Set a password' required />
              <h5 className='text-center text-sm text-indigo-400'>
                Account Type:
              </h5>
              <span className='flex'>
                <label className='flex flex-row mr-3'>
                  <input type='checkbox' className='' value='Creator' checked = {category === 'Creator'} onChange={handleCategoryChange}/>
                  <p className='pl-2'>Creator</p>
                </label> 
                <label className='flex flex-row mr-3'>
                  <input type='checkbox' value='Agency' checked = {category === 'Agency'} onChange={handleCategoryChange}/>
                  <p className='pl-2'>Agency</p>
                </label> 
                <label className='flex flex-row mr-3'>
                  <input type='checkbox' value='Brand' checked = {category === 'Brand'} onChange={handleCategoryChange}/>
                  <p className='pl-2'>Brand</p>
                </label> 
              </span>
              <input className='bg-indigo-600 text-white py-2 rounded-lg cursor-pointer' type='submit' value='Apply' />
            </form>
          </div>
          <h4 className='text-center text-white pt-3'>
                Already have an Account? <Link className='font-bold text-red-400' href="/login"> Login </Link>
          </h4>
        </div>
      </section>
    </>
  )
}

export default Apply