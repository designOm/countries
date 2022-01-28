import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header";



export const AppLayout = () => {
  return (
    <div id="countries-app">
      <Header />
      <Outlet />
    </div>
  );
};
