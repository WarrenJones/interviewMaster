import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'
import router from "./routes"
import { store } from './store'
import {
  RouterProvider,
} from "react-router-dom";

const root = createRoot(document.body);
root.render(<React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>);