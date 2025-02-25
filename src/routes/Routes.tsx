import React, { useEffect } from "react";
import {
  Navigate,
  Route,
  RouteObject,
  RouteProps,
  Routes,
} from "react-router-dom";

// redux
import { AppDispatch, RootState } from "../redux/store";
import { useSelector } from "react-redux";

// All layouts containers
import DefaultLayout from "../layouts/Default";
import VerticalLayout from "../layouts/Vertical";

import { authProtectedFlattenRoutes, publicProtectedFlattenRoutes } from ".";
import PrivateRoute from "./PrivateRoute";
import { useDispatch } from "react-redux";
import { getAccount } from "@/redux/actions";

const AllRoutes = (props: RouteProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const { token, Layout } = useSelector(
    (state: RootState) => ({
      token: state.Auth.token,
      Layout: state.Layout,
    })
  );

  useEffect(() => {
    const accessToken = token
    if (accessToken) {
      dispatch(getAccount())
    }
  }, [token])

  return (
    <React.Fragment>
      <Routes>
        <Route>
          {(publicProtectedFlattenRoutes || []).map(
            (route: RouteObject, idx: number) => (
              <Route
                path={route.path}
                element={
                  <DefaultLayout {...props} layout={Layout}>
                    {route.element}
                  </DefaultLayout>
                }
                key={idx}
              />
            )
          )}
          ;
        </Route>

        <Route>
          {(authProtectedFlattenRoutes || []).map(
            (route: RouteObject, idx: number) => (
              <Route
                path={route.path}
                element={
                  <PrivateRoute path={route.path}>
                    <VerticalLayout {...props}>{route.element}</VerticalLayout>
                  </PrivateRoute>
                }
                key={idx}
              />
            )
          )}
          ;
        </Route>
      </Routes>
    </React.Fragment>
  );
};

export default AllRoutes;
