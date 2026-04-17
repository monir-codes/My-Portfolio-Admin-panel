import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import AdminLayout from './layouts/AdminLayout';
import Home from './components/HomePage/Home';
import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminLayout></AdminLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>
      }
    ]
  }
]);



const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
);


createRoot(document.getElementById('root')).render(
  <StrictMode>
<RouterProvider router={router} />,
  </StrictMode>,
)
