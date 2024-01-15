import { Box, Typography } from "@mui/material";
import { Fragment } from "react";
import { Outlet } from "react-router-dom";

const SandboxPage = () => {
  return (
    <Fragment>
      <Typography variant="h3">Admin</Typography>
      <Outlet />
    </Fragment>
  );
};
export default SandboxPage;
