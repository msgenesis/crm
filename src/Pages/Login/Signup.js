import React from 'react';

import Axios from 'axios';
export default class SignUp extends React.Component{
 constructor(props){
     super(props);
     this.state={
         username:'',
         password:'',
         role:'',
         email:'',
         message:''
     }
 }
    register(){
        let credentials=this.state
        Axios({
            withCredentials:true,
            data:credentials,
            method:'post',
            url:'/signup'
        })
        .then(data=>{
          if (data.data.save){
              this.setState({
                  message:'user has been createed'
              })
          }
        })
  }
  handleValueChange(value,e){
      e.preventDefault()
    let state=this.state;
    state[value]=e.target.value
    this.setState({
        state
    })
  }
    render(){
        return(
            <div>
            Name         <input value={this.state.username}  type="text" onChange={this.handleValueChange.bind(this,"username")} />
       <br/>Password        <input value={this.state.password}  type="password" onChange={this.handleValueChange.bind(this,"password")} />  
        <br/>Role       <input value={this.state.role}  type="text" onChange={this.handleValueChange.bind(this,"role")} /> 
         <br/>Email      <input value={this.state.email}  type="text" onChange={this.handleValueChange.bind(this,"email")} /> 
            <input type='button' value="Click Me" onClick={this.register.bind(this)}/>
                <br/><br/><br/>{this.state.message}
            </div>
        )
    }
}