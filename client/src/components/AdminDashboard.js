import React from 'react'
import RegistrationForm from './RegistrationForm'
import UploadPaper from './UploadPaper'

const AdminDashboard = () => {
  return (
    <>
    <section>
      <div className='flex justify-center text-3xl font-extrabold mt-3'>
        <h1>Admin Dashboard</h1>
      </div>
      <div className='max-md:m-[0rem] max-lg:m-[4rem]  flex justify-around items-center h-[100vh] lg:h-[86vh] flex-wrap md:gap-[4rem]'>
        <div className='md:bg-gray-100 px-[6rem] pb-[4rem] md:shadow-xl md:ring-1 ring-gray-200'>

          <RegistrationForm />
        </div>
        <div className='md:bg-gray-100 px-[5rem] pb-[4rem] md:shadow-xl md:ring-1 ring-gray-200  '>
        <UploadPaper />
        </div>
      </div>
      </section>
    </>
  )
}

export default AdminDashboard