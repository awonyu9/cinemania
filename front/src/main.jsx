import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Home from './routes/home.jsx';
import Root from './routes/root.jsx';
import Confirm from './routes/confirm.jsx';
import Quiz from './routes/quiz.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Home />,
        children: [
          {
            path: '/confirm/:id',
            element: <Confirm />,
          },
        ],
      },
      // {
      //   path: '/confirm/:id',
      //   element: <Confirm />,
      // },
      {
        path: '/play/:id',
        element: <Quiz />,
        children: [
          {
            path: '/play/:id/:n_question',
            // element: <Question />
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
