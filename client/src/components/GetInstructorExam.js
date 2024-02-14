import React, { useEffect, useState, useRef, useContext } from 'react';
import 'datatables.net-dt'; // Import DataTables library
import 'datatables.net-dt/css/jquery.dataTables.css'; // Import DataTables CSS file
import $ from 'jquery';
import AuthContext from "../Context/AuthContext";
import axios from 'axios';
import { Link } from 'react-router-dom';

function GetInstructorExam() {
    const [exams, setExams] = useState([]);
    const { accessToken } = useContext(AuthContext);
    const tableRef = useRef(null);
    const dataTableRef = useRef(null); // Ref to store DataTable instance

    useEffect(() => {
        const fetchData = async () => {
            try {
                const headers = {
                    Authorization: `Bearer ${accessToken}`,
                };
                const response = await axios.get(
                    `${process.env.REACT_APP_SERVERURL}/exam/getforinstructors`,
                    { headers }
                );
                setExams(response.data.exams);
            } catch (error) {
                console.error('Error fetching exams:', error);
            }
        };

        fetchData();

        setTimeout(() => {
            if (tableRef.current && !dataTableRef.current) {
                // Initialize DataTable only if it hasn't been initialized yet
                dataTableRef.current = $(tableRef.current).DataTable({
                    searching: true,
                    paging: true,
                    lengthMenu: [5, 10, 25, 50],
                    language: {
                        search: 'Search:',
                        lengthMenu: 'Show _MENU_ entries',
                        info: 'Showing _START_ to _END_ of _TOTAL_ entries',
                        paginate: {
                            first: 'First',
                            last: 'Last',
                            next: 'Next',
                            previous: 'Previous'
                        }
                    },
                    stripeClasses: [], // Empty array to disable DataTables' default stripe classes
                });
            }
            return () => {
                // Cleanup: Destroy DataTable instance when component unmounts
                if (dataTableRef.current) {
                    dataTableRef.current.destroy();
                    dataTableRef.current = null;
                }
            };
        }, 1000);

    }, [accessToken, exams]);

    return (
        <div className="overflow-x-auto  md:mr-[0rem] mr-0">
            <table ref={tableRef} className="table-auto w-full border border-gray-300">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border-gray-300">Name</th>
                        <th className="px-4 py-2 border-gray-300">Date</th>
                        <th className="px-4 py-2 border-gray-300">Branch</th>
                        <th className="px-4 py-2 border-gray-300">Sem</th>
                        <th className="px-4 py-2 border-gray-300">Subject</th>
                        <th className="px-4 py-2 border-gray-300">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {exams.map((exam, index) => (
                        <tr key={exam._id} >
                            <td className="border px-4 py-2 border-gray-300">{exam.name}</td>
                            <td className="border px-4 py-2 border-gray-300">{exam.date}</td>
                            <td className="border px-4 py-2 border-gray-300">{exam.branch}</td>
                            <td className="border px-4 py-2 border-gray-300">{exam.sem}</td>
                            <td className="border px-4 py-2 border-gray-300">{exam.subject}</td>
                            <td className="border px-4 py-2 border-gray-300">
                                <button type="submit" className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-800">
                                    <Link to={`/exams/${exam._id}/solutions`}>View Solutions</Link>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default GetInstructorExam;
