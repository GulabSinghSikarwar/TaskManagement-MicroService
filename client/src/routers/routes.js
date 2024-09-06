import { createBrowserRouter } from 'react-router-dom'
import SignupForm from '../component/SignUp/Signup'
import App from '../App';
import LoginForm from '../component/Login/Login'
import OTPForm from '../component/OTP/OtpForm';
import Dashboard from '../component/Dashboard/Dashboard';

const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <App />,
            children: [
                {
                    path: '/login',
                    element: <LoginForm />,
                },
                {
                    path: '/signup',
                    element: <SignupForm />
                },
                {
                    path: '/two-fa',
                    element: <OTPForm />
                },

                {
                    path: '/home',
                    element: <Dashboard />
                },


            ]
        },

        {
            path: '*',
            element: <p>404 Error - Nothing here...</p>
        }

    ]
)

export default router 