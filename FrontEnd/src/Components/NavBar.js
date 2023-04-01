import { AppBar, Toolbar, Typography, Tabs, Tab } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
export default function () {
  const [tab, setTab] = React.useState(0);
  const navigate = useNavigate();

  const onTabSelect = (event, index) => {
    setTab(index);
    navigate(navBarTopics[index].route, {state: {tab: index}})
  };

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
    <AppBar position="static" sx={{backgroundColor:"#186940"}}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Commerce Bank Project
        </Typography>
        <Tabs 
        TabIndicatorProps={{style: {background: "#186940"}}}
          value={tab}
          onChange={onTabSelect}
          indicatorColor="primary"
          textColor="inherit"
          variant = "standard"
        >
          {navBarTopics.map((topic, index) => (
            <Tab
              key={index}
              component="a"
              label={topic.label}
            />
          ))}
        </Tabs>
      </Toolbar>
    </AppBar>
  );
}
