import React from 'react'
import GetStudentsExam from './GetStudentsExam'
import StudentGrades from './StudentGrades'

const StudentDashboard = () => {
  return (
    <>
      <section className='bg-gray-200 h-[91.5vh]'>

        <div>
          <GetStudentsExam />
        </div>
        <div className='mt-3'>
          <StudentGrades />
        </div>
      </section>
    </>
  )
}

export default StudentDashboard