import { AppBar, Toolbar, Button, Tabs, Tab } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
export default function () {
  const tabValue = parseInt(sessionStorage.getItem("tabValue"));
  const navigate = useNavigate();

  const onTabSelect = (event, index) => {
    sessionStorage.setItem("tabValue", index);
    navigate(navBarTopics[index].route, { state: { tab: index } });
  };

  function logout() {
    sessionStorage.removeItem("userToken");
    window.location.reload(false);
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
    <AppBar position="static" sx={{ backgroundColor: "#186940" }}>
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
