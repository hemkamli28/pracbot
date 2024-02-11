import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const Login = () => {
  const [userRole, setUserRole] = useState(null);
  const [cookies, setCookie] = useCookies(['access_token']);

  const checkRole = async (email) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVERURL}/user/validate`, { email });
      setUserRole(response.data.role);
      console.log(response.data);
      const { role, token } = response.data;
      if (role === 'instructor' || role === 'admin') {
        setCookie('access_token', token, { maxAge: 4 * 60 * 60 });
        const redirectPath = role === 'admin' ? '/user/admin-dashboard' : '/user/instructor-dashboard';
        setTimeout(() => {
          navigate(redirectPath);
        }, 2000);
      } else {
        setCookie('access_token', token, { maxAge: 24 * 60 * 60 });
        setTimeout(() => {
          navigate('/user/student-dashboard');
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const initialValues = {
    email: '',
    password: ''
  };

  const [input, setInput] = useState(initialValues);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVERURL}/user/login`, input);
      console.log(response.data.user);
      const { user, token } = response.data;
      if (user.role === 'instructor' || user.role === 'admin') {
        setCookie('access_token', token, { maxAge: 4 * 60 * 60 });
        const redirectPath = user.role === 'admin' ? '/user/admin-dashboard' : '/user/instructor-dashboard';
        setTimeout(() => {
          navigate(redirectPath);
        }, 2000);
      } else {
        setCookie('access_token', token, { maxAge: 24 * 60 * 60 });
        setTimeout(() => {
          navigate('/user/student-dashboard');
        }, 2000);
      }
      console.log('Login successful!');
    } catch (error) {
      console.log('Invalid Credentials!');
      console.log(error);
    }
  };

  return (
    <section className="flex justify-center items-center h-[90vh]">
        <div className="max-w-md w-full p-6 bg-[#ffffff] rounded-2xl shadow-xl ring-2 ring-gray-100">
        <div className='flex justify-center'>
          <h2 className='font-bold text-[1.75rem] pb-4'>Login</h2>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="email">Email</label>
            <input className="w-full px-3 py-2 border rounded-md border-gray-400 focus:outline-none focus:border-indigo-300" type="email" name="email" value={input.email} onChange={handleChange} />
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="password">Password</label>
            <input className="w-full px-3 py-2 border rounded-md border-gray-400 focus:outline-none focus:border-indigo-300" type="password" name="password" value={input.password} onChange={handleChange} />
          </div>
          <div className="mt-[2.25rem] mb-5 flex justify-around">
            <GoogleLogin
              hosted_domain="gnu.ac.in"
              theme='filled_black'
              onSuccess={(credentialResponse) => {
                const decoded = jwtDecode(credentialResponse.credential);
                console.log(decoded);
                checkRole(decoded.email);
                console.log(userRole);
              }}
              onError={() => {
                console.log('Login Failed');
              }}
              width="100px"
              shape='pill'
            />
            <div className='max-w-full'>
              <button type="submit" className="w-[11rem] bg-indigo-500 text-white py-2 px-4 rounded-full hover:bg-indigo-800">Login</button>
            </div>
          </div>
        </form>
      </div>
    </section>

  );
};

export default Login;