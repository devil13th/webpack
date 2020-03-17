import './style/app.css';
import './style/b.css';
import './style/c.less';

import prt from './ModuleA';
import alt from './ModuleB';
prt("SUCCESS");
alt("SUCCESS");



const myFn = (x,y) => {
  return x+y;
}


const pro = new Promise(function(resolve){
  setTimeout(function(){
    alert(" 定时器完成了 ");
    resolve(1);
  },1000)

})

pro.then(function(r){
  alert("result:" + r)
})