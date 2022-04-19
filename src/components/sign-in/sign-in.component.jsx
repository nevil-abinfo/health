import React from 'react';
import axios from 'axios';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import {auth, signInWithGoogle} from '../../firebase/firebase.utils.js';
import './sign-in.styles.scss';

class SignIn extends React.Component{
    constructor(props){
        super(props);

        this.state ={
            email: '',
            password: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();

        const {email, password} = this.state;

        try{
          await auth.signInWithEmailAndPassword(email, password);
          this.setState({ email: "", password: "" });
        }catch(error){
          console.log(error)
        }
    }

    handleChange = event => {
        const { value, name } = event.target;

        this.setState({ [name]: value })
    }

    Login=()=>{  
      alert('login insert call')
      axios.get('http://localhost:52564/Api/User/Login/', {email:this.state.email,  
      password:this.state.password})  
    .then(json => {  
    if(json.data.Status==='Success'){  
      console.log(json.data.Status);  
      alert("Login Successfully");  
    //this.props.history.push('/')  
    }  
    else{  
    alert('Credentials are not Valid');  
    debugger;  
    //this.props.history.push('/Studentlist')  
    }  
    })  
    }
    
    render(){
        return (
          <div className="sign-in">
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>

            <form onSubmit={this.handleSubmit}>
              <FormInput
                name="email"
                type="email"
                handleChange={this.handleChange}
                value={this.state.email}
                label="email"
                required
              />

              <FormInput
                name="password"
                type="password"
                value={this.state.password}
                handleChange={this.handleChange}
                label="password"
                required
              />
              <div className='buttons' >
                <CustomButton type="submit" onClick={this.Login}> Sign In </CustomButton>
                <CustomButton onClick={signInWithGoogle} isGoogleSignIn > Sign in with Google </CustomButton>
              </div>
            </form>
          </div>
        );
    }
}

export default SignIn;