import identityIcon from '../../icons/identity.svg'
import React, { useState, useEffect, } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link from React Router
import './FormStyle.css'; // Importing the CSS for styling
import { login } from '../../service/auth.service';
import { storageHelper } from '../utils/storage';
import { ToastContainer, toast } from 'react-toastify';
import { validateToken } from '../../service/auth.service';
import { API_URL } from '../utils/constant';

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  // const authContext =useContext(AuthContext)

  const handleSubmit = (event) => {
    event.preventDefault();
    // Call the onLogin function with email and password
    handleLogin();
  };


  // Function to handle login request
  const handleLogin = async () => {
    try {
      const response = await login({ username: email, password });

      if (response.ok) {
        const data = await response.json();
        const { token, user } = data;

        // Storing data in the local storage 
        storageHelper.user = data?.user;

        const { isFirstTimeLogin, is2FAEnabled, isTotpEnabled } = user
        storageHelper.token = token;


        toast.success("Successfully Logged In");

        handleLoginUtil(isFirstTimeLogin, is2FAEnabled, isTotpEnabled);
      } else {
        console.error('Login failed');
        toast.error('Login Failed');
      }
    } catch (error) {
      toast.error("Something Went Wrong !!");
    }
  };

  const handleLoginUtil = (isFirstTimeLogin, is2FAEnabled, isTotpEnabled) => {
    if (isFirstTimeLogin) {
      navigate('/enable-totp');
    } else {
      if (is2FAEnabled) {

        // navigate('/two-fa');
        navigate('/');
      } else {
        navigate('/');
      }
    }
  };

  const googleAuth = () => {
    window.open(
      `${API_URL}/auth/google/callback`,
      "_self"
    );
  };

  const checkLoginStatus = async () => {
    console.log("Here : ",);
    try {
      const response = await fetch(`${API_URL}/auth/login/success`);
      console.log("Here : ", response);
      if (response.ok) {
        const data = await response.json();
        console.log("Here : ", data);
        toast.success("Successfully Logged In, Moving To Dashboard!");
        storageHelper.user = data.user;
        navigate('/');
      }
    } catch (error) {
      console.error('Failed to check login status', error);
    }
  };

  useEffect(() => {

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('token')) {
      checkLoginStatus();
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(" token : ", token);

    if (token) {
      validateToken({ token })
        .then((response) => {
          toast.success("Already Logged In , Moving To Dashboard !!")

          // navigate('/');
        })
        .catch(() => { });
    } else {

    }
  }, []);
  return (
    <section className="bg-gray-50 dark:bg-gray-900 font-sans">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <span href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Sign in to your account
          </h1>
        </span>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                  </div>
                </div>
                <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
              </div>
              <button type="submit" className=" w-full  text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800
               font-medium rounded-lg text-sm px-5 py-1 text-center inline-flex items-center justify-between mr-2 mb-2">

                <svg version="1.1" viewBox="0 0 2048 2048" width="30" height="30" xmlns="http://www.w3.org/2000/svg">
                  <path fill='currentColor' transform="translate(572,578)" d="m0 0h902l15 2 13 4 14 7 13 10 9 9 9 13 6 12 4 13 2 17v715l-2 18-5 17-9 16-9 11-11 10-13 8-19 7-12 2-12 1h-885l-16-1-17-4-16-8-9-6-12-11-10-13-7-14-4-13-2-12v-730l4-18 7-16 9-13 5-6h2v-2l14-11 11-6 13-5 9-2zm434 280-19 3-18 5-21 9-18 11-13 10-13 12-9 10-11 15-10 18-7 17-6 20-3 20v32l3 19 6 21 7 17 10 18 10 13 9 10 3 4h2v2l8 7 13 10 16 10 23 10 21 6 23 3h23l17-2 21-5 19-7 19-10 17-12 13-12 9-9v-2h2l13-18 6-10 9-20 6-20 3-16 1-10v-25l-2-17-5-21-7-18-8-16-9-14-8-10-9-10-13-12-17-12-23-12-20-7-19-4-8-1z" />
                  <path fill='currentColor' transform="translate(217,1691)" d="m0 0h1614l15 2 15 5 16 9 13 11v2h2l10 14 8 16 4 15 1 8v190l-2 15-4 13-8 16-8 11-10 10-14 9-15 7-12 4h-1636l-20-7-11-6-12-9-10-10-10-15-6-14-3-12-1-7v-198l4-18 8-17 5-8h2l2-4 8-9 13-10 14-7 12-4zm131 135-10 3-11 7-7 8-5 10-3 14 1 11 4 11 6 9 9 8 8 4 7 2h19l12-5 8-6 8-9 5-12 1-5v-12l-4-13-6-10-9-8-10-5-8-2zm267 0-12 4-11 8v2h-2l-6 9-4 12-1 11 2 11 6 12 9 10 11 6 7 2h19l12-5 8-6 8-9 4-8 2-8v-14l-4-13-7-10-8-7-10-5-7-2zm268 0-13 4-9 7-8 9-5 11-1 4v18l4 11 6 9 8 7 9 5 7 2h19l12-5 6-4 5-5 5-6 5-11 1-5v-15l-4-12-7-10-9-8-11-5-5-1zm267 0-10 3-10 6-8 8-6 11-2 8v16l3 10 7 11 9 8 8 4 8 2h18l10-4 10-6 7-8 5-10 2-7v-16l-3-10-6-10-8-8-14-7-5-1zm266 0-11 4-9 6-9 10-5 12-1 5v14l3 10 6 10 5 6 11 7 10 3h18l11-4 11-8 8-11 4-11v-18l-4-11-6-9-5-5-5-4-11-5-5-1zm268 0-10 3-10 6-7 7-5 8-4 14v13l4 12 6 9 4 5 11 7 10 3h18l11-4 10-7 7-8 5-11 1-4v-19l-5-12-6-9-9-7-11-5-5-1z" />
                  <path fill='currentColor' transform="translate(981)" d="m0 0h90v1l38 7 28 7 30 10 26 11 22 11 17 10 11 7 19 13 16 13 11 9 16 15 13 13 7 8 12 14 15 20 10 15 12 20 12 23 10 22 8 21 10 35 6 29 3 23 2 30v124l-1 1h-222l-1-1-1-125-3-21-5-19-6-16-8-16-8-14-10-13-12-13-12-11-17-12-18-10-20-8-23-6-21-3h-26l-23 3-22 6-15 6-19 10-13 9-10 8-12 11-10 11-10 14-8 13-10 21-6 19-4 18-1 9-1 27-1 103h-223l-1-5v-101l1-33 3-28 5-29 8-31 10-29 13-30 12-23 14-23 10-14 9-12 8-10 13-15 29-29 11-9 16-13 13-9 17-11 19-11 19-10 31-13 27-9 28-7 26-5z" />
                  <path fill='currentColor' transform="translate(1016,923)" d="m0 0h16l18 3 14 5 15 8 10 8 10 9 9 12 8 14 5 13 3 14 1 18-2 18-5 16-8 16-8 11-3 4h-2l-2 4-12 10-13 8-15 6-12 3-7 1h-26l-14-3-13-5-15-8-10-8-7-6-11-14-8-14-5-13-3-12-1-8v-17l3-17 3-10 8-17 10-14 12-12 10-7 14-8 18-6z" />
                  <path fill='currentColor' transform="translate(202,2047)" d="m0 0 2 1z" />
                </svg>


                Login<div></div>


              </button>
            </form>
            <div class="inline-flex items-center justify-center w-full">
              <hr class="w-64 h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />
              <span class="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">or</span>
            </div>
            {/* GOOGLE AUTH  */}
            <div class=" ">
              <button type="button" onClick={googleAuth} class="  w-full  text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800
               font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between mr-2 mb-2"><svg class="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>Sign up with Google<div></div></button>
            </div>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet? <Link to="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer containerId={"Login"}
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </section>
  );
}

export default LoginForm;
