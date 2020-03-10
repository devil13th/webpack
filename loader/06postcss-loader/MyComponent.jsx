import React from 'react'

class MyComponent extends React.Component{
  constructor(props){
    super(props);
    console.log(props);
    this.showMe = this.showMe.bind(this);
    this.state = {...props};
  }

  showMe(){
    alert(this.props.name);
    alert(this.state.name)
    alert("Hello React!");
  }

  componentDidMount(){
    console.log("mounted")
  }
  
  render(){



    return(
      <div style={{border:"1px solid red",width:"100px",height:"100px"}}>
        <button onClick={this.showMe}>Click Me</button>
      </div>
    )
  }
}

export default MyComponent