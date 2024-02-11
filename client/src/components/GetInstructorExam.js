import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../Context/AuthContext';
import { Link } from 'react-router-dom';


const GetInstructorExam = () => {
    const [exams, setExams] = useState([]);
    const { accessToken } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const headers = {
                    Authorization: `Bearer ${accessToken}`
                };

                const todayResponse = await axios.get(`${process.env.REACT_APP_SERVERURL}/exam/getforinstructors`, { headers });
                setExams(todayResponse.data.exams);

            } catch (error) {
                console.error('Error fetching exams:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <section>
                {exams.map(exam => (
                    <div className='  mb-[1.5rem] max-w-[14rem]' key={exam._id}>
                        <div className=' bg-gray-100 px-[2.5rem] py-[1.75rem] shadow-md'>
                            <p className='font-bold'>Name: <span className='font-light'>{exam.name}</span></p>
                            <p className='font-bold'>Branch: <span className='font-light'>{exam.branch}</span></p>
                            <p className='font-bold'>Sem: <span className='font-light'>{exam.sem}</span></p>
                            <p className='font-bold'>Subject: <span className='font-light'>{exam.subject}</span></p>
                            <div className='flex '>
                                <button type="submit" className=" mt-4 bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-800">
                                    <Link to={`/exams/${exam._id}/solutions`}>View Solutions</Link>
                                </button>
                            </div>

                        </div>
                    </div>
                ))}
            </section>
        </>
    )
}

export default GetInstructorExam