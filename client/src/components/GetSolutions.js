import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import PdfComp from './PdfComp';
import PdfThumbnail from './PdfThumbnail';
import NumberInput from './NumberInput';
import { useParams } from 'react-router-dom';
import AuthContext from '../Context/AuthContext';
const GetSolutions = () => {
    const { examId } = useParams();
    const [solutions, setSolutions] = useState([]);
    const [pdfFile, setPdfFile] = useState(null);
    const { accessToken } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const headers = {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'multipart/form-data'
                };

                const response = await axios.get(`${process.env.REACT_APP_SERVERURL}/solution/getbyexam/${examId}`, { headers });
                setSolutions(response.data.solutions);
            } catch (error) {
                console.error('Error fetching solutions:', error);
            }
        };

        fetchData();
    }, [accessToken, examId]);

    const showPdf = (pdf) => {
        setPdfFile(`http://localhost:5000/uploads/${pdf}`);
    };

    const handleThumbnailClick = (pdf) => {
        // Call showPdf only when the thumbnail is clicked
        showPdf(pdf);
    };

    return (
        <>
            <section className=''>
                <h2 className="text-[1.75rem] font-bold text-center pb-5"> Solutions </h2>
                <div className='flex justify-around'>
                    {solutions.map(solution => (
                        <div
                            className="max-w-[70%] flex justify-around gap-[2rem] p-4 flex-wrap ring-2 bg-gray-100"
                            key={solution._id}
                        >
                            <div onClick={() => handleThumbnailClick(solution.filename)}> {/* Use handleThumbnailClick for the thumbnail */}
                                <PdfThumbnail pdfFile={`http://localhost:5000/uploads/${solution.filename}`} />
                            </div>
                            <div className=''>
                                <div>
                                    <p>{solution.filename}</p>
                                </div>
                                <div>
                                    <p>Uploaded by: {solution.uploadedBy.enrollment}</p>
                                    <p>Exam: {solution.exam.name}</p>
                                </div>

                                <div className='my-3 mx-2'>
                                    <NumberInput solutionId = {solution._id} />
                                </div>
                               
                            </div>
                        </div>
                    ))}
                </div>
                {pdfFile && <PdfComp pdfFile={pdfFile} onClose={() => setPdfFile(null)} />}
            </section>
        </>
    );
}

export default GetSolutions;