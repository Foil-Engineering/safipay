import Image from "next/image";
import { FC, useState } from "react";

interface SidebarProps {
  onSwitchTab: (tab: string) => void;
}

const SideBar: FC<SidebarProps> = (props) => {
  const { onSwitchTab } = props;
  const sidebarMenus = [
    {
      label: "Dashboard",
      activeIcon: "/assets/shared/dashboard-inactive.svg",
      inactiveIcon: "/assets/shared/dashboard-inactive.svg",
      id: "dashboard",
    },
    {
      label: "Bills",
      activeIcon: "/assets/shared/bills-active.svg",
      inactiveIcon: "/assets/shared/bills-inactive.svg",
      id: "bills",
    },
    {
      label: "KYC & account",
      activeIcon: "/assets/shared/kyc-active.svg",
      inactiveIcon: "/assets/shared/kyc-inactive.svg",
      id: "kyc",
    },
    {
      label: "Subscriptions",
      activeIcon: "/assets/shared/payment-inactive.svg",
      inactiveIcon: "/assets/shared/payment-inactive.svg",
      id: "subscriptions",
    },
  ];

  const [activeMenu, setActiveMenu] = useState<string>("bills");

  return (
    <div className="sidebar-wrapper">
      <div className="logo flex justify-center items-center mb-16">
        <h4>SafiPay</h4>
      </div>
      <div className="menu">
        {sidebarMenus.map((item) => (
          <div
            className={`sub-menu ${
              activeMenu === item.id ? "active" : ""
            } py-5 pl-14 w-full flex flex-row align-items-center`}
            key={item.id}
            onClick={() => {
              onSwitchTab(item.id)
              setActiveMenu(item.id)
            }}
          >
            <Image
              alt="menu icon"
              height="34px"
              width="34px"
              src={activeMenu === item.id ? item.activeIcon : item.inactiveIcon}
            />
            <p className="pl-12">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
