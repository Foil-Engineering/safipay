import SideBar from "../components/SideBar";

export default function Home() {
  return (
    <div className="home-bg">
      <div className="section-wrapper">
        <div className="gap-16 flex flex-row py-10 justify-center">
          <SideBar />
          <div className="flex-1"></div>
        </div>
      </div>
    </div>
  );
}
