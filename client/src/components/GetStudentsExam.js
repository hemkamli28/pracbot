import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import AuthContext from '../Context/AuthContext';
import ExamTiming from './ExamTiming';

const GetStudentsExam = () => {
    const [todayExams, setTodayExams] = useState([]);
    const [upcomingExams, setUpcomingExams] = useState([]);
    const { accessToken } = useContext(AuthContext);
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const headers = {
                    Authorization: `Bearer ${accessToken}`
                };

                const todayResponse = await axios.get(`${process.env.REACT_APP_SERVERURL}/exam/getforstudents`, { headers });
                setTodayExams(todayResponse.data.exams);

                const upcomingResponse = await axios.get(`${process.env.REACT_APP_SERVERURL}/exam/getupcoming`, { headers });
                setUpcomingExams(upcomingResponse.data.exams);
            } catch (error) {
                console.error('Error fetching exams:', error);
            }
        };

        fetchData();
    }, []);

    const handleFileUpload = async (examId) => {
        try {
            const formData = new FormData();
            formData.append('file', selectedFile);

            const headers = {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'multipart/form-data'
            };

            await axios.post(`${process.env.REACT_APP_SERVERURL}/solution/upload/${examId}`, formData, { headers });
            console.log('File uploaded successfully!');
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div>
            <section>
                <h2>Today's Exams</h2>
                <ul>
                    {todayExams.map(exam => (
                        <React.Fragment key={exam._id}>
                            <li>
                                {exam.name} - {exam.subject} - {exam.date}
                            </li>
                            <ExamTiming deadline={exam.endTime} />
                            <div className='flex'>
                                <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
                                <button onClick={() => handleFileUpload(exam._id)}>Upload Solution</button>
                            </div>
                        </React.Fragment>
                    ))}
                </ul>
            </section>
            <section>
                <h2>Upcoming Exams</h2>
                <ul>
                    {upcomingExams.map(exam => (
                        <li key={exam._id}>
                            {exam.name} - {exam.subject} - {exam.date}
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default GetStudentsExam;
