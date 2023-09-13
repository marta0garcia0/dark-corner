import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { Home } from './pages/home/Home';
import { D3js } from './pages/d3js/D3js';
import { Creative } from './pages/creative/Creative';
import { Threejs } from './pages/threejs/Threejs';
import { DarkCorner } from './pages/dark-corner/DarkCorner';
import { PageNotFound404 } from './pages/pageNotFound404/PageNotFound404';

import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
const basePath = '/dark-corner';
const router = createBrowserRouter([
  {
    path: basePath + '/',
    element: <Home />,
  },
  {
    path: basePath + '/d3js',
    element: <D3js />,
  },
  {
    path: basePath + '/creative',
    element: <Creative />,
  },
  {
    path: basePath + '/threejs',
    element: <Threejs />,
  },
  {
    path: basePath + '/darkcorner',
    element: <DarkCorner />,
  },
  {
    path: '*',
    element: <PageNotFound404 />,
  }
  
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
