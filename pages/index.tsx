import Head from "next/head";
import Image from "next/image";
import React, { Component, useState } from "react";
import BillsDashboard, { Bill } from "../components/BillsDashboard";
import KYCDashboard from "../components/KYCDashboard";
import SideBar from "../components/SideBar";

import { serverInstance } from "../utils/apiServices";

export default class Home extends Component {
  state = {
    tab: "bills",
    dummyData: [],
  };

  //const [currentTab, setCurrentTab] = useState<string>("bills");
  dummyData: Bill[] = [];

  async componentDidMount() {
    if (!localStorage.token) {
      window.location.href = "/login";
    }
    const dummy_data = await serverInstance.getRequest("bills", true);
    this.setState({ dummyData: dummy_data });
  }

  render() {
    const currentTab = this.state.tab;
    const user_details =
      typeof window !== "undefined" && localStorage && localStorage.user
        ? JSON.parse(localStorage.user)
        : {};
    return (
      <div className="home-bg">
        <Head>
          <title>Safipay - Home</title>
        </Head>
        <div className="section-wrapper">
          <div className="flex fle-row justify-between pt-8">
            <div />
            <div className="topbar flex flex-row pb-5 justify-end items-center gap-10">
              <div className="notif-container items-center flex justify-center">
                <Image
                  src="/assets/shared/notification.svg"
                  height="28px"
                  width="28px"
                  alt="notifications"
                />
              </div>
              <div className="profile-wrapper flex flex-row px-6 py-5 rounded-3xl items-center gap-6">
                <h5>{user_details.names ? user_details.names : ""}</h5>
                <Image
                  src="/assets/shared/profile.svg"
                  height="35px"
                  width="35px"
                  alt="profile"
                />
              </div>
            </div>
          </div>
          <div className="gap-16 flex lg:flex-row flex-col py-10 justify-center">
            <SideBar onSwitchTab={(tab) => this.setState({ tab: tab })} />
            <div className="flex-1">
              {currentTab === "bills" ? (
                <BillsDashboard data={this.state.dummyData} />
              ) : currentTab === "kyc" ? (
                <KYCDashboard />
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
