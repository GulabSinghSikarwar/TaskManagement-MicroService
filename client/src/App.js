import { API_URL } from './component/utils/constant';
import { useEffect, useState } from 'react';
import './App.css';
import { Outlet } from 'react-router';
import { useNavigate } from 'react-router';
import Header from './component/utilsComponent/Header';
import { useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { storageHelper } from './component/utils/storage';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [count, setCount] = useState(0);
  const [googleAuth, setGoogleAuth] = useState(null)

  const checkLoginStatus = async () => {
    //console.log("Checking login status...");
    try {
      const response = await fetch(`${API_URL}/auth/login/success`);
      //console.log("Response from login status:", response);
      if (response.ok) {
        const data = await response.json();
        //console.log("Data from login status:", data);
        toast.success("Successfully Logged In, Moving To Dashboard!");
        storageHelper.user = data.user;
        navigate('/home'); // Changed to /home for consistency
      } else {
        //console.error('Login status check failed');
      }
    } catch (error) {
      //console.error('Failed to check login status', error);
    }
  };


  useEffect(() => {


    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const user = urlParams.get('user');

    if (token && user) {
      //console.log('Token and user found in URL params');
      //console.log('Token:', token);
      //console.log('User:', user);

      // Store user and token in local storage or context
      localStorage.setItem('token', token);
      storageHelper.user = JSON.parse(decodeURIComponent(user));

      toast.success('Successfully Logged In, Moving To Dashboard!');
      navigate('/home');
    } else {
      //console.log('No token or user in URL params');
      // Handle cases where there is no token or user in URL
      // For example, navigate to login page or show an error
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    //console.log("Location changed:", location.pathname);
    setCount((prevCount) => prevCount + 1);

    const token = localStorage.getItem('token');
    //console.log("Token from local storage:", token);
    if (token) {
      navigate('/home');
    } else {
      navigate('/login');
    }
  }, [location.pathname]);

  return (
    <div className="App">
      <Header />
      <Outlet />
      <ToastContainer
        containerId={"App"}
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
    </div>
  );
}

export default App;
