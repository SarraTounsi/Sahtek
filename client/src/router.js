import React from 'react';
import {createBrowserRouter} from 'react-router-dom';
import App from './App';
import Profile2 from './pages/Profile/Profile2';

const Profile = React.lazy(()=>import('./pages/Profile/Profile'));
const Register = React.lazy(()=>import( './pages/Register/Register'));
const Login = React.lazy(()=>import( './pages/Signin/Login'));
const Forgotpassword = React.lazy(()=>import( './pages/forgotPassword/forgotPassword'));
const Resetpassword = React.lazy(()=>import( './pages/ResetPassword/resetPassword'));
const ChooseRole = React.lazy(()=>import( './pages/Register/ChooseRole'));
const Homepage = React.lazy(()=>import("./pages/Homepage/Homepage"));
const Login2 = React.lazy(()=>import( './pages/Signin/Login2'));
const MailVerification = React.lazy(() => import('./pages/Register/MailVerification'));



export const router = createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children:[
            {
                index:true,
                element: <Homepage />
            },
            {
              path: 'login',
              element: <Login />,
            },
            {
              path: 'chooseRole',
              element: <ChooseRole />,
            },
            {
              path: 'register/:role',
              element: <Register />,
            },
            {
              path: 'profile',
              element: (
                  <Profile />
              ),
            },
            {
              path: 'forgetpassword',
              element: (
                      <Forgotpassword />
                ),
            },
            {
              path: 'resetpassword',
              element: (
                      <Resetpassword/>
                ),
            },
            {
              path: 'login2',
              element: (
                      <Login2/>
              ),
            },
            {path: 'profile2',
          element:(
            <Profile2/>
          )},
          {
            path: ':userId/verify/:token',
            element: (
              <MailVerification />
            ),
          },
        ]
    }
]);