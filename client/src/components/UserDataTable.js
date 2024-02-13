import React, { useEffect, useState, useRef, useContext } from 'react';
import 'datatables.net-dt'; // Import DataTables library
import 'datatables.net-dt/css/jquery.dataTables.css'; // Import DataTables CSS file
import $ from 'jquery';
import AuthContext from "../Context/AuthContext";
import axios from 'axios';

function UserDataTable() {
    const [users, setUsers] = useState([]);
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
                    `${process.env.REACT_APP_SERVERURL}/user/all`,
                    { headers }
                );
                // Axios automatically parses JSON responses, no need to call response.json()
                console.log(response.data.users);
                setUsers(response.data.users); // Use response.data directly
            } catch (error) {
                console.error('Error fetching users:', error);
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
                    }
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
       
       
    }, []);

     // Reinitialize DataTable whenever users change

    return (
        <div className="overflow-x-auto">
            <table ref={tableRef} className="table-auto min-w-full">
                <thead>
                    <tr>
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Username</th>
                        <th className="px-4 py-2">Email</th>
                    </tr>
                </thead>
                <tbody>
                    { users.map(user => (
                        <tr key={user._id}>
                            <td className="border px-4 py-2">{user._id}</td>
                            <td className="border px-4 py-2">{user.fname}</td>
                            <td className="border px-4 py-2">{user.lname}</td>
                            <td className="border px-4 py-2">{user.email}</td>

                        </tr>
                    )) }
                </tbody>
            </table>
        </div>
    );
}

export default UserDataTable;
