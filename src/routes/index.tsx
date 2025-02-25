import React from "react";
import { Navigate, RouteProps } from "react-router-dom";
import ChartList from "@/pages/charts";


// auth
const Login = React.lazy(() => import("../pages/auth/Login"));
const Register = React.lazy(() => import("../pages/auth/Register"));
const RecoverPassword = React.lazy(() => import("../pages/auth/RecoverPassword"));
const ResetPassword = React.lazy(() => import("../pages/auth/ResetPassword"));

// dashboard 
const Dashboard = React.lazy(() => import("../pages/dashboard/"));
const Gauges = React.lazy(() => import("../pages/gauges/"));
const GaugesBulkEdit = React.lazy(() => import("../pages/gauges/bulk-edit"));
const ManualGauge = React.lazy(() => import("../pages/gauges/create"));

export interface RoutesProps {
  path: RouteProps["path"];
  name?: string;
  element?: RouteProps["element"];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  route?: any;
  exact?: boolean;
  icon?: string;
  header?: string;
  roles?: string[];
  children?: RoutesProps[];
}

// dashboards
const dashboardRoutes: RoutesProps = {
  path: "/home",
  name: "Dashboards",
  icon: "home",
  header: "Navigation",
  children: [
    {
      path: "/",
      name: "Root",
      element: <Navigate to="/dashboard" />
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      element: <Dashboard />
    },
    {
      path: "/charts",
      name: "ChartList",
      element: <ChartList />
    },
    {
      path: "/gauges",
      name: "Gauges",
      element: <Gauges />
    },
    {
      path: "/gauges/create",
      name: "ManualGauges",
      element: <ManualGauge />
    },
    {
      path: "/gauges/bulk-edit",
      name: "GaugesBulkEdit",
      element: <GaugesBulkEdit />
    },
  ],
};

// auth
const authRoutes: RoutesProps[] = [
  {
    path: "/auth/login",
    name: "Login",
    element: <Login />
  },
  {
    path: "/auth/register",
    name: "Register",
    element: <Register />
  },
  {
    path: "/auth/recover-password",
    name: "Recover Password",
    element: <RecoverPassword />
  },
  {
    path: "/auth/reset-password",
    name: "Reset Password",
    element: <ResetPassword />
  },
];

// flatten the list of all nested routes
const flattenRoutes = (routes: RoutesProps[]) => {
  let flatRoutes: RoutesProps[] = [];

  routes = routes || [];
  routes.forEach((item: RoutesProps) => {
    flatRoutes.push(item);
    if (typeof item.children !== "undefined") {
      flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)];
    }
  });
  return flatRoutes;
};

// All routes
const authProtectedRoutes = [dashboardRoutes];
const publicRoutes = [...authRoutes];

const authProtectedFlattenRoutes = flattenRoutes([...authProtectedRoutes]);
const publicProtectedFlattenRoutes = flattenRoutes([...publicRoutes]);
export {
  publicRoutes,
  authProtectedRoutes,
  authProtectedFlattenRoutes,
  publicProtectedFlattenRoutes,
};
