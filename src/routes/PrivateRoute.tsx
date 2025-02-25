import { Navigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const PrivateRoute = ({ children, roles, path }: any) => {
  const { isUserLoggedIn, token } = useSelector((state: RootState) => ({
    token: state.Auth.token,
    isUserLoggedIn: state.Auth.isUserLoggedIn,
  }));

  if (!token || (isUserLoggedIn !== undefined && !isUserLoggedIn)) {
    return (
      <Navigate
        to={{
          pathname: "/auth/login",
          search: "next=" + path,
        }}
      />
    );
  }

  return <>{children}</>;
};

export default PrivateRoute;
