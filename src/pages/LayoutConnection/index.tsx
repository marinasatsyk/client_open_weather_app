import HeaderConnectionComponent from "../../components/Headers/HeaderConnection";
import { Outlet } from "react-router-dom";
import "./index.scss";

const LayoutConnection = () => {
  return (
    <>
      <HeaderConnectionComponent />
      <main className="connection-wrap">
        <Outlet />
      </main>
    </>
  );
};
export default LayoutConnection;
