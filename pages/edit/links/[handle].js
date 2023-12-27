import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Link from 'next/link';
import UserHeaderr from '@/components/UserHeaderr';

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

  const [links, setLinks] = useState([{url: '', title: ''}]);
  const [title, setTitle] = useState('');

  const handleLinkChange = (index, field, value) =>{
    const updatedLinks = [...links];
    const linkToUpdate = { ...updatedLinks[index], [field]: value};
    updatedLinks[index] = linkToUpdate;
    setLinks(updatedLinks);
  }

  const handleAddLink = () =>{
    setLinks([...links, {url: '', title: ''}]);
  }

  const handleRemoveLink = (index)=>{
    const updatedLinks = [...links];
    updatedLinks.splice(index, 1);
    setLinks(updatedLinks);
  }

  const saveLinks = (e) =>{
    e.preventDefault();
    const linksArray = Object.values(links);
    const titlesArray = Object.values(title);
    const linksData = linksArray.map((link, index)=>({
      link,
      title: titlesArray[index]
    }))

    fetch(`http://localhost:8080/save/links`,{
      method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            tokenMail: localStorage.getItem('LinkTreeToken'),
            links: linksData
        })
    }).then(res=>res.json()).then(data=>{
      if(data.status==='error') return toast.error(data.error);
      toast.success('Links saved successfully');
    }).catch(err=>{ toast.error(err.message)});
  }

  useEffect(()=>{
    if(!localStorage.getItem('LinkTreeToken')) return router.push('/login');
    fetch(`http://localhost:8080/load/links`,{
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
        setLinks(data.links);
    })
  }, [])

  return (
    <>
      <div>
        <UserHeaderr data={data} social={social}/>
        <main>
          <section>
            <h1 className='text-center font-bold text-xl text-gray-600'>Add or Customize your Links</h1>
            <div>
              <form onSubmit={saveLinks}>
                {links.map((link, index)=>(
                  <div className='flex flex-row justify-evenly my-2' key={index}>
                    <label>
                      URL:
                      <input className='outline-none border-2 border-gray-200 shadow-md rounded-md px-2 p-1 ml-2' type="text" value={link.url} onChange={e=>handleLinkChange(index, 'url', e.target.value)} />
                    </label>
                    <label>
                      Title:
                      <input className='outline-none border-2 border-gray-200 shadow-md rounded-md px-2 p-1 ml-2' type="text" value={link.title} onChange={e=>handleLinkChange(index, 'title', e.target.value)} />
                    </label>
                    <button className='bg-indigo-500 text-white px-4 py-2 rounded-md shadow-sm ml-3' type='button' onClick={()=>{handleRemoveLink(index)}}>
                      Remove Link
                    </button>
                  </div>
                ))}
                <div className='buttons flex flex-row gap-5 my-1'>
                  <button className='bg-indigo-500 text-white px-4 py-2 rounded-md shadow-sm w-full' type="button" onClick={handleAddLink}>
                    Add link
                  </button>
                  <button className='bg-green-500 text-white px-4 py-2 rounded-md shadow-sm w-full' type="submit">
                    Save
                  </button>
                </div>
              </form>
            </div>

          </section>
        </main>
      </div>
    </>
  )
}

export default Handle