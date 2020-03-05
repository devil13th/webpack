import React from 'react';
import ReactDOM  from 'react-dom';

import img1 from './images/big.png';
import img2 from './images/small.png';



import './style/app.css';
import './style/b.css';
import './style/c.less';
import './style/iconfont.css';

import MyComponent from './MyComponent.jsx';



ReactDOM.render(
  <div>
    <img src={img1}/>
    <img src={img2}/>
    <MyComponent name="hello"></MyComponent>
  </div>,
  document.getElementById('example')
);
