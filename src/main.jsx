import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import AdminLayout from './layouts/AdminLayout';
import Home from './components/HomePage/Home';
import './index.css';
import Projects from './components/ProjectsControl/Projects';
import AuthProvider from './Auth/Provider/AuthProvider';
import PrivateRoute from './layouts/PrivateRoute';
import Login from './components/Login/Login'; // Login component import koro (Path ta thik kore nio)

const router = createBrowserRouter([
  {
    path: "/admin-login",
    element: <Login></Login>
  },
  {
    path: "/",
    element: <PrivateRoute><AdminLayout /></PrivateRoute>,
    children: [
      {
        index: true,
        element: <Home></Home>
      },
      {
        path: "my-projects",
        element: <Projects></Projects>
      }
    ]
  }
]);



createRoot(document.getElementById('root')).render(
  <StrictMode>
<AuthProvider><RouterProvider router={router} /></AuthProvider>
  </StrictMode>,
)
