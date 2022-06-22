// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App'
// import './index.css'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// )



import { ReactDOM, Component } from '../which-react';
import './index.css';

function FunctionComponent(props){
  return (
    <div className="border">
      <p>{props.name}</p>
    </div>
  )
}

class ClassComponent extends Component {
  render(){
    return (
      <div className="border">
        <h3>{this.props.name}</h3>
        this is text
      </div>
    )
  }
}

const jsx = (
  <div className='border'>
    <h1>react</h1>
    <h2 href="https://github.com/quyapeng/mini-react">mini react</h2>
    <FunctionComponent name="函数组件" />
    <ClassComponent name="类组件" />
  </div>
);

ReactDOM.createRoot(document.getElementById("root")).render(jsx);