import React, { useContext, useState } from 'react';
import axios from 'axios';
import AuthContext from '../Context/AuthContext';

const RegistrationForm = () => {
  const {  accessToken } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    'fname': '',
    'lname': '',
    'email': '',
    'password': '',
    'role': '',
    'enrollment': '',
    'sem': '',
    'branch': ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try { 
       const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    };
    const response = await axios.post(`${process.env.REACT_APP_SERVERURL}/user/register`, formData, config);
   
      console.log(response.data);
      alert("Registration successfull!");
      setFormData({ 'fname': '',
      'lname': '',
      'email': '',
      'password': '',
      'role': '',
      'enrollment': '',
      'sem': '',
      'branch': ''});
    } catch (error) {
      console.error(error);
      alert("Failed!")
    }
  };

  return (
    <>
    <section>
    <h2 className='my-[2rem] font-bold text-2xl md:text-[1.75rem] text-gray-800 '>Add a New User</h2>
    <form onSubmit={handleSubmit} >
      <select
        name="role"
        value={formData.role}
        onChange={handleChange}
        required
        className="mb-3 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:border-indigo-200 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      >
        <option value="">Select Role</option>
        <option value="instructor">Instructor</option>
        <option value="student">Student</option>
      </select>

      <input
        type="text"
        name="fname"
        placeholder="First Name"
        value={formData.fname}
        onChange={handleChange}
        required
        className="mb-3 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:border-indigo-200 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      />
      <input
        type="text"
        name="lname"
        placeholder="Last Name"
        value={formData.lname}
        onChange={handleChange}
        required
        className="mb-3 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:border-indigo-200 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="mb-3 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:border-indigo-200 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
        className="mb-3 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:border-indigo-200 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      />

      {formData.role === 'student' && (
        <>
          <input
            type="text"
            name="enrollment"
            placeholder="Enrollment"
            value={formData.enrollment}
            onChange={handleChange}
            required
            className="mb-3 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:border-indigo-200 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          <select
            name="sem"
            value={formData.sem}
            onChange={handleChange}
            required
            className="mb-3 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:border-indigo-200 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Select Semester</option>
            <option value="1">Semester 1</option>
            <option value="3">Semester 3</option>
            <option value="5">Semester 5</option>
            <option value="7">Semester 7</option>
          </select>
          <select
            name="branch"
            value={formData.branch}
            onChange={handleChange}
            required
            className="mb-3 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:border-indigo-200 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Select Branch</option>
            <option value="CBA">CBA</option>
            <option value="BDA">BDA</option>
            <option value="CS">CS</option>
          </select>
        </>
      )}
      <div className='flex '>
        <button type="submit" className="w-full mt-4 bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-800">Add User</button>

      </div>
    </form>
    </section>
    </>
  );
};

export default RegistrationForm;
