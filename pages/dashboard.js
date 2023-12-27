import React, { useState } from 'react'
import { useEffect } from 'react'
import Linkbox from '@/components/Linkbox';
import UserHeader from '@/components/UserHeader';
import { toast } from 'react-toastify';

const dashboard = () => {

    const [data, setData] = useState({});
   
    useEffect(()=> {
        if(!localStorage.getItem('LinkTreeToken')) return window.location.href = "/login";
        fetch('https://link-bank-server.onrender.com/data/dashboard', {
          method:'POST',
          headers: {
            'Content-type':'application/json', 
          },
          body: JSON.stringify({
            tokenMail: localStorage.getItem('LinkTreeToken')
          })
        }).then(res=>res.json())
        .then(data=>{
          if(data.status === 'error') return toast.error('Error happened');
          setData(data.userData);
          localStorage.setItem('userHandle', data.userData.handle);
          // toast.success(data.message);
        })
        .catch(err=>{
          console.log(err);
        })
    }, []);
  return (
    <>
       <div className=''>
        <UserHeader data={data} />
        <main>
          <section className='grid md:grid-cols-2 xl:grid-cols-4'>
            <Linkbox lbTitle="Links" lbNumber={data.links} lbTheme="red" lbSvg='url' />
            <Linkbox lbTitle="Growth" lbNumber="30%" lbTheme="blue" lbSvg='growth' />
            <Linkbox lbTitle="Links" lbNumber={data.links} lbTheme="red" lbSvg='url' />
            <Linkbox lbTitle="Growth" lbNumber="30%" lbTheme="blue" lbSvg='growth' />
          </section>
          <section>

          </section>
        </main>
       </div>
    </>
  )
}

export default dashboard