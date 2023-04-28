import { AppBar, Toolbar, Button, Tabs, Tab } from "@mui/material";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {backgroundColor} from '../Util/Styling'
export default function NavBar({ setUserToken }) {
  const getCurrentLocationIndex = (pathname) => {
    switch (pathname) {
      default:
      case "/":
        return 0;
      case "/balanceAdjustment":
        return 1;
      case "/loanEstimator":
        return 2;
    }
  };

  const [tabValue, setTabValue] = useState(
    getCurrentLocationIndex(useLocation().pathname)
  );
  const navigate = useNavigate();

  const onTabSelect = (event, index) => {
    setTabValue(index);
    navigate(navBarTopics[index].route, { state: { tab: index } });
  };

  function logout() {
    setUserToken(-1);
  }
  const navBarTopics = [
    {
      id: 0,
      route: "/",
      label: "Monthly Calendar View",
    },
    {
      id: 1,
      route: "/balanceAdjustment",
      label: "Balance Adjustment View",
    },
    {
      id: 2,
      route: "/loanEstimator",
      label: "Loan Estimator View",
    },
  ];

  return (
    <AppBar position="static" sx={{ backgroundColor: backgroundColor }}>
      <Toolbar>
        <Tabs
          sx={{ flexGrow: 1 }}
          TabIndicatorProps={{ style: { background: "#186940" } }}
          value={tabValue}
          onChange={onTabSelect}
          indicatorColor="primary"
          textColor="inherit"
          variant="standard"
        >
          {navBarTopics.map((topic, index) => (
            <Tab key={index} component="a" label={topic.label} />
          ))}
        </Tabs>
        <Button sx={{ color: "#FFFFFF" }} variant="text" onClick={logout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}
