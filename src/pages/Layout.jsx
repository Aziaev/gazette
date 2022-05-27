import Box from "@mui/material/Box";
import * as React from "react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import SideMenu from "../components/SideMenu";

export default function Layout() {
  const [open, setOpen] = useState(false);

  function openDrawer() {
    setOpen(true);
  }

  function closeDrawer() {
    setOpen(false);
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "row", flexGrow: 1 }}>
      <SideMenu open={open} closeDrawer={closeDrawer} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        <Navbar open={open} openDrawer={openDrawer} closeDrawer={closeDrawer} />
        <Box sx={{ padding: "1rem", flexGrow: 1, display: "flex" }}>
          <Outlet />
        </Box>
        <Footer />
      </Box>
    </Box>
  );
}

Layout.route = "/";
