import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <>
      <p>AppLayout</p>
      <Outlet />
    </>
  );
};

export default AppLayout;
