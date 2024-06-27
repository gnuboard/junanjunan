import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Header from "./Header";
import { useNavigationSetup } from "../lib/useNavigationSetup";

const NavigationSetup: React.FC = () => {
  useNavigationSetup();
  return null;
};

export default function Root() {
  return (
    <Box>
      <NavigationSetup />
      <Header />
      <Outlet />
      <ReactQueryDevtools />
    </Box>
  );
}