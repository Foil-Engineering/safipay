import Image from "next/image";
import { useState } from "react";
import BillsDashboard from "../components/BillsDashboard";
import SideBar from "../components/SideBar";

export default function Home() {
  const [currentTab, setCurrentTab] = useState<string>('bills')
  return (
    <div className="home-bg">
      <div className="section-wrapper">
        <div className="gap-16 flex flex-row py-10 justify-center">
          <SideBar onSwitchTab={(tab) => setCurrentTab(tab)} />
          <div className="flex-1">
            <div className="topbar flex flex-row pb-5 justify-end items-center gap-10">
              <div className="notif-container items-center flex justify-center">
                <Image src="/assets/shared/notification.svg" height="28px" width="28px" alt="notifications" />
              </div>
              <div className="profile-wrapper flex flex-row px-6 py-5 rounded-3xl items-center gap-6">
                <h4>Eliel M.</h4>
                <Image src="/assets/shared/profile.svg" height="35px" width="35px" alt="profile" />
              </div>
            </div>
            <BillsDashboard data={[]} />
          </div>
        </div>
      </div>
    </div>
  );
}
