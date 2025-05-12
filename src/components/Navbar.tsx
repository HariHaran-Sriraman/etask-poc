import React from "react";
import { AppBar, Toolbar, Tabs, Tab, Box, Typography } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import StatusSummary from './StatusSummary'


const Navbar: React.FC = () => {
  const location = useLocation();
  const routes = ["/frontdesktasks", "/Settlementtasks", "/teamtasks", "/cases", "/email", "/breaks"];

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
      <Toolbar>

        {/* Tabs */}
        <Tabs
          value={routes.indexOf(location.pathname)}
          textColor="inherit"
          indicatorColor="secondary"
        >
          {location.pathname === '/Settlementtasks' || location.pathname === '/breaks' ? (
            <Tab label="My tasks" component={NavLink} to="/Settlementtasks" value={1} />
          ) : (
            <Tab label="My tasks" component={NavLink} to="/frontdesktasks" value={0} />
          )}
          <Tab label="Team Tasks" component={NavLink} to="/teamtasks" value={2} />
          <Tab label="Cases" component={NavLink} to="/cases" value={3} />
          <Tab label="Email" component={NavLink} to="/email" value={4} />
          {(location.pathname === '/Settlementtasks' || location.pathname === '/breaks') && (
            <Tab label="Break" component={NavLink} to="/breaks" value={5} />
          ) }
          
        </Tabs>

        {/* Welcome message aligned to the right */}
        <Box flexGrow={1} />
        <Box ml={4} mr={4}>
          <StatusSummary />
        </Box>
        <Typography variant="h6" sx={{ marginRight: 2 }}>
          Welcome, User
        </Typography>
      </Toolbar>
    </AppBar>
  )
};

export default Navbar;
