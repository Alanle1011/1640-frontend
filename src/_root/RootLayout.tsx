import BottomBar from '@/components/shared/BottomBar'
import LeftSideBar from '@/components/shared/LeftSideBar'
import TopBar from '@/components/shared/TopBar'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div className='w-full md:flex'>
      <TopBar />
      <LeftSideBar />

      <div className='flex flex-col justify-center items-center'>1</div>
      <div className='flex flex-col justify-center items-center'>2</div>
      <div className='flex flex-col justify-center items-center'>3</div>

      <section className='flex flex-1 h-full'>
        <Outlet />
      </section>

      <BottomBar />
    </div>
  )
}

export default RootLayout