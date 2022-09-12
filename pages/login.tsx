import { useState } from "react";
import Button from "../components/shared/Button";
import InputField from "../components/shared/InputField";
import { serverInstance } from "../utils/apiServices";

import React,{Component} from "react";

export default class Login extends Component{
  state = {
    email : "",
    password : "",
    lading : ""
  };

  loginFields = [
    { placeholder: "Email address", type : "email", name : "email" },
    { placeholder: "Password", type: "password", name : "password" },
  ];

  //component mounted
  componentDidMount(){
    if(localStorage.token){
      window.location.href = "/";
    }
  }

  handleLogin = async () => {
    this.setState({loading : true});
    const data = await serverInstance.postRequest("login", {
      email: this.state.email,
      password: this.state.password,
    });
    if (data) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      this.setState({loading : false});
      window.location.href = "/";
      return;
    }

    this.setState({loading : false});
  };


  render(){
    return (
      <div className="section-wrapper login-page-wrapper gap-16 flex flex-row py-10 justify-center">
        <div className="relative illustrations">
          <h1 className="font-normal p-3 text-2xl leading-7 mb-5">SafiPay</h1>
          <div className="login-illustration-bg" />
          <div className="login-illustration-xs" />
          <div className="circle-bg-xs absolute" />
        </div>
        <div className="flex-1">
          <div className="flex flex-row justify-end">
            <Button type="filled" width={130} link="/signup" label="Sign up" />
          </div>
          <div className="pr-24">
            <div>
              <p className="login-intro">Welcome back </p>
            </div>
            <div className="form">
              <p className="intro-form">
                Please enter your account details to log in
              </p>
              {this.loginFields.map((field, idx) => (
                <InputField
                  key={idx}
                  type={field.type}
                  placeholder={field.placeholder}
                  onTextChange={(text) => this.setState({[field.name] : text})}
                />
              ))}
              <div className="flex flex-row justify-end">
                <p className="link-bottom my-6">
                  Did you forget your password? Reset it here
                </p>
              </div>
              <Button type="filled" onClick={this.handleLogin} label="Log in" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

