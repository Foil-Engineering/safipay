import Button from "../components/shared/Button";
import InputField from "../components/shared/InputField";

import React, { Component } from "react";

import { serverInstance } from "../utils/apiServices";
import Head from "next/head";
import { toast, ToastContainer } from "react-toast";

export default class Login extends Component {
  loginFields = [
    { placeholder: "Email address", name: "email", type: "email" },
    { placeholder: "Names", name: "names", type: "text" },
    { placeholder: "Password", name: "password", type: "password" },
  ];

  state = {
    email: "",
    names: "",
    password: "",
    loading: false,
  };

  handleFormSubmit = async (event) => {
    event.preventDefault();
    if (
      this.state.names.length > 2 &&
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.state.email) &&
      this.state.password.length > 5
    ) {
      this.setState({ loading: true });
      const data = await serverInstance.postRequest(
        "signup",
        this.state,
        false
      );
      if (data) {
        console.log(data);
        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          this.setState({ loading: false });
          window.location.href = "/";
          return;
        }

        toast.success('account created successfully');
      }

      this.setState({ loading: false });
    } else {
      toast.error('Please put valid data');
    }
  };

  render() {
    return (
      <div className="section-wrapper login-page-wrapper gap-16 flex flex-row py-10 justify-center">
        <Head>
          <title>Safipay - Signup</title>
        </Head>
        <div className="relative illustrations">
          <h1 className="font-normal p-3 text-2xl leading-7 mb-5">SafiPay</h1>
          <div className="login-illustration-bg" />
          <div className="login-illustration-xs" />
          <div className="circle-bg-xs absolute" />
        </div>
        <div className="flex-1">
          <div className="flex flex-row justify-end">
            <Button type="filled" width={130} link="/login" label="Log in" />
          </div>
          <div className="pr-24">
            <div>
              <p className="login-intro">Create an account here </p>
            </div>
            <div className="form">
              <p className="intro-form">
                Please enter your account details to sign up
              </p>
              <form onSubmit={this.handleFormSubmit}>
                {this.loginFields.map((field, idx) => (
                  <InputField
                    key={idx}
                    type={field.type}
                    placeholder={field.placeholder}
                    onTextChange={(text) =>
                      this.setState({ [field.name]: text })
                    }
                  />
                ))}
                <div className="flex flex-row justify-end">
                  <p className="link-bottom my-6">
                    Did you forget your password? Reset it here
                  </p>
                </div>
                <Button
                  type="filled"
                  label="Sign up"
                  loading={this.state.loading}
                />
              </form>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    );
  }
}
