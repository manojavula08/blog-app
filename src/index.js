import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'tailwindcss/tailwind.css';
import App from './App'
import { createBrowserRouter, 
  RouterProvider } from 
    'react-router-dom';
import AllBlogs from './components/AllBlogs/AllBlogs';
import EditBlog from './pages/EditBlog';
import AuthPage, {action as authAction1} from './pages/AuthAction'
import BlogWrite, {action as Write} from './pages/Write-blog';
import {action as Logout} from './pages/Logout';
import {checkAuthToken} from './pages/Token'
import ErrorPage from './pages/Error';
import {action as UpdateBlog} from './pages/ApiUpdates'
import UsersBlog from './components/UsersBlog';
import Register,{action as rAction} from './components/Register';
const router = createBrowserRouter([
  {
    path:'/',
    element: <App />,
    errorElement:<ErrorPage />,
    children:[
      {
        index: true, 
        element:<UsersBlog />,
        loader: checkAuthToken
      },
      {
        path:'my-profile',
        element: <AllBlogs />,
        loader: checkAuthToken
      },
      {
        path:'write-blog',
        element: <BlogWrite />,
        action: Write,
        loader: checkAuthToken
      },
      {
        path: 'edit-blog',
        loader: checkAuthToken,
        children:[
          {
            path: ':id',
            index: true,
            element:<EditBlog />,
            action: UpdateBlog,
            loader: checkAuthToken
          }
        ]
        
      },
      
    ]
  },
  {
    path: '/auth',
    element: <AuthPage />,
    action: authAction1,
    children:[
      {
        path: 'logout',
        action: Logout
      }
    ]
  },
  {
    path: '/register',
    element: <Register />,
    action:rAction
  }
  
]
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
  
);
