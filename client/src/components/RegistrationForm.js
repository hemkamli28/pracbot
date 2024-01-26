import React, { useState } from 'react';
import axios from 'axios';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    enrollment: '',
    role: '',
    email: '',
    password: '',
    sem: '',
    branch: ''
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
      const response = await axios.post('/api/register', formData);
      console.log(response.data);
      // You can handle success, show a message to the user, or redirect them to another page.
    } catch (error) {
      console.error(error);
      // Handle error, show error message to the user, etc.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="fname" placeholder="First Name" value={formData.fname} onChange={handleChange} required />
      <input type="text" name="lname" placeholder="Last Name" value={formData.lname} onChange={handleChange} required />
      <input type="text" name="enrollment" placeholder="Enrollment" value={formData.enrollment} onChange={handleChange} required />
      <input type="text" name="role" placeholder="Role" value={formData.role} onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
      <input type="text" name="sem" placeholder="Semester" value={formData.sem} onChange={handleChange} required />
      <input type="text" name="branch" placeholder="Branch" value={formData.branch} onChange={handleChange} required />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
