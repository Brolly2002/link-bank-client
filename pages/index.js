import Link from 'next/link'
import MyHead from '../components/MyHead'

export default function Home() {
  return (
    <>
      <MyHead
        title="Home"
        description="Welcome to TypeFinance, where we help you to choose the best financing for you"
        image="https://typefinance.com/typefinance-dp.jpg"
        url="https://typefinance.com"
      />

      <main className="w-full min-h-screen flex flex-col justify-center items-center relative" style={{backgroundImage: "url(/images/background-desktop.jpg)"}}>
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <h1 className='text-center text-white text-5xl mb-6'> Welcome to <br/><span className='text-indigo-600 font-semibold'>Link-Bank</span></h1>

        {/* Styled paragraph giving a gist of the site */}
        <p className="text-center text-white text-lg leading-loose max-w-2xl">
          Link-Bank is your personal hub for managing social media links. Save and organize your social profiles in one place and easily share them with anyone. Streamline your online presence with Link-Bank!
        </p>


        <Link title='Notice the page loader' className='bg-indigo-600 rounded-sm inline-block my-2 p-1 px-2 text-white' href="/apply">Link to a page</Link>
      </main>
    </>
  )
}
