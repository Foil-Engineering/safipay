import Image from "next/image";
import { useState } from "react";
import BillsDashboard, { Bill } from "../components/BillsDashboard";
import SideBar from "../components/SideBar";

export default function Home() {
  const [currentTab, setCurrentTab] = useState<string>('bills');
  const dummyData: Bill[] = [
    {
      amount: '100.000',
      client: 'Actom Inc.',
      currency: 'USD',
      paymentDate: '2022-04-15,  at 01:45 PM',
      period: 'JUN 2022',
      status: 'Pending',
    },
    {
      amount: '100.000',
      client: 'Actom Inc.',
      currency: 'USD',
      paymentDate: '2022-04-15,  at 01:45 PM',
      period: 'JULY 2022',
      status: 'Pending',
    },
    {
      amount: '130.000',
      client: 'Actom Inc.',
      currency: 'USD',
      paymentDate: '2022-04-15,  at 01:45 PM',
      period: 'AUGUST 2022',
      status: 'Paid',
    },
    {
      amount: '10.999',
      client: 'Ever Inc.',
      currency: 'USD',
      paymentDate: '2022-04-15,  at 01:45 PM',
      period: 'SEPTEMBER 2022',
      status: 'Refused',
    }
  ]
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
            <BillsDashboard data={dummyData} />
          </div>
        </div>
      </div>
    </div>
  );
}
