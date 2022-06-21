// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App'
// import './index.css'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// )


import { ReactDOM } from '../which-react';
import './index.css';

const jsx = (
  <div className='border'>
    <h1>react</h1>
    <h2 href="https://github.com/quyapeng/mini-react">mini react</h2>
  </div>
);

ReactDOM.createRoot(document.getElementById("root")).render(jsx);