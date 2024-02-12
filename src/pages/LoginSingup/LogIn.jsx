import React, { useState } from 'react'
import authService from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


const LogIn = () => {


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // const [user, setUser] = useState(null);
    const navigate = useNavigate();


    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const login = async () => {
          const response = await authService.login(username, password);
          const accessToken = response.token;
          if (accessToken !== undefined) {
            localStorage.setItem('accessToken', accessToken);
            navigate('/emploi');
          }else{
            alert("Wrong username or password");
          }
        };
        login();

        Cookies.set('TypeCompte','employee')
    };

  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="email"
              value={username}
              onChange={handleUsernameChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
    
  )
}

export default LogIn