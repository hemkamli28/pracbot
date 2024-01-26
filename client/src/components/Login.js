import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const Login = () => {
  const initialValues = {
    "email": "",
    "password": ""
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value })
  }

  const [cookies, setCookie] = useCookies(['access_token']);

  const [input, setInput] = useState(initialValues);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVERURL}/user/login`, input)
      console.log(response.data.user);
      if(response.data.user.role === 'instructor' || response.data.user.role === 'admin')
      {
        setCookie('access_token', response.data.token, { maxAge: 4 * 60 * 60 });
        if(response.data.user.role === 'admin')
        {
          setTimeout(() => {
            navigate('/user/admin-dashboard');
          }, 2000);
        }
        else{
          setTimeout(() => {
            navigate('/user/instructor-dashboard');
          }, 2000);
        }
      }
      else{
        setCookie('access_token', response.data.token, { maxAge: 24 * 60 * 60 });
        setTimeout(() => {
          navigate('/user/student-dashboard');
        }, 2000);

      }
      console.log("Login successfull!");
    }
    catch (error) {
      console.log("Invalid Credentials!");
      console.log(error)
    }
  }
  return (
    <>
      <section>
        <div className='flex items-center justify-center'>
          <form onSubmit={handleLogin}>
            <label>email</label>
            <input className='mx-2 px-2 py-1 ring-1 ring-gray-300' type="email" name='email' value={input.email} onChange={handleChange}/><br />
            <label>password</label>
            <input className='mt-2 mx-2 px-2 py-1 ring-1 ring-gray-300' type="password" name='password' value={input.password} onChange={handleChange} />
          <br /><button className='ring-1 ring-gray-300' type='submit'>Submit</button>
          </form>
        </div>
      </section>
    </>
  )
}

export default Login