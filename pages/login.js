import React, { useState } from 'react'
import styles from '../styles/apply.module.css'
import {toast} from 'react-toastify';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Apply = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    fetch('https://link-bank-server.onrender.com/api/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    }).then(res => res.json())
    .then(data=>{
      if(data.status === 'success') {
        toast('You are Logged in')
        localStorage.setItem('LinkTreeToken', data.token)
        router.push('/dashboard');
      }
      else if(data.status === 'not found') {
        toast.error('User not found')
      }
    })
    .catch(err => {
      console.log(err)
    });

    // setEmail('');
    // setPassword('');
  };

  return (
    <>
      <section className={styles.background + " min-h-screen flex justify-center items-center"}>
        <div className='main'>
          <div className='content bg-white border-2 px-4 py-8 rounded-2xl shado-lg'>
            <h1 className='text-2xl font-bold text-center'>You are now among Top creators</h1>
            <p className='text-center'>
              Access your Dashboard
            </p>
            <p className='text-center py-5 font-bold text-gray-500'>
              Start building your hub
            </p>
            <form onSubmit={handleLogin} className='flex flex-col gap-4 text-lg mt-5'>
              <input value={email} onChange={e=>setEmail(e.target.value)} className='shadow-md border-2 px-3 py-2 rounded-md focus:outline-none' type='email' placeholder='Enter Your email' required />
              <input value={password} onChange={e=>setPassword(e.target.value)} className='shadow-md border-2 px-3 py-2 rounded-md focus:outline-none' type='password' placeholder='Enter Your password' required />
              <input className='bg-indigo-600 text-white py-2 rounded-lg cursor-pointer' type='submit' value='Login' />
            </form>
          </div>
            <h4 className='text-center text-white pt-3'>
                New Here? <Link className='font-bold text-red-400' href="/apply"> Apply </Link>
            </h4>
        </div>
      </section>
    </>
  )
}

export default Apply