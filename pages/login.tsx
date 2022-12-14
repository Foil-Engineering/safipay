import Button from "../components/shared/Button";
import InputField from "../components/shared/InputField";
import { serverInstance } from "../utils/apiServices";
import React, { Component } from "react";
import Head from "next/head";
import { toast, ToastContainer } from "react-toast";

export default class Login extends Component {
  state = {
    email: "",
    password: "",
    loading: false,
  };

  loginFields = [
    { placeholder: "Email address", type: "email", name: "email" },
    { placeholder: "Password", type: "password", name: "password" },
  ];

  //component mounted
  componentDidMount() {
    if (localStorage.token) {
      window.location.href = "/";
    }
  }

  handleLogin = async () => {
    if (
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.state.email) &&
      this.state.password.length > 2
    ) {
      this.setState({ loading: true });
      const data = await serverInstance.postRequest("login", {
        email: this.state.email,
        password: this.state.password,
      });
      if (data) {
        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          this.setState({ loading: false });
          toast.success("logged in successfully");
          window.location.href = "/";
          return;
        }

        toast.error(data.error);
      }

      this.setState({ loading: false });
    } else {
      toast.error("please put valid data");
    }
  };

  render() {
    return (
      <div className="section-wrapper login-page-wrapper gap-16 flex md:flex-row flex-col py-10 justify-center">
        <Head>
          <title>Safipay - Login</title>
        </Head>
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
                  onTextChange={(text) => this.setState({ [field.name]: text })}
                />
              ))}
              <div className="flex flex-row justify-end">
                <p className="link-bottom my-6">
                  Did you forget your password? Reset it here
                </p>
              </div>
              <Button
                type="filled"
                onClick={this.handleLogin}
                label="Log in"
                loading={this.state.loading}
              />
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    );
  }
}
