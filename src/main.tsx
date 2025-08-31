import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import TimerPage from './pages/TimerPage';
import PresetsPage from './pages/PresetsPage';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <TimerPage />,
      },
      {
        path: 'presets',
        element: <PresetsPage />,
      },
      // Preferences-ის მისამართი წაშლილია
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);