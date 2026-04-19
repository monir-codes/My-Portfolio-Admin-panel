import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import AdminLayout from './layouts/AdminLayout';
import Home from './components/HomePage/Home';
import './index.css';
import Projects from './components/ProjectsControl/Projects';
import Login from './components/Login/Login';
import AuthProvider from './Auth/Provider/AuthProvider';

const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminLayout></AdminLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>
      },
      {
        path: "/my-projects",
        element: <Projects></Projects>
      },
      {
        path: "/admin-login",
        element: <Login></Login>
      }
    ]
  }
]);



const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
);


createRoot(document.getElementById('root')).render(
  <StrictMode>
<AuthProvider><RouterProvider router={router} /></AuthProvider>
  </StrictMode>,
)
