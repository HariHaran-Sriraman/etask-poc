import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import FrontDeskTasks from "./pages/FrontDeskTasks";
import SettlementTasks from "./pages/SettlementTasks";
import Navbar from "./components/Navbar";
import Container from "./components/Container";
import Breaks from "./pages/Breaks";
import CAT from "./pages/CAT";  

const App: React.FC = () => {
  return (
    <Router>
      <Container>
        <Box sx={{ flexGrow: 1 }}>
          <Navbar />
          <Box sx={{ padding: 2 }}>
            <Routes>
              <Route path="/frontdesktasks" element={<FrontDeskTasks />} />
              <Route path="/Settlementtasks" element={<SettlementTasks />} />
              <Route path="/teamtasks" element={<FrontDeskTasks />} />
              <Route path="/cases" element={<FrontDeskTasks />} />
              <Route path="/email" element={<FrontDeskTasks />} />
              <Route path="/breaks" element={<Breaks />} />
              <Route path="/CAT" element={<CAT />} />
              <Route path="/charts" element={<Breaks />} />
              <Route path="/" element={<FrontDeskTasks />} />
            </Routes>
          </Box>
        </Box>
      </Container>
    </Router>
  );
};

export default App;
