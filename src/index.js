import React from 'react';
//import ReactDOM from 'react-dom';
import {createRoot} from 'react-dom/client';

import './index.css';
import App from './App';
import AuthContextProvider from "./context/auth-context";

const root = createRoot(document.getElementById('root'));
root.render(
    <AuthContextProvider>
        <App />
    </AuthContextProvider>);
